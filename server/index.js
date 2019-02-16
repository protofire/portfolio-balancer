require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const portfolios = require('./routes/portfolios')
const PORT = process.env.PORT || 3000

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
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('Portfolio Balancer API listening on port', PORT)
