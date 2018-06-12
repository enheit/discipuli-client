import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WithFilter extends Component {
  render() {
    return this.props.render(this.props.list.filter(this.props.filter));
  }
}

WithFilter.propTypes = {
  render: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
}

export default WithFilter;