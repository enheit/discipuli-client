import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownMenuItems from './dropdown-menu-items';
import DetectOutsideClick from '../../render-props/detect-outside-click';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggleDropdownMenu = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    return (
      <div
        className="dropdown-menu"
      >
        <button
          type="button"
          className="dropdown-menu__entry-button"
          onClick={this.toggleDropdownMenu}
        >
          {this.props.title}
        </button>
        {this.state.isOpen
          && (
            <DetectOutsideClick
              onClick={this.toggleDropdownMenu}
              render={ref => (
                <DropdownMenuItems
                  ref={ref}
                  handleOutsideEvent={this.toggleDropdownMenu}
                  horizontalReverse={this.props.horizontalReverse}
                >
                  {this.props.children}
                </DropdownMenuItems>
              )}
            />
          )
        }
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  horizontalReverse: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropdownMenu;
