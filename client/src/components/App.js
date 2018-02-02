import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import List from './List';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route component={List} path="/:platform/:type" />
                    <Redirect to="/switch/coming_soon"/>
                </Switch>
            </Router>
        );
    }
};
