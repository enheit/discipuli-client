import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetectOutsideClick extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if(this.ref && !this.ref.current.contains(event.target)) {
      this.props.onClick();
    }
  }

  render() {
    return this.props.render(this.ref);
  }
}

export default DetectOutsideClick;