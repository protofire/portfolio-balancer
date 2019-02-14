import React from 'react';
import styled from 'styled-components';

import * as images from '../../images';

interface OwnProps {
  children?: React.ReactNode;
}

const NavBar = ({ children }: OwnProps) => (
  <Container>
    <Logo src={images.protofire_b} />
    {children}
  </Container>
);

const Container = styled.nav`
  height: var(--header-height);
  padding: 0 var(--spacing-normal);
  background-color: var(--color-main-bg);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.12);

  transition: background-color var(--animation-duration) ease;
  padding: 0 10%;
  display: flex;
  align-items: center;
`;

const Logo = styled.img``;

export default NavBar;
