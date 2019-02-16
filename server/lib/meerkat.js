const axios = require('axios')
const Web3 = require('web3')
const assert = require('assert')

assert(process.env.WEB3_PROVIDER, 'process.env.WEB3_PROVIDER is required')
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
)

assert(process.env.MEERKAT_API_KEY, 'process.env.MEERKAT_API_KEY is required')

async function registerAddressWatch (address) {
  address = web3.utils.toChecksumAddress(address)
  try {
    console.log('subscribing')
    const subscriptions = [
      (await axios.post(
        'https://meerkat.watch/api/v0/enterprise/subscribe/address',
        {
          address,
          currency: 'ETH',
          callback: 'http://167.99.106.206:3000/address-changes'
        },
        {
          headers: {
            Authorization: 'ApiKey ' + process.env.MEERKAT_API_KEY
          }
        }
      )).data.trim(),
      (await axios.post(
        'https://meerkat.watch/api/v0/enterprise/subscribe/address',
        {
          address,
          currency: 'ERC20ALL',
          // currency: 'ERC20:'+process.env.DAI_ADDRESS,
          callback: 'http://167.99.106.206:3000/address-changes'
        },
        {
          headers: {
            Authorization: 'ApiKey ' + process.env.MEERKAT_API_KEY
          }
        }
      )).data.trim()
    ]
    return subscriptions
  } catch (error) {
    console.error(address)
    console.error(error.response.data || error)
    return []
  }
}

module.exports = {
  registerAddressWatch
}
