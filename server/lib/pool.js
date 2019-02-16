const Web3 = require('web3')
const assert = require('assert')

assert(process.env.WEB3_PROVIDER, 'process.env.WEB3_PROVIDER is required')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER))

const abi = require('../../Investment-Liquidity-Pool/build/contracts/InvestmentLiquidityPool.json').abi

assert(process.env.POOL_CONTRACT_ADDRESS, 'process.env.POOL_CONTRACT_ADDRESS is required')
const poolContractInstance = new web3.eth.Contract(abi, process.env.POOL_CONTRACT_ADDRESS)

async function getContractParams () {
  return {
    liquidityPorcentage: parseFloat(await poolContractInstance.methods.liquidityPorcentage.call()),
    feePorcentage: parseFloat(await poolContractInstance.methods.feePercentage.call()),
    subscriptorsLimit: parseFloat(await poolContractInstance.methods.subscriptorsLimit.call()),
    minCap: parseFloat(await poolContractInstance.methods.minCap.call()),
    mpr: parseFloat(await poolContractInstance.methods.mpr.call()),
    ltv: parseFloat(await poolContractInstance.methods.ltv.call()),
    duration: parseFloat(await poolContractInstance.methods.duration.call())
  }
}

async function getPoolData () {
  return poolContractInstance.methods.poolData.call()
}

async function investOnLoan (loanRequest) {
  // @TODO: implement this: call the contract
  console.error('Investing on loan', loanRequest)
}

module.exports = {
  getPoolData,
  investOnLoan,
  getContractParams
}
