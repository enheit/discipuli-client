import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropdownMenuItems extends Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    if(!this.props.parentRef.current.contains(event.target)) {
      this.props.handleOutsideEvent(event);
    }
  }

  render() {
    return (
      <div ref={this.componentRef} className="dropdown-menu__items">
        {this.props.children}
      </div>
    )
  }
}

DropdownMenuItems.propTypes = {
  handleOutsideEvent: PropTypes.func.isRequired,
};

export default DropdownMenuItems;