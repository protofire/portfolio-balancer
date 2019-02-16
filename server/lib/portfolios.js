const { getTokenBalance, getETHBalance } = require('../lib/token-balance')

/**
 * Updates a portfolio with its current balance status and percentages
 * @param  {Object} portfolio
 * @param  {Object} balances
 * @param  {Number} ethPrice
 * @param  {Number} daiPrice
 * @return {Object}
 */
async function updatePortfolioStatus (portfolio, balances, ethPrice, daiPrice) {
  console.log('Updating portfolio')
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

module.exports = {
  updatePortfolioStatus,
  getTokenBalances
}
