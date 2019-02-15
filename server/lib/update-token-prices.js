const axios = require('axios')
const { Token } = require('../models')

const tokens = ['gnosis-gno']

async function updateTokenPrices () {
  const newPrices = await Promise.all(tokens.map(getTokenPrice))
  await Promise.all(newPrices.map(recordNewPrice))
}

async function getTokenPrice (token) {
  const response = await axios.get('https://api.coinmarketcap.com/v1/ticker/' + token)
  return {
    token,
    data: response.data[0]
  }
}

async function recordNewPrice (tokenData) {
  const tokens = await Token.find({ id: tokenData.token })
  const token = tokens[0]
  if (token) {
    token.lastPrice = tokenData.data.price_usd
    token.updatedAt = new Date()
    return token.save()
  } else {
    const portfolio = new Token({
      id: tokenData.data.id,
      symbol: tokenData.data.symbol,
      lastPrice: tokenData.data.price_usd,
      updatedAt: new Date()
    })
    return portfolio.save()
  }
}

module.exports = {
  updateTokenPrices
}
