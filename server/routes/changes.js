var Router = require('koa-router')

var router = new Router()

// {
//   "timestamp": "2019-01-2019T10:13:46Z",
//   "currency": "ERC20:0x4156D3342D5c385a87D264F90653733592000581",
//   "type": "received",
//   "address": "0xFb71DaA0c206Bb86eDb8AF3EC6a1E6caeADC1c5B",
//   "amount": "0.00000000",
//   "txid": "0xfb71daa0c206bb86edb8af3ec6a1e6caeadc1c5b6c7f77fc0b216b80391e8e73",
//   "event": "confirmed",
//   "isGas": false,
//   "risk": 0.0,
//   "blockHeight": 7000000,
//   "error": "EVM Exception",
//   "confirmedBalance": "0.00000000",
//   "inputs": ["0xF966785800AD69912378933d673f4d33f8E45a84"],
//   "outputs": ["0xFb71DaA0c206Bb86eDb8AF3EC6a1E6caeADC1c5B"],
//   "erc20Data": {
//     "contractAddress": "0x4156D3342D5c385a87D264F90653733592000581",
//     "ticker": "SALT",
//     "decimals": 8
//   }
// }
router.post('/', async (ctx, next) => {
  ctx.throw(400, 'Not implemented')
})

module.exports = router
