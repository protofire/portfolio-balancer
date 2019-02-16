require('dotenv').config()
const axios = require('axios')
const { Token } = require('../lib/models')

const tokens = ['ethereum', 'dai']

/**
 * Updates the price in $ of each token in DB
 */
async function updateTokenPrices () {
  for (var i = 0; i < tokens.length; i++) {
    const newPrice = await getTokenPrice(tokens[i])
    await recordNewPrice(newPrice)
  }
}

/**
 * Gets a token price in $ from coinmarketcap
 * @param  {String} token
 * @return {Object}
 */
async function getTokenPrice (token) {
  const response = await axios.get(
    'https://api.coinmarketcap.com/v1/ticker/' + token
  )
  return {
    token,
    data: response.data[0]
  }
}

/**
 * Stores a token price in DB
 * @param  {Object} tokenData
 * @return {Object}
 */
async function recordNewPrice (tokenData) {
  console.log(
    'Updating price of',
    tokenData.token,
    'to',
    tokenData.data.price_usd
  )
  const tokens = await Token.find({
    id: tokenData.token
  })
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

if (!module.parent) {
  updateTokenPrices()
    .then(function () {
      process.exit(0)
    })
    .catch(function (error) {
      console.error(error)
      process.exit(1)
    })
}
