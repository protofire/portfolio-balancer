import Web3 from 'web3';
import Contract from 'web3/eth/contract';
import BigNumber from 'bignumber.js';
import axios from 'axios';
const API_URL = process.env.API;

import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';

import Card from '../components/Card';
import Button from '../components/Button';
import BalanceChart from '../components/BalanceChart';
import abi from '../InvestmentLiquidityPool.json';

const web3 = new Web3(window.ethereum);
const daiToken = '0x9e0852bc2cBaefc91044a0b054E90D231f08C979'
const poolAddress = '0x4CfaCAe8AD33e45BcEa18B021E3FC1e59C7E3898'

const daiContract = new web3.eth.Contract([ {"constant": false, "inputs": [{"name": "spender", "type": "address"}, {"name": "value", "type": "uint256"} ], "name": "approve", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x095ea7b3"}, {"constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18160ddd"}, {"constant": false, "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {"name": "value", "type": "uint256"} ], "name": "transferFrom", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x23b872dd"}, {"constant": false, "inputs": [{"name": "spender", "type": "address"}, {"name": "addedValue", "type": "uint256"} ], "name": "increaseAllowance", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x39509351"}, {"constant": true, "inputs": [{"name": "owner", "type": "address"} ], "name": "balanceOf", "outputs": [{"name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x70a08231"}, {"constant": false, "inputs": [{"name": "spender", "type": "address"}, {"name": "subtractedValue", "type": "uint256"} ], "name": "decreaseAllowance", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa457c2d7"}, {"constant": false, "inputs": [{"name": "to", "type": "address"}, {"name": "value", "type": "uint256"} ], "name": "transfer", "outputs": [{"name": "", "type": "bool"} ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa9059cbb"}, {"constant": true, "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"} ], "name": "allowance", "outputs": [{"name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd62ed3e"}, {"inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"} ], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, {"indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"} ], "name": "Transfer", "type": "event", "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"}, {"anonymous": false, "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {"indexed": true, "name": "spender", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"} ], "name": "Approval", "type": "event", "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"}], daiToken);
const poolContract = new web3.eth.Contract(abi.abi, poolAddress);

const Portfolio = ({ data }: any) => {
  const shouldShowBalanceButton = useMemo(
    () => {
      let unbalanced = false;
      data.tokens.forEach(token => {
        const current = data.currentStatus.find(cs => cs.token === token.token);
        if (current && current.percentage !== token.percentage) {
          unbalanced = true;
        }
      });

      return unbalanced;
    },
    [data],
  );
  const shouldShowWithdrawButton = useMemo(
    () => {
      return data.investment && !!data.investment.amount
    },
    [data],
  );
  const shouldShowDepositButton = useMemo(
    () => {
      return !!data.currentStatus[1].balance
    },
    [data],
  );

  const investDAI = useCallback(
    async () => {
      try {
        const [accountAddress] = await web3.eth.getAccounts()
        const jsAmount = data.currentStatus[1].balance
        const amount = (new BigNumber(jsAmount)).multipliedBy((new BigNumber(10)).pow(18)).toString(10)
        await daiContract.methods.approve(poolAddress, amount).send({from:accountAddress})
        await poolContract.methods.subscribe(accountAddress, amount).send({from:accountAddress})
        axios
          .patch(`${API_URL}/portfolios/${accountAddress}`, {
            address: poolAddress,
            percentage: data.currentStatus[1].percentage,
            amount: jsAmount
          })
          .then(function(response) {
            alert(`${jsAmount} DAI deposited on the pool :)`)
            window.location.reload()
          });
      } catch (error) {
        console.error(error);
        window.alert('Something went wrong :( Please try again ')
      }
    },
    [],
  );
  const withdrawDAI = useCallback(
    async () => {
      try {
        const [accountAddress] = await web3.eth.getAccounts()
        const jsAmount = data.investment.amount
        const amount = (new BigNumber(data.investment.amount)).multipliedBy((new BigNumber(10)).pow(18)).toString(10)
        await poolContract.methods.withdraw(amount).send({from:accountAddress})
        axios
          .patch(`${API_URL}/portfolios/${accountAddress}`, {
            address: poolAddress,
            percentage: 0,
            amount: 0
          })
          .then(function(response) {
            alert(`${jsAmount} DAI withdrawn from the pool :)`)
            window.location.reload()
          });
      } catch (error) {
        console.error(error);
        window.alert('Something went wrong :( Please try again ')
      }
    },
    [],
  );
  const balancePortfolio = useCallback(
    async () => {
      try {
        const ethBalance = data.currentStatus[0].totalDollarValue
        const daiBalance = data.currentStatus[1].totalDollarValue
        const mode = ethBalance > daiBalance ? 'buy' : 'sell'
        const amount = Math.abs(ethBalance - daiBalance) / 2

        if (window.confirm(`You should ${mode} ${amount} DAI to balance your portfolio`)) {
          window.AirSwap.Trader.render({
              mode,
              amount,
              token: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',//daiToken,
              onComplete: function(transactionId) {
                  console.info('Trade complete. Thank you, come again.', transactionId);
              }
          }, 'body');
        }
      } catch (error) {
        console.error(error);
        window.alert('Something went wrong :( Please try again ')
      }
    },
    [],
  );


  return (
    <PortfolioCard>
      <Title>Portfolio Name…</Title>
      <Content>
        <div>
          <h4>Settings</h4>
          <BalanceChart data={data.tokens} />
        </div>
        <div>
          <h4>Current Status</h4>
          <BalanceChart data={data.currentStatus} investment={data.investment} />
        </div>
      </Content>
      <Footer>
        {shouldShowBalanceButton && <Button onClick={balancePortfolio} >BALANCE PORTFOLIO</Button>}
        {shouldShowDepositButton && <Button onClick={investDAI}>Invest {data.currentStatus[1].balance} DAI</Button>}
        {shouldShowWithdrawButton && <Button onClick={withdrawDAI} >Withdraw from Pool ({data.investment.amount} DAI)</Button>}
      </Footer>
    </PortfolioCard>
  );
};

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  border-bottom: 1px solid var(--color-border);
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #222222;
  }
`;

const Footer = styled.div`
  ${Button} {
    font-size: 14px;
    font-weight: lighter;
    line-height: 1.36;
    margin: var(--spacing-narrow) 0;
  }
`;

const PortfolioCard = styled(Card)`
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Portfolio;
