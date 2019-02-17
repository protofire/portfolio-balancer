require('dotenv').config()
const { getPoolData, getContractParams, investOnLoan } = require('../lib/pool')

/**
 * Invests the available pool balance on loan requests that match the pool paramaters
 */
async function investPoolDAI () {
  try {
    const availableDAI = (await getPoolData()).balance
    const contractParams = await getContractParams()
    if (availableDAI > 0) {
      const allLoanRequests = await getAllLoanRequests()
      const matchingLoanRequests = await getMatchingLoanRequests(
        contractParams,
        allLoanRequests
      )
      const bestMatch = await sortLoanRequests(matchingLoanRequests)[0]
      if (bestMatch) {
        const amount = Math.min(availableDAI, bestMatch.loanAmount)
        await investOnLoan(
          bestMatch,
          adjustTo5Percent(amount, bestMatch.loanAmount)
        )
      } else {
        console.log('No matching loan requests :(')
      }
    } else {
      console.log('No DAI to invest :(')
    }
  } catch (error) {
    console.error('Error while investing')
  }
}

/**
 * Gets the list of all the loan requests from ETHLend
 */
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
  // console.log(requestsData)
  // return requestsData
}

/**
 * Filters loan requests that match the pool contract parameters
 * @param  {Object} contractParams  Current pool parameters
 * @param  {Array} allLoanRequests EthLend loan requests
 * @return {Array}                 ETHLend loan requests that match the pool params
 */
function getMatchingLoanRequests (contractParams, allLoanRequests) {
  return allLoanRequests.filter(loanRequest => {
    return (
      loanRequest.state === 'Funding' &&
      loanRequest.moe === 'DAI' &&
      loanRequest.mpr >= contractParams.mpr &&
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

/**
 * Sorts the a list of loan requests acording to their generated revenue
 * @param  {Array} loanRequests
 * @return {Array}
 */
function sortLoanRequests (loanRequests) {
  return loanRequests.sort((a, b) => {
    return b.mpr - a.mpr
  })
}

/**
 * Adjusts `amount` to the closest number that is multiple of the 5% of the max amount
 * @param  {Number} amount
 * @param  {Number} max
 * @return {Number}
 */
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
