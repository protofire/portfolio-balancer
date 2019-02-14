var Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')
// const { sendPortfolioRegistrationEmail } = require('./emails')
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
    // await sendPortfolioRegistrationEmail(ctx.request.body)
    const portfolio = new Portfolio(ctx.request.body)
    const saved = await portfolio.save()
    ctx.body = saved
  } catch (error) {
    ctx.throw(400, error.message || 'Bad request')
  }
})

// const deletePortfolioValidator = validate({
//   params: {
//     id: Joi.string().required(),
//     secret: Joi.string().required()
//   }
// })

// router.get('/:id/delete/:secret', deletePortfolioValidator, async (ctx, next) => {
//   try {
//     const portfolio = await Portfolio.findOne({
//       _id: ctx.params.id,
//       secret: ctx.params.secret,
//       disabled: false
//     })
//     if (!portfolio) {
//       ctx.throw(404, 'Portfolio not found')
//     }
//     portfolio.disabled = true
//     await portfolio.save()
//     ctx.body = 'Portfolio deleted. You can close this page.'
//   } catch (error) {
//     ctx.throw(404, 'Portfolio not found')
//   }
// })

module.exports = router
