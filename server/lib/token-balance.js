const Web3 = require('web3')
const assert = require('assert')

assert(process.env.WEB3_PROVIDER, 'process.env.WEB3_PROVIDER is required')
const provider = process.env.WEB3_PROVIDER
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

async function getTokenBalance ({ walletAddress, contractAddr }) {
  const tknAddress = walletAddress.substring(2)
  const contractData = '0x70a08231000000000000000000000000' + tknAddress

  return new Promise(function (resolve, reject) {
    web3.eth.call(
      {
        to: contractAddr,
        data: contractData
      },
      function (err, result) {
        if (result) {
          const tokens = web3.utils.toBN(result).toString()
          return resolve(parseFloat(web3.utils.fromWei(tokens, 'ether')))
        }
        return reject(err)
      }
    )
  })
}

async function getETHBalance ({ walletAddress }) {
  var balance = await web3.eth.getBalance(walletAddress)
  return parseFloat(web3.utils.fromWei(balance))
}

module.exports = {
  getTokenBalance,
  getETHBalance
}
