import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import logdown from 'logdown';
import axios from 'axios';

import Web3Provider, { Web3Context } from '../components/Web3Provider/Web3Provider';

import { Content, Layout, NavBar } from './layout';
import AddPortfolio from '../components/AddPortfolio';
import Portfolio from '../components/Portfolio';
import Spinner from '../components/Spinner';

const API_URL = process.env.API;
const logger = logdown('Portfolio');
logger.state.isEnabled = process.env.NODE_ENV !== 'production';

const PortfoliosProvider = () => {
  return (
    <Web3Provider>
      <PortfoliosConsumer />
    </Web3Provider>
  );
};

const PortfoliosConsumer = () => {
  const [isLoading, setIsloading] = useState(true);
  const [portfolios, setPortfolios] = useState(null);

  const {
    userData: { address: userAddress },
  } = useContext(Web3Context);

  // console.log(context)

  useEffect(
    () => {
      getPortfolios();
    },
    [userAddress],
  );

  const getPortfolios = () => {
    logger.log('address', userAddress);
    axios
      .get(`${API_URL}/portfolios/${userAddress}`)
      .then(result => {
        console.log(result);
        if (result && result.data && result.data[0] && result.data[0].tokens) {
          setPortfolios(result.data[0].tokens);
        }
        setIsloading(false);
      })
      .catch(error => {
        if (error.response.status === 404) {
          setIsloading(false);
          setPortfolios(null);
        }
      });
  };

  return isLoading ? (
    <Spinner size={'big'} />
  ) : (
    <Layout>
      <NavBar />
      <Content>
        <Title>Your Portfolios</Title>
        <Section>
          {portfolios ? <Portfolio data={portfolios} /> : <AddPortfolio onCreatePorfolio={getPortfolios} />}
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
