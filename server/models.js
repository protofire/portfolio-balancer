const mongoose = require('./connection')

const portfolioSchema = new mongoose.Schema({
  email: String,
  address: String,
  tokens: [{
      token: String,
      percentage: Number
  }],
  currentStatus: [{
      token: String,
      percentage: Number,
      tokenDollarValue: Number,
      totalDollarValue: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastNotifiedAt: {
    type: Date,
    default: new Date('2018-01-01')
  }
})
const tokenSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  lastPrice: String,
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
const Token = mongoose.model('Token', tokenSchema)

module.exports = {
  Portfolio,
  Token
}
