const { Portfolio } = require('./models')
const { getTokenBalance } = require('./token-balance')

async function processPortfolioBacklog() {
  const portfolios = await Portfolio.find({})
  const balances = await Promise.all(portfolios.map(async (portfolio) => {
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
  }))

  console.log('balances', balances, '💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩')

}

module.exports = {
  processPortfolioBacklog
}
