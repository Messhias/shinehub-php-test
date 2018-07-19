import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import logo from './logo.svg';
import 'bulma/css/bulma.css'
import './App.css';
import Routes from './utils/Routes';

const history = createBrowserHistory();


class App extends Component {
  render() {
    return (

        <Router history={history}>
          <BrowserRouter basename='/sms'>
              <Routes />
          </BrowserRouter>
        </Router>
    );
  }
}

export default App;
