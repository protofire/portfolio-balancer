const assert = require('assert')

assert(process.env.MAILGUN_APIKEY, 'process.env.MAILGUN_APIKEY is required')
assert(process.env.APP_URL, 'process.env.APP_URL is required')

var apiKey = process.env.MAILGUN_APIKEY
var appURL = process.env.APP_URL

var domain = 'mg.cdpalert.org'
var mailgun = require('mailgun-js')({
  apiKey,
  domain
})

async function sendNotification (email) {
  const text = `Hey, your portfolio is no longer balanced!
    Go to ${appURL} for more details and to balance it again.
    `
  var data = {
    from: 'Protofire <leo@protofire.io>',
    to: email,
    subject: 'Your portfolio is unbalanced',
    text
  }
  return sendEmail(data)
}

async function sendEmail (data) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email to:', data.to)
    return Promise.resolve('OK but email not sent in dev mode.')
  }
  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      } else {
        body.text = data.text
        resolve(body)
      }
    })
  })
}

module.exports = {
  sendNotification
}
