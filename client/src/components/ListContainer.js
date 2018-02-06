import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classNames';

// Styles
import styles from '../css/app.css';

// Components
import Nav from './Nav';
import List from './List';
import DocumentTitle from './DocumentTitle';

// Constants
const API_URL = 'https://jl1g3l3td5.execute-api.us-east-1.amazonaws.com/prod';

export const PLATFORMS = {
  'switch': 'SWITCH',
  'ps4': 'PS4',
  'pc': 'PC',
  '3ds': '3DS',
  'xbone': 'XBOX ONE X'
};

export const TYPE = {
  'new': 'RECENT RELEASES',
  'coming_soon': 'COMING SOON'
};

export default class ListContainer extends Component {
    constructor(props) {
        super();

        const { platform, type } = props.match.params;

        this.state = {
            isFetching: false,
            items: [],
            error: null
        };
    }

    componentDidMount() {
        const { platform, type } = this.props.match.params;

        if (PLATFORMS.hasOwnProperty(platform) && TYPE.hasOwnProperty(type)) {
            this.fetchGameList(platform, type);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { platform, type } = nextProps.match.params;
        const { platform: currentPlatform, type: currentType } = this.props.match.params;

        if (platform !== currentPlatform || type !== currentType) {
            // Save route as default for subsequent visits.
            window.localStorage.setItem('defaultRoute', `/${platform}/${type}`);

            // Re-fetch data.
            if (PLATFORMS.hasOwnProperty(platform) && TYPE.hasOwnProperty(type)) {
                this.fetchGameList(platform, type);
            }
        }
    }

    async fetchGameList(platform, type) {
        try {
            this.setState({ items: [], isFetching: true });
            const response = await axios.get(`${API_URL}?platform=${platform.toUpperCase()}&type=${type.toUpperCase()}`);

            // Sort items
            const items = response.data.sort((a, b) => a.date - b.date);

            // Set State
            this.setState({ items: type === 'new' ? items.reverse() : items, error: null, isFetching: false });
        } catch (e) {
            this.setState({ items: [], error: e, isFetching: false });
        }
    }

    render() {
        const { items, isFetching, error } = this.state;
        const { platform, type } = this.props.match.params;

        const sectionInfo = `${PLATFORMS[platform]} - ${TYPE[type]}`;

        return (
            <div className={styles[platform.replace('3ds', 'threeds')]}>
                <DocumentTitle title={sectionInfo} />
                <Nav platforms={PLATFORMS} types={TYPE} />
                <h1 className={styles.title}>{sectionInfo}</h1>
                 {isFetching ? <p className={styles.loading}> Loading... </p> : null}
                 {error ? <p className={styles.error}> {error} </p> : null}
                <List items={items} />
            </div>
        );
    }
};

ListContainer.propTypes = {
    match: PropTypes.object
};
