import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import Card from '../components/Card';
import Button from '../components/Button';
import BalanceChart from '../components/BalanceChart';

// const data = [
//   {
//     width: 45,
//     color: '#c1adf4',
//     token: 'ETH',
//   },
//   {
//     width: 55,
//     color: '#65b1cb',
//     token: 'DAI',
//   },
// ];

const Portfolio = ({ data }: any) => {
  const shouldShowBlanceButton = useMemo(
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
          <BalanceChart data={data.currentStatus} />
        </div>
      </Content>
      <Footer>
        {shouldShowBlanceButton && <Button>BALANCE PORTFOLIO</Button>}
        <Button>Invest DAI</Button>
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
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Portfolio;
