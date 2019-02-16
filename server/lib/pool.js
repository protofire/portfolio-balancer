const Web3 = require('web3')
const assert = require('assert')

assert(process.env.WEB3_PROVIDER, 'process.env.WEB3_PROVIDER is required')
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
    mpr: parseFloat(await poolContractInstance.methods.mpr.call()),
    ltv: parseFloat(await poolContractInstance.methods.ltv.call()),
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

/**
 * Instructs the Pool to invest a specific amount on a specific loan
 * @param  {Object} loanRequest The loan request that should be funded
 * @param  {Number} amount The amount of DAI to transfer
 */
async function investOnLoan (loanRequest, amount) {
  // @TODO: implement this: call the contract
  console.error('Investing on loan', loanRequest)
}

module.exports = {
  getPoolData,
  investOnLoan,
  getContractParams
}
