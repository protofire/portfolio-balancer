const assert = require('assert')
assert(process.env.DB_URI, 'process.env.DB_URI is required')
const dbUri = process.env.DB_URI

const mongoose = require('mongoose')

mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true
  }
)

module.exports = mongoose
