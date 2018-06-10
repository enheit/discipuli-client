import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {

  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    document.querySelector('body').appendChild(this.container);
  }

  componentWillUnmount() {
    this.container.remove();
  }

  render() {
    return createPortal(this.props.render(), this.container);
  }
}

Portal.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Portal;
