import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import styles from '../css/app.css';

const List = (props) => {
  const { platform, type } = props.match.params;
  return (<h1 className={styles.feck}> {platform} - {type} </h1>);
};

List.propTypes = {
  match: PropTypes.object
};

export default List;
