import React from 'react';
import Loadable from 'react-loadable';

// Styles
import styles from '../css/app.css';

// Components
const LoadableListContainer = Loadable({
  displayName: 'LoadableListContainer',
  loader: () => import('./ListContainer'),
  loading: () => <p className={styles.loading}> Loading... </p>,
});

export default LoadableListContainer;
