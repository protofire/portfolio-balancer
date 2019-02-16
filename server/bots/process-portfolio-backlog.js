require('dotenv').config()
const { sendNotification } = require('../lib/emails')
const { Portfolio, Token } = require('../lib/models')
const { getTokenBalance, getETHBalance } = require('../lib/token-balance')

/**
 * Updates all portfolios with current balances and token prices and notifies each
 * user if re-balancing is required
 */
async function processPortfolioBacklog () {
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
}

/**
 * Gets the balance of ETH and DAI for a specific address
 * @param  {String} address
 * @return {Object}
 */
async function getTokenBalances (address) {
  const eth = await getETHBalance({
    walletAddress: address
  })
  const dai = await getTokenBalance({
    walletAddress: address,
    contractAddr: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
  })
  return {
    eth,
    dai
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

/**
 * Updates a portfolio with its current balance status and percentages
 * @param  {Object} portfolio
 * @param  {Object} balances
 * @param  {Number} ethPrice
 * @param  {Number} daiPrice
 * @return {Object}
 */
async function updatePortfolioStatus (portfolio, balances, ethPrice, daiPrice) {
  portfolio.currentStatus = [
    {
      token: 'ETH',
      tokenDollarValue: ethPrice,
      totalDollarValue: ethPrice * balances.eth,
      percentage: null
    },
    {
      token: 'DAI',
      tokenDollarValue: daiPrice,
      totalDollarValue: daiPrice * balances.dai,
      percentage: null
    }
  ]
  const ethTotal = portfolio.currentStatus[0].totalDollarValue
  const daiTotal = portfolio.currentStatus[1].totalDollarValue
  portfolio.currentStatus[0].percentage =
    (ethTotal * 100) / (ethTotal + daiTotal)
  portfolio.currentStatus[1].percentage =
    100 - portfolio.currentStatus[0].percentage
  return portfolio.save()
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
