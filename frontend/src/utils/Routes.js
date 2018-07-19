import React, { Component } from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Main from '../Pages/Main';
import SMSTable from '../Pages/SMSTable';

const history = createBrowserHistory();
/**
* ROUTES
* @author Fabio William Conceição
* @since 1.0
* @copyright Fabio William Conceição
*/
export default class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/sms/:id" component={SMSTable}/>
                </div>
            </Router>
        );
    }
}
