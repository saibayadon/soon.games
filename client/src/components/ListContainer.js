import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import classNames from 'classNames';

// Actions Import
import { updateItems, isLoading, hasError } from '../actions';

// Styles Import
import styles from '../css/app.css';

// Components Imports
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

// ListContainer Component
class ListContainer extends Component {
    constructor(props) {
        super();

        const { platform, type } = props.match.params;
        const { items, isFetching, error } = props;
    }

    componentDidMount() {
        const { platform, type } = this.props.match.params;

        if (PLATFORMS.hasOwnProperty(platform) && TYPE.hasOwnProperty(type)) {
            this.fetchGameList(platform, type);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;
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
            this.props.dispatch(isLoading());
            const response = await axios.get(`${API_URL}?platform=${platform.toUpperCase()}&type=${type.toUpperCase()}`);
            const items = response.data.sort((a, b) => a.date - b.date);
            this.props.dispatch(updateItems(items));
        } catch (e) {
            this.props.dispatch(hasError(e));
        }
    }

    render() {
        const { items, isFetching, error } = this.props;
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

// PropTypes
ListContainer.propTypes = {
    match: PropTypes.object,
    items: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

// Map State to Props
const mapStateToProps = state => {
    return { items: state.items, isFetching: state.isFetching, error: state.error };
};

// Connect + Export
export default connect(mapStateToProps)(ListContainer);
