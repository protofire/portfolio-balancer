import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import Web3Provider, { Web3Context } from '../components/Web3Provider/Web3Provider';

import { Content, Layout, NavBar } from './layout';
import AddPortfolio from '../components/AddPortfolio';
import Portfolio from '../components/Portfolio';
import Spinner from '../components/Spinner';

const PortfoliosProvider = () => {
  return (
    <Web3Provider>
      <PortfoliosConsumer />
    </Web3Provider>
  );
};

const PortfoliosConsumer = () => {
  const [isLoading, setIsloading] = useState(true);
  const context = useContext(Web3Context);

  return isLoading ? (
    <Spinner size={'big'} />
  ) : (
    <Layout>
      <NavBar />
      <Content>
        <Title>Your Portfolios</Title>
        <Section>
          <AddPortfolio />
          <Portfolio />
        </Section>
      </Content>
    </Layout>
  );
};

const Section = styled.section`
  padding: var(--spacing-normal) 10%;
  display: flex;
  justify-content: space-around;
`;

const Title = styled.header`
  padding-top: 1.5em;
  padding-bottom: 0.2em;
  border-bottom: 1px solid var(--color-border);
  margin: 0 10%;
  line-height: 1.33;
`;

export default PortfoliosProvider;
