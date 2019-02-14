require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const portfolios = require('./portfolios')
const PORT = process.env.PORT || 3000

const { updateTokenPrices } = require('./update-token-prices')
setInterval(function () {
  updateTokenPrices()
}, 1000 * (process.env.UPDATE_TOKEN_PRICES_INTERVAL_SECONDS || 60))
updateTokenPrices()

// const { processAlerts } = require('./lib/process-alerts')
// setInterval(function () {
//   processAlerts()
// }, 1000 * process.env.ALERT_PROCESSING_INTERVAL_SECONDS)
// processAlerts()

// const { processCdpsEvents } = require('./lib/process-portfolios-events')
// setInterval(function () {
//   processCdpsEvents()
// }, 1000 * process.env.EVENTS_PROCESSING_INTERVAL_SECONDS)
// processCdpsEvents()

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
  return
})
router.use('/portfolios', portfolios.routes(), portfolios.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('CDP Alert API listening on port', PORT)
