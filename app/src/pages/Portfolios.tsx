import React from 'react';
import styled, { css } from 'styled-components';

import { Content, Layout, NavBar } from './layout';
import CardList from '../components/CardList';
import Card from '../components/Card';

import * as images from '../images';

const Portofios = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <Section>
          <AddPortfolioCard>
            <img src={images.add_button} />
            <span>Add Portfolio</span>
          </AddPortfolioCard>
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

const AddPortfolioCard = styled(Card)`
  width: 260px;
  height: 422px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin-top: var(--spacing-narrow);
    font-size: 15px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }
`;

export default Portofios;
