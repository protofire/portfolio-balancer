import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import logdown from 'logdown';
import axios from 'axios';

import { Web3Context } from '../components/Web3Provider/Web3Provider';
import Overlay from '../components/Overlay';
import Button from '../components/Button';
import Card from '../components/Card';
import BalanceChart, { PortionProps } from '../components/BalanceChart';
import Input from '../components/Input';

const API_URL = process.env.API;
const logger = logdown('AddPortfolio');
logger.state.isEnabled = process.env.NODE_ENV !== 'production';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  data: PortionProps[];
}

const AddPortfolioForm = ({ isOpen, onClose, data }: Props) => {
  const context = useContext(Web3Context);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  return isOpen ? (
    <>
      <Overlay />
      <Wrapper>
        <Content>
          <Close>
            <div onClick={handleClose}>X</div>
          </Close>
          <Title>Create Portfolio</Title>
          <Chart data={data} />
          <SettingsWrapper>
            <h4>Settings:</h4>
            <BalanceSettingList>
              {data.map(line => (
                <BalanceSettingRow>
                  <TokenSelect>{line.token}</TokenSelect>
                  <Input value={line.width} />
                </BalanceSettingRow>
              ))}
            </BalanceSettingList>
          </SettingsWrapper>
          <Button>BALANCE PORTFOLIO</Button>
        </Content>
      </Wrapper>
    </>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  z-index: 1001;
  position: fixed;
  top: calc(var(--header-height) * 3);
  left: 50%;
  transform: translateX(-50%);
`;
const Content = styled(Card)`
  position: relative;
  width: 318px;

  ${Button} {
    font-size: 14px;
    font-weight: lighter;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
`;

const Close = styled.div`
  font-family: Arial;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: center;
  color: #222222;
  position: absolute;
  top: 1em;
  right: 1em;

  div {
    justify-self: flex-end;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  color: #222222;
  border-bottom: 1px solid var(--color-border);
`;

const Chart = styled(BalanceChart)`
  padding-top: var(--spacing-normal);
`;

const SettingsWrapper = styled.div`
  padding-top: var(--spacing-normal);

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

const BalanceSettingList = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    padding-bottom: var(--spacing-text);
  }

  &:last-child {
    padding-bottom: var(--spacing-text);
  }
`;

const BalanceSettingRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: var(--spacing-text);
  padding-top: var(--spacing-text);
`;

const TokenSelect = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  height: var(--input-height);
  padding-left: var(--spacing-text);

  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: var(--input-height);
  letter-spacing: normal;
  text-align: left;
  color: #4d4f5c;
`;

export default AddPortfolioForm;
