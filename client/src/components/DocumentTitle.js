import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DocumentTitle extends Component {
    render() {
        document.title = this.props.title;
        return null;
    }
};

DocumentTitle.propTypes = {
    title: PropTypes.string
};

export default DocumentTitle;
