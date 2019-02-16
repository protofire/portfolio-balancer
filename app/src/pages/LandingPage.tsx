import React, { useCallback } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import * as images from '../images';

const HomePage = ({ history }: RouteComponentProps) => {
  const startHandler = useCallback(() => {
    history.push('/portfolios');
  }, []);

  return (
    <Wrapper>
      <Content>
        <Hero>
          <h1>Hedge Your Crypto Portfolio</h1>
          <br />
          <h2>What is it and why you want to do it</h2>
          <p>
            Hedging your cryptocurrency portfolio <b>lowers the overall risk of your portfolio</b>, which is
            important as cryptocurrency is naturally <b>risky due to its volatility</b>. In a volatile market
            where <u>most cryptocurrencies are correlated</u> (the asset’s prices move similarly), a viable
            way to hedge your crypto investment is to <b>move OUT of cryptocurrency</b> and into the US dollar
            or even better <b>INTO MAKERDAO DAI</b>.
          </p>
          <h2>Don't stop there, invest some DAI into decentralized money market funds</h2>
          <p>
            These funds will wiselly invest their DAI by funding loans from the EthLend marketplace based on
            clear rules (eg.: amount, duration, MPR, LTV, etc) <br />
            The repayments of the loans will be distributed among the investors.
          </p>
          <GetStarted inline onClick={startHandler}>
            GET STARTED!
          </GetStarted>
        </Hero>
      </Content>
      <Footer>
        <Logo src={images.protofire} />
      </Footer>
    </Wrapper>
  );
};

const Logo = styled.img``;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url(${images.home}) no-repeat center center fixed;
  background-size: cover;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Hero = styled.div`
  width: 680px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 25px;
  position: relative;

  h1 {
    font-size: 19px;
    font-weight: bold;
    color: darkorange;
  }

  p {
    margin: 0;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: left;
    padding-top: 1em;
    padding-bottom: 2em;
  }
`;
const Footer = styled.footer`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const GetStarted = styled(Button)`
  position: absolute;
  bottom: 22px;
  right: 32px;
`;

export default withRouter(HomePage);
