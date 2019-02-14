import React from 'react';
import styled, { css } from 'styled-components';

import { Content, Layout, NavBar } from './layout';

const Portofios = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <div>Portfolio here</div>
      </Content>
    </Layout>
  );
};

export default Portofios;
