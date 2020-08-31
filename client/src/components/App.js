import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Styles
import styles from '../css/app.module.css';

// Lazy Components
const LazyListContainer = lazy(() => import('./ListContainer'));

export default class App extends Component {
  render() {
    const defaultRoute =
      window.localStorage.getItem('defaultRoute') || '/switch/coming_soon';

    return (
      <Router>
        <Switch>
          <Route
            component={() => (
              <Suspense
                fallback={<p className={styles.loading}> loading... </p>}
              >
                <LazyListContainer />
              </Suspense>
            )}
            path="/:platform/:type"
          />
          <Redirect to={defaultRoute} />
        </Switch>
      </Router>
    );
  }
}
