import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import * as images from '../images';

const HomePage = () => {
  return (
    <Wrapper>
      <Content>
        <Hero>
          <h1>Welcome,</h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <GetStarted inline>GET STARTED!</GetStarted>
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
  height: 352px;
  border-radius: 10px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 25px;
  position: relative;

  h1 {
    font-size: 19px;
    font-weight: bold;
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

export default HomePage;
