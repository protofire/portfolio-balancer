require('dotenv').config()

/**
 * Periodic process that updates token prices on DB
 */
const { updateTokenPrices } = require('./bots/update-token-prices')
setInterval(function () {
  updateTokenPrices()
}, 1000 * (process.env.UPDATE_TOKEN_PRICES_INTERVAL_SECONDS || 60))
updateTokenPrices()

/**
 * Periodic process that sends notifications when portfolios are unbalanced
 */
const { processPortfolioBacklog } = require('./bots/process-portfolio-backlog')
setInterval(function () {
  processPortfolioBacklog()
}, 1000 * (process.env.PORTFOLIO_NOTIFICATION_INTERVAL_SECONDS || 60))
processPortfolioBacklog()

/**
 * Periodic process that invests available DAI from the pool on ETHLend
 */
const { investPoolDAI } = require('./bots/pool-investor')
setInterval(async function () {
  investPoolDAI()
}, process.env.INVEST_POOL_INTERVAL_SECONDS || 60 * 1000)
investPoolDAI()
