var Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')
const {
  Portfolio
} = require('./models')

var router = new Router()
const portfolioValidator = validate({
  body: {
    email: Joi.string().required(),
    address: Joi.string().required(),
    tokens: Joi.array()
      .items(Joi.object().keys({
        token: Joi.string(),
        percentage: Joi.number().min(0).max(100)
      }))
      .required()
  }
})

router.post('/', portfolioValidator, async (ctx, next) => {
  try {
    const sum = ctx.request.body.tokens.reduce((acc, t) => acc + t.percentage, 0)
    if(sum > 100) {
      throw new Error('Token percentages above 100%: ' + sum)
    }
    const portfolio = new Portfolio(ctx.request.body)
    const saved = await portfolio.save()
    ctx.body = saved
  } catch (error) {
    ctx.throw(400, error.message || 'Bad request')
  }
})

router.get('/:address', async (ctx, next) => {
  const address = ctx.params.address.toLowerCase()
  const portfolios = await Portfolio.find({ address })
  if (!portfolios || !portfolios.length) {
    ctx.throw(404, 'No Portfolios found')
  }
  ctx.body = portfolios
})

module.exports = router
