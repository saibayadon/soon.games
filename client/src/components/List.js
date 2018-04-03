import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from '../css/app.css';

// Components
import ListItem from './ListItem';

const List = (props) => {
    const { items } = props;

    const itemsElements = items.map((item, index) => {
        return (<ListItem key={item.title + index} title={item.title} date={item.date} link={item.link} thumbnail={item.thumbnail} />);
    });

    return (
        <ul className={styles.list}>
            {itemsElements}
        </ul>
    );
};

List.propTypes = {
    items: PropTypes.array
};

export default List;
