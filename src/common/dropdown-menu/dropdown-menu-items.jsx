import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
      <div ref={this.componentRef} className={
        classNames({
          'dropdown-menu__items': true,
          'dropdown-menu__items--horizontal-reverse': this.props.horizontalReverse,
        })
      }>
        {this.props.children}
      </div>
    )
  }
}

DropdownMenuItems.propTypes = {
  handleOutsideEvent: PropTypes.func.isRequired,
  horizontalReverse: PropTypes.bool,
};

export default DropdownMenuItems;