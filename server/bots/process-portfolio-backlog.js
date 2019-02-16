require('dotenv').config()
const { sendNotification } = require('../lib/emails')
const { Portfolio, Token } = require('../lib/models')
const { updatePortfolioStatus, getTokenBalances } = require('../lib/portfolios')

/**
 * Updates all portfolios with current balances and token prices and notifies each
 * user if re-balancing is required
 */
async function processPortfolioBacklog () {
  try {
    console.log('Processing portfolios...')
    let portfolios = await Portfolio.find({})
    const ethPrice = await getETHPrice()
    const daiPrice = await getDAIPrice()
    for (var i = 0; i < portfolios.length; i++) {
      const balances = await getTokenBalances(portfolios[i].address)
      await updatePortfolioStatus(portfolios[i], balances, ethPrice, daiPrice)
      if (!isPortfolioBalanced(portfolios[i], balances, 1)) {
        console.log(
          'Portfolio not balanced',
          portfolios[i].currentStatus.map(a => a.percentage),
          portfolios[i].tokens.map(a => a.percentage)
        )
        await sendNotification(portfolios[i].email)
      } else {
        console.log(
          'Portfolio balanced',
          portfolios[i].currentStatus.map(a => a.percentage),
          portfolios[i].tokens.map(a => a.percentage)
        )
      }
    }
  } catch (error) {
    console.error('Error while processing porfolios')
  }
}

/**
 * Determines if a portfolio is balanced acording to the desired percentages
 * @param  {Object}  portfolio
 * @param  {Object}  balances
 * @param  {Number}  threshold
 * @return {Boolean}
 */
function isPortfolioBalanced (portfolio, balances, threshold) {
  const diff =
    portfolio.currentStatus[0].percentage - portfolio.tokens[0].percentage

  return diff < threshold && diff > -1 * threshold
}

async function getETHPrice () {
  const tokens = await Token.find({
    id: 'ethereum'
  })
  return tokens[0].lastPrice
}
async function getDAIPrice () {
  const tokens = await Token.find({
    id: 'dai'
  })
  return tokens[0].lastPrice
}

module.exports = {
  processPortfolioBacklog
}

if (!module.parent) {
  processPortfolioBacklog()
}
