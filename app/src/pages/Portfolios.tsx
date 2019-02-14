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
        <Section>
          <AddPortfolio />
          <Portfolio />
        </Section>
      </Content>
    </Layout>
  );
};

const Section = styled.section`
  padding: var(--spacing-normal);
  display: flex;
  justify-content: space-around;
`;

export default Portofios;
