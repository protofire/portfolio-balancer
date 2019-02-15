import React from 'react';
import styled, { css } from 'styled-components';

export interface PortionProps {
  width: number;
  color?: string;
  token: string;
}

interface BalanceChartProps {
  data: PortionProps[];
}

const DEFAULT_COLORS = ['#c1adf4', '#65b1cb'];

const BalanceChart = ({ data, ...props }: BalanceChartProps) => {
  return (
    <Wrapper {...props}>
      <BarsWrapper>
        {data.map((props, i) => {
          const propsWithColor = { ...props };
          if (!propsWithColor.color) {
            propsWithColor.color = DEFAULT_COLORS[i];
          }
          return (
            <Portion key={`${props.token}-portion`} {...propsWithColor}>
              <Percentage {...propsWithColor} />
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

const Caption = ({ data }: BalanceChartProps) => {
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

export default BalanceChart;
