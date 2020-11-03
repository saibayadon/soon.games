import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';

// Styles
import styles from '../css/app.module.css';

const Nav = (props) => {
  const { platforms, types, match } = props;
  const { platform, type } = match.params;

  const platformLinks = Object.entries(platforms).map((item) => {
    const isSelected = item[0].toLowerCase() === platform;
    return (
      <li key={item}>
        <Link
          className={classNames({ [styles.selected]: isSelected })}
          to={`/${item[0].toLowerCase()}/${type}`}
        >
          {item[1].toLowerCase()}
        </Link>
      </li>
    );
  });

  const typeLinks = Object.entries(types).map((item) => {
    const isSelected = item[0].toLowerCase() === type;
    return (
      <li key={item}>
        <Link
          className={classNames({ [styles.selected]: isSelected })}
          to={`/${platform}/${item[0].toLowerCase()}`}
        >
          {item[1].toLowerCase()}
        </Link>
      </li>
    );
  });

  return (
    <nav className={styles.navigation}>
      <ul>platform:{platformLinks}</ul>
      <ul>type:{typeLinks}</ul>
    </nav>
  );
};

export default withRouter(Nav);
