import { Component } from 'react';

class DocumentTitle extends Component {
  render() {
    const { title } = this.props;
    document.title = title;
    return null;
  }
}

export default DocumentTitle;
