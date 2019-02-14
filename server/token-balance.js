const Web3 = require('web3')
const provider = 'https://rinkeby.infura.io/v3/9d3f3977e8b8403883283193f93f7de7'

async function getTokenBalance({
  walletAddress,
  contractAddr
}) {
  web3 = new Web3(new Web3.providers.HttpProvider(provider))
  const tknAddress = (walletAddress).substring(2)
  const contractData = ('0x70a08231000000000000000000000000' + tknAddress)

  return new Promise(function (resolve, reject) {
    web3.eth.call({
      to: contractAddr,
      data: contractData
    }, function (err, result) {
      if (result) {
        const tokens = web3.utils.toBN(result).toString()
        return resolve(web3.utils.fromWei(tokens, 'ether'))
      } else {
        return reject(err)
      }
    })
  })
}

module.exports = {
  getTokenBalance
}
