require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const portfolios = require('./portfolios')
const changes = require('./changes')
const PORT = process.env.PORT || 3000

const { updateTokenPrices } = require('./lib/update-token-prices')
setInterval(function () {
  updateTokenPrices()
}, 1000 * (process.env.UPDATE_TOKEN_PRICES_INTERVAL_SECONDS || 60))
updateTokenPrices()

const { processPortfolioBacklog } = require('./lib/process-portfolio-backlog')
setInterval(function () {
  processPortfolioBacklog()
}, 1000 * (process.env.PORTFOLIO_NOTIFICATION_INTERVAL_SECONDS || 60))
processPortfolioBacklog()

const app = new Koa()
const router = new Router()

app.use(
  cors({
    origin: '*'
  })
)
app.use(bodyParser())
router.get('/', ctx => {
  ctx.body = 'Portfolio Balancer API'
})
router.use('/portfolios', portfolios.routes(), portfolios.allowedMethods())
router.use('/address-changes', changes.routes(), changes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('CDP Alert API listening on port', PORT)
