import React from 'react';
import { hot } from 'react-hot-loader';
import logdown from 'logdown';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalStyles from './components/GlobalStyles';
import Landing from './pages/LandingPage';
import Portfolios from './pages/Portfolios';

const logger = logdown('App');
logger.state.isEnabled = process.env.NODE_ENV !== 'production';

const API_URL = process.env.API;

logger.log(API_URL);

const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/portfolios' component={Portfolios} />
        <Route component={Landing} />
      </Switch>
    </Router>
    <GlobalStyles />
  </>
);

export default hot(module)(App);
