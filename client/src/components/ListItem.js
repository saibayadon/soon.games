import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Styles
import styles from '../css/app.css';

const ListItem = (props) => {
    const { title, link, date, thumbnail } = props;

    const parsedDate = moment(date, 'X').endOf('day').fromNow();
    const metacritic = link;
    const youtube = `https://www.youtube.com/results?search_query=${title} trailer`;

    return (
        <li>
            <span className={styles['game-title']}>{title}</span> <span className={styles.highlight}>{parsedDate}</span> - <a target="_blank" href={metacritic}>metacritic</a> / <a target="_blank" href={youtube}>youtube</a>
        </li>
    );
};

ListItem.propTypes = {
    title: PropTypes.string,
    date: PropTypes.number,
    link: PropTypes.string,
    thumbnail: PropTypes.string
};

export default ListItem;
