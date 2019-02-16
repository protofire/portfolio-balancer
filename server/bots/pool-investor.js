require('dotenv').config()
const { getPoolData, getContractParams, investOnLoan } = require('../lib/pool')

async function investPoolDAI () {
  const availableDAI = (await getPoolData()).balance
  const contractParams = await getContractParams()
  // @TODO: what if the available balance is too small to invest?
  if (availableDAI > 0) {
    const allLoanRequests = await getAllLoanRequests()
    const matchingRequests = await getMatchingLoanRequests(
      contractParams,
      allLoanRequests
    )
    const bestMatch = await sortLoanRequests(matchingRequests)[0]
    if (bestMatch) {
      const amount = Math.min(availableDAI, bestMatch.loanAmount)
      await investOnLoan(bestMatch, amount)
    } else {
      console.error('No matching loan requests :(')
    }
  } else {
    console.error('No DAI to invest :(')
  }
}

async function getAllLoanRequests () {
  // @TODO: replace mocked data with real ethlend loan requests
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
  // console.log('requestsData', requestsData, '💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩')

  // return requestsData
}

function getMatchingLoanRequests (contractParams, allLoanRequests) {
  return allLoanRequests.filter(loanRequest => {
    // @TODO: other parameters need to be checked
    return (
      loanRequest.state === 'Funding' &&
      loanRequest.moe === 'DAI' &&
      loanRequest.mpr >= contractParams.mpr &&
      loanRequest.duration === contractParams.duration
    )
  })
}

function sortLoanRequests (loanRequests) {
  return loanRequests.sort((a, b) => {
    return b.mpr - a.mpr
  })
}

module.exports = {
  investPoolDAI
}

if (!module.parent) {
  investPoolDAI()
}
