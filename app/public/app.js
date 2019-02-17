const poolAddress = '0x4CfaCAe8AD33e45BcEa18B021E3FC1e59C7E3898'
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
const poolContract = new web3.eth.Contract([{
  "constant": true,
  "inputs": [],
  "name": "liquidityPercentage",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x048b87ba"
}, {
  "constant": true,
  "inputs": [],
  "name": "duration",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x0fb5a6b4"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "subscriptorIndex",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x2eb81a08"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "uint256"
  }],
  "name": "subscriptors",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x3c2fee93"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "amountInvested",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x3c3d3af6"
}, {
  "constant": true,
  "inputs": [],
  "name": "minCap",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x3fa615b0"
}, {
  "constant": true,
  "inputs": [],
  "name": "liquidityToken",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x43cd8f7e"
}, {
  "constant": true,
  "inputs": [],
  "name": "subscriptorsLimit",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x6699fec3"
}, {
  "constant": true,
  "inputs": [],
  "name": "mpr",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x66ad25be"
}, {
  "constant": true,
  "inputs": [],
  "name": "ltv",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x6fb49d73"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "subscriptionAmount",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x7a2e44e5"
}, {
  "constant": true,
  "inputs": [],
  "name": "feePercentage",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xa001ecdd"
}, {
  "constant": true,
  "inputs": [],
  "name": "broker",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xabff0110"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "subscriptionMoment",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xdc90ef98"
}, {
  "constant": true,
  "inputs": [],
  "name": "theoreticalPoolBalance",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xe7b18aa8"
}, {
  "inputs": [{
    "name": "_liquidityPercentage",
    "type": "uint256"
  }, {
    "name": "_feePercentage",
    "type": "uint256"
  }, {
    "name": "_subscriptorsLimit",
    "type": "uint256"
  }, {
    "name": "_minCap",
    "type": "uint256"
  }, {
    "name": "_mpr",
    "type": "uint256"
  }, {
    "name": "_ltv",
    "type": "uint256"
  }, {
    "name": "_duration",
    "type": "uint256"
  }, {
    "name": "_broker",
    "type": "address"
  }, {
    "name": "_liquidityToken",
    "type": "address"
  }, {
    "name": "_loanLedger",
    "type": "address"
  }, {
    "name": "_loanController",
    "type": "address"
  }, {
    "name": "_loanProxy",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor",
  "signature": "constructor"
}, {
  "constant": false,
  "inputs": [{
    "name": "subscriptor",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "name": "subscribe",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x8de69284"
}, {
  "constant": false,
  "inputs": [{
    "name": "amount",
    "type": "uint256"
  }],
  "name": "withdraw",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x2e1a7d4d"
}, {
  "constant": false,
  "inputs": [{
    "name": "loanAddress",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint128"
  }],
  "name": "invest",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xc7269e1e"
}, {
  "constant": false,
  "inputs": [{
    "name": "loanAddress",
    "type": "address"
  }],
  "name": "claimReturns",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x16af4453"
}, {
  "constant": true,
  "inputs": [{
    "name": "subscriptor",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x70a08231"
}, {
  "constant": true,
  "inputs": [],
  "name": "showSubscriptors",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x4be42628"
}, {
  "constant": true,
  "inputs": [],
  "name": "liquidityLimit",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x72163715"
}, {
  "constant": true,
  "inputs": [],
  "name": "poolData",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xfee151ae"
}], poolAddress)

$('#button').click(createPool)

createPool()

async function createPool() {
  const byteCode = await web3.eth.getCode(poolAddress)
  const [accountAddress] = await web3.eth.getAccounts()

  const params = {
    liquidityPercentage: $('#liquidityPercentage').val(),
    feePercentage: $('#feePercentage').val(),
    subscriptorsLimit: $('#subscriptorsLimit').val(),
    minCap: $('#minCap').val() + '000000000000000000',
    mpr: String(parseInt($('#mpr').val(), 10) * 10),
    ltv: String(parseInt($('#ltv').val(), 10) * 1000),
    duration: $('#duration').val(),
    broker: accountAddress,
    liquidityToken: '0xbd2f0a14d6077fa5cfa63f757429800bfe241d52',
    loanLedger: '0xec21584a997e5ff90becba025a467770e706bda2',
    loanController: '0x23410479ebacb543f1e5edc1d5413ee32bd9570b',
    loanProxyAddress: '0xf84bdfdc473bf139dae0f2a24c2e449cf89cadb0'
  }

  try {
    const result = await poolContract.deploy({
        data: byteCode,
        arguments: Object.values(params)
      })
      // .estimateGas((e, g) => {
      //   debugger;
      //   //code
      // })
      // .send({
      //   from: accountAddress,
      //   gas: 6500000,
      //   gasPrice: '30000000000000'
      // })
      debugger;
    console.log('result', result)
  } catch (error) {
    console.error(error)
  }
}
