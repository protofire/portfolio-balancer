import React from 'react';
import styled, { css } from 'styled-components';

import { Content, Layout, NavBar } from './layout';
import AddPortfolio from '../components/AddPortfolio';
import Portfolio from '../components/Portfolio';

const Portofios = () => {
  return (
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

export default Portofios;
