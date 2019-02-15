var Router = require('koa-router')

var router = new Router()

router.post('/', async (ctx, next) => {
  ctx.throw(400, 'Not implemented')
})

module.exports = router
