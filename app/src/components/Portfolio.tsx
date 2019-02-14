import React from 'react';
import styled, { css } from 'styled-components';

import Card from '../components/Card';

import Button from '../components/Button';

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
        <BarPortionChart data={data} />
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

interface PortionProps {
  width: number;
  color: string;
  token: string;
}

interface BarPortionChartProps {
  data: PortionProps[];
}

const BarPortionChart = ({ data }: BarPortionChartProps) => {
  return (
    <Wrapper>
      <BarsWrapper>
        {data.map(props => {
          return (
            <Portion key={`${props.token}-portion`} {...props}>
              <Percentage {...props} />
            </Portion>
          );
        })}
      </BarsWrapper>
      <Caption data={data} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BarsWrapper = styled.div`
  height: 1em;
  display: flex;
  margin: var(--spacing-text);

  div:first-of-type {
    border-radius: 8px 0 0 8px;
  }
  div:last-of-type {
    border-radius: 0 8px 8px 0;
  }
`;

const Caption = ({ data }: BarPortionChartProps) => {
  return (
    <CaptionList>
      {data.map(props => {
        return (
          <CaptionItem key={`${props.token}-capitem`} {...props}>
            <span /> {props.token}
          </CaptionItem>
        );
      })}
    </CaptionList>
  );
};

const CaptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5em;
  display: flex;
  justify-content: space-evenly;
`;

const CaptionItem = styled.li`
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.5em;
    background-color: ${props => props.color};
    margin-right: 0.5em;
  }
`;

const Percentage = ({ width, token }: PortionProps) => <span>{`${width}%`}</span>;

const Portion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 0.75em;

  ${props => {
    return css`
      width: ${props.width}%;
      background-color: ${props.color};
    `;
  }}
`;

export default Portfolio;
