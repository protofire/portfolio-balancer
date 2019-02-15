import React from 'react';
import styled, { css } from 'styled-components';

import Card from '../components/Card';
import Button from '../components/Button';
import BalanceChart from '../components/BalanceChart';

const data = [
  {
    width: 45,
    color: '#c1adf4',
    token: 'ETH',
  },
  {
    width: 55,
    color: '#65b1cb',
    token: 'DAI',
  },
];

const Portfolio = () => {
  return (
    <PortfolioCard>
      <Title>Portfolio Name…</Title>
      <Content>
        <BalanceChart data={data} />
      </Content>
      <Footer>
        <Button>BALANCE PORTFOLIO</Button>
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
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Footer = styled.div`
  ${Button} {
    font-size: 14px;
    font-weight: lighter;
    line-height: 1.36;
  }
`;

const PortfolioCard = styled(Card)`
  width: 260px;
  height: 422px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Portfolio;
