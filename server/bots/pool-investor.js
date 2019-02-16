require('dotenv').config()
const { getPoolData, getContractParams, investOnLoan } = require('../lib/pool')

async function investPoolDAI () {
  const availableDAI = (await getPoolData()).balance
  const contractParams = await getContractParams()
  if (availableDAI > 0) {
    const allLoanRequests = await getAllLoanRequests()
    const matchingRequests = await getMatchingLoanRequests(
      contractParams,
      allLoanRequests
    )
    const bestMatch = await sortLoanRequests(matchingRequests)[0]
    if (bestMatch) {
      const amount = Math.min(availableDAI, bestMatch.loanAmount)
      await investOnLoan(
        bestMatch,
        adjustTo5Percent(amount, bestMatch.loanAmount)
      )
    } else {
      console.error('No matching loan requests :(')
    }
  } else {
    console.error('No DAI to invest :(')
  }
}

// @TODO: replace mocked data with real ethlend loan requests
async function getAllLoanRequests () {
  return require('../data/all-loan-requests')
  // const { Marketplace } = require('aave-js')
  // // let Marketplace = require('aave-js/dist/lib/aave-js').Marketplace
  // const assert = require('assert')
  // assert(process.env.ETHLEND_API_SECRET_KEY, 'process.env.ETHLEND_API_SECRET_KEY is required')
  // const marketplace = new Marketplace(process.env.ETHLEND_API_SECRET_KEY)
  // const allRequestsAddresses = await marketplace.requests.getAllAddresses()
  // const requestsData = []
  // for (const requestAddress of allRequestsAddresses) {
  //   const data = await marketplace.requests.getLoanData(requestAddress)
  //   requestsData.push(data)
  // }
  // return requestsData
}

function getMatchingLoanRequests (contractParams, allLoanRequests) {
  return allLoanRequests.filter(loanRequest => {
    return (
      loanRequest.state === 'Funding' &&
      loanRequest.moe === 'DAI' &&
      loanRequest.mpr >= contractParams.mpr &&
      // loanRequest.duration <= contractParams.duration &&
      ltv(loanRequest) >= contractParams.ltv
    )
  })
}

function ltv (loanRequest) {
  return (
    parseFloat(loanRequest.collateralAmount) /
    parseFloat(loanRequest.loanAmount)
  )
}

function sortLoanRequests (loanRequests) {
  return loanRequests.sort((a, b) => {
    return b.mpr - a.mpr
  })
}

function adjustTo5Percent (amount, max) {
  const fivePercent = max / 20
  return fivePercent * Math.floor(amount / fivePercent)
}

module.exports = {
  investPoolDAI
}

if (!module.parent) {
  investPoolDAI()
}
