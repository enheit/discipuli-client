import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={classNames({
        'button': true,
        'button--disabled': props.disabled,
        'button--positive': props.positive,
        'button--negative': props.negative,
      })}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,

  disabled: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
};

export default Button;
