import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classNames';

// Styles
import styles from '../css/app.css';

const Nav = (props) => {
    const { platforms, types } = props;
    const { platform, type } = props.match.params;

    const platformLinks = Object.entries(platforms).map(item => {
        const isSelected = item[0].toLowerCase() === platform;
        return <li key={item}><Link className={classNames({ [styles.selected]: isSelected })} to={'/' + item[0].toLowerCase() + '/' + type}>{item[1].toLowerCase()}</Link></li>;
    });

    const typeLinks = Object.entries(types).map(item => {
        const isSelected = item[0].toLowerCase() === type;
        return <li key={item}><Link className={classNames({ [styles.selected]: isSelected })} to={'/' + platform + '/' + item[0].toLowerCase()}>{item[1].toLowerCase()}</Link></li>;
    });

    return (
        <nav className={styles.navigation}>
            <ul>platform:{platformLinks}</ul>
            <ul>type:{typeLinks}</ul>
        </nav>
    );
};

Nav.propTypes = {
    match: PropTypes.object,
    platforms: PropTypes.object,
    types: PropTypes.object
};

export default withRouter(Nav);
