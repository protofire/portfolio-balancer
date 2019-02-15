const {
  sendNotification
} = require('./emails')
const {
  Portfolio,
  Token
} = require('../models')
const {
  getTokenBalance
} = require('./token-balance')

async function processPortfolioBacklog() {
  let portfolios = await Portfolio.find({})
  for (var i = 0; i < portfolios.length; i++) {
    const balances = await getTokenBalances(portfolios[i])
    await updatePortfolioStatus(portfolios[i], balances)
    if (!isPortfolioBalanced(portfolios[i], balances, 5)) {
      console.error('Portfolio not balanced', portfolios[i].currentStatus.map(a => a.percentage), portfolios[i].tokens.map(a => a.percentage))
      sendNotification(portfolios[i].email)
    }
  }
}

async function getTokenBalances(portfolio) {
  const gno = await getTokenBalance({
    walletAddress: portfolio.address,
    contractAddr: '0xa7d1c04faf998f9161fc9f800a99a809b84cfc9d'
  })
  const dai = await getTokenBalance({
    walletAddress: portfolio.address,
    contractAddr: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
  })
  return {
    gno,
    dai
  }
}

function isPortfolioBalanced(portfolio, balances, threshold) {
  const diff = portfolio.currentStatus[0].percentage - portfolio.tokens[0].percentage

  return (diff < threshold) && (diff > -1 * threshold)
}

async function updatePortfolioStatus(portfolio, balances) {
  const gnoPrice = await getGNOPrice()
  portfolio.currentStatus = [{
    token: 'GNO',
    tokenDollarValue: gnoPrice,
    totalDollarValue: gnoPrice * balances.gno,
    percentage: null
  }, {
    token: 'DAI',
    tokenDollarValue: 1,
    totalDollarValue: balances.dai,
    percentage: null
  }]
  const gnoTotal = portfolio.currentStatus[0].totalDollarValue
  const daiTotal = portfolio.currentStatus[1].totalDollarValue
  portfolio.currentStatus[0].percentage = gnoTotal * 100 / (gnoTotal + daiTotal)
  portfolio.currentStatus[1].percentage = 100 - portfolio.currentStatus[0].percentage
  return portfolio.save()
}

module.exports = {
  processPortfolioBacklog
}

async function getGNOPrice() {
  const tokens = await Token.find({
    id: 'gnosis-gno'
  })
  return tokens[0].lastPrice
}
