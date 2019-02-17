import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
const logger = logdown('AddPortfolioForm');
logger.state.isEnabled = process.env.NODE_ENV !== 'production';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  tokens: string[];
  onCreatePorfolio: () => void;
}

const AddPortfolioForm = ({ isOpen, onClose, tokens, onCreatePorfolio }: Props) => {
  const [balance, setBalance] = useState(tokens.map(token => ({ token, percentage: 50 })));
  const [email, setEmail] = useState('');

  const {
    userData: { address },
  } = useContext(Web3Context);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  //  {
  //   "email": "leolower@gmail.com",
  //   "address": "0xdontcare",
  //   "tokens": [
  //       {
  //           "token": "DAI",
  //           "percentage": 60
  //       },
  //       {
  //           "token": "ETH",
  //           "percentage": 40
  //       }
  //   ]
  // }

  const handleCreate = useCallback(
    () => {
      axios
        .post(`${API_URL}/portfolios/`, {
          email,
          address,
          tokens: balance,
        })
        .then(function(response) {
          logger.log('response', response);
          window.location.reload();
          if (onCreatePorfolio) {
            onCreatePorfolio();
          }
        })
        .catch(function(error) {
          logger.log('error', error.response);
          if (onCreatePorfolio) {
            onCreatePorfolio();
          }
        });
    },
    [email, balance, address],
  );

  const handleBalanceChange = token => event => {
    event.preventDefault();
    const newValue = event.target.value ? event.target.value.trim() : '';

    if (newValue === '' || newValue.match(/^(\d+\.?\d*|\.\d+)$/)) {
      setBalance(prevBalance => {
        return prevBalance.map(balance => {
          const nextBalance = { ...balance };
          if (nextBalance.token == token) {
            return {
              ...balance,
              percentage: newValue ? parseInt(newValue) : 0,
            };
          }

          return balance;
        });
      });
    }
  };

  const handleEmailChange = useCallback(event => {
    event.preventDefault();
    const newValue = event.target.value ? event.target.value.trim() : '';
    setEmail(newValue);
  }, []);

  const shouldDisableButton = useMemo(
    () => {
      return (
        !email ||
        // balance.filter(b => b.percentage == 0).length > 0 ||
        balance.reduce((acc, b) => acc + b.percentage, 0) !== 100
      );
    },
    [email, balance],
  );

  return isOpen ? (
    <>
      <Overlay />
      <Wrapper>
        <Content>
          <Close>
            <div onClick={handleClose}>X</div>
          </Close>
          <Title>Create Portfolio</Title>
          <Chart data={balance} />
          <SettingsWrapper>
            <h4>Settings:</h4>
            <BalanceSettingList>
              <Input value={email} onChange={handleEmailChange} placeholder={'email'} />
              {balance.map(line => (
                <BalanceSettingRow key={`${line.token}-setting-row`}>
                  <TokenSelect>{line.token}</TokenSelect>
                  <InputWrapper>
                    <Input value={line.percentage} onChange={handleBalanceChange(line.token)} />{' '}
                    <span>{' %'}</span>
                  </InputWrapper>
                </BalanceSettingRow>
              ))}
            </BalanceSettingList>
          </SettingsWrapper>
          <Button disabled={shouldDisableButton} onClick={handleCreate}>
            CREATE PORFOLIO
          </Button>
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
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: var(--input-height);
  letter-spacing: normal;
  text-align: left;
  color: #4d4f5c;

  > * {
    padding-bottom: var(--spacing-text);
  }

  &:last-child {
    padding-bottom: var(--spacing-text);
  }
`;

const BalanceSettingRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr;
  grid-gap: var(--spacing-text);
  padding-top: var(--spacing-text);
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: var(--spacing-text);
`;

const TokenSelect = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  height: var(--input-height);
  padding-left: var(--spacing-text);
`;

export default AddPortfolioForm;
