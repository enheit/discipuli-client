import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DropdownMenuItems = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className={
      classNames({
        'dropdown-menu__items': true,
        'dropdown-menu__items--horizontal-reverse': props.horizontalReverse,
      })
    }
  >
    {props.children}
  </div>
));

DropdownMenuItems.propTypes = {
  handleOutsideEvent: PropTypes.func.isRequired,
  horizontalReverse: PropTypes.bool,
};

export default DropdownMenuItems;
