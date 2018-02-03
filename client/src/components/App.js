import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import LoadableListContainer from './LoadableListContainer';

export default class App extends Component {
    render() {
        const defaultRoute = window.localStorage.getItem('defaultRoute') || '/switch/coming_soon';

        return (
            <Router>
                <Switch>
                    <Route component={LoadableListContainer} path="/:platform/:type" />
                    <Redirect to={defaultRoute} />
                </Switch>
            </Router>
        );
    }
};
