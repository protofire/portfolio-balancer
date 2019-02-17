const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const assert = require('assert')
const BigNumber = require('bignumber.js')

assert(process.env.WEB3_PROVIDER, 'process.env.WEB3_PROVIDER is required')
assert(
  process.env.BOT_WALLET_ADDRESS,
  'process.env.BOT_WALLET_ADDRESS is required'
)
assert(process.env.BOT_WALLET_PK, 'process.env.BOT_WALLET_PK is required')
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
)

const abi = require('../abi/InvestmentLiquidityPool.json').abi

assert(
  process.env.POOL_CONTRACT_ADDRESS,
  'process.env.POOL_CONTRACT_ADDRESS is required'
)
const poolContractInstance = new web3.eth.Contract(
  abi,
  process.env.POOL_CONTRACT_ADDRESS
)

async function getContractParams () {
  return {
    liquidityPercentage: parseFloat(
      await poolContractInstance.methods.liquidityPercentage.call()
    ),
    feePorcentage: parseFloat(
      await poolContractInstance.methods.feePercentage.call()
    ),
    subscriptorsLimit: parseFloat(
      await poolContractInstance.methods.subscriptorsLimit.call()
    ),
    minCap: parseFloat(await poolContractInstance.methods.minCap.call()),
    mpr: parseFloat(await poolContractInstance.methods.mpr.call()) / 100,
    ltv: parseFloat(await poolContractInstance.methods.ltv.call()) / 100,
    duration: parseFloat(await poolContractInstance.methods.duration.call())
  }
}

/**
 * Gets the current status of the pool contract. Mostly its balance
 * @return {Object}
 */
async function getPoolData () {
  const data = await poolContractInstance.methods.poolData.call()
  const liquidityLimit = await poolContractInstance.methods.liquidityLimit.call()

  // @TODO: make sure this is accurate
  return {
    balance: data[1] - liquidityLimit
  }
}

module.exports = {
  getPoolData,
  investOnLoan,
  getContractParams
}

/**
 * Instructs the Pool to invest a specific amount on a specific loan
 * @param  {Object} loanRequest The loan request that should be funded
 * @param  {Number} amount The amount of DAI to transfer
 */
async function investOnLoan (loanRequest, amount) {
  const bnAmount = new BigNumber(amount)
    .multipliedBy(new BigNumber(10).pow(18))
    .toString(10)

  sendtx(
    poolContractInstance,
    process.env.POOL_CONTRACT_ADDRESS,
    loanRequest.loanAddress,
    bnAmount
  )
}

async function sendtx (contract, contractAddress, loanAddress, bnAmount) {
  var myAddress = process.env.BOT_WALLET_ADDRESS
  var privateKey = Buffer.from(process.env.BOT_WALLET_PK, 'hex')

  var count = await web3.eth.getTransactionCount(myAddress)

  var amount = web3.utils.toHex(1e16)
  var rawTransaction = {
    from: myAddress,
    gasPrice: web3.utils.toHex(20 * 1e9),
    gasLimit: web3.utils.toHex(210000),
    to: contractAddress,
    value: '0x0',
    data: contract.methods.invest(loanAddress, bnAmount).encodeABI(),
    nonce: web3.utils.toHex(count)
  }
  console.log(rawTransaction)

  var transaction = new Tx(rawTransaction)

  transaction.sign(privateKey)

  const result = await web3.eth.sendSignedTransaction(
    '0x' + transaction.serialize().toString('hex')
  )
  console.log('result', result)
}
