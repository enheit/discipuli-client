import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownMenuItems from './dropdown-menu-items';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.componentRef = React.createRef();
  }

  toggleDropdownMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div ref={this.componentRef} className="dropdown-menu">
        <button className="dropdown-menu__entry-button" onClick={this.toggleDropdownMenu}>
          {this.props.title}
        </button>
        {this.state.isOpen &&
          <DropdownMenuItems
            handleOutsideEvent={this.toggleDropdownMenu}
            parentRef={this.componentRef}
            horizontalReverse={this.props.horizontalReverse}
          >
            {this.props.children}
          </DropdownMenuItems>}
      </div>
    )
  }
}

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  horizontalReverse: PropTypes.bool,
};

export default DropdownMenu;