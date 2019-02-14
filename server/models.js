const mongoose = require('./connection')

const schema = new mongoose.Schema({
  email: String,
  address: String,
  tokens: [{
      token: String,
      percentage: Number
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

// schema.options.toJSON = {
//   transform: function (doc, ret) {
//     ret.id = ret._id
//     delete ret._id
//     delete ret.__v
//     return ret
//   }
// }
const Portfolio = mongoose.model('Portfolio', schema)

module.exports = {
  Portfolio
}
