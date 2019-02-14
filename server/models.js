const mongoose = require('./connection')

const schema = new mongoose.Schema({
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

const Portfolio = mongoose.model('Portfolio', schema)

module.exports = {
  Portfolio
}
