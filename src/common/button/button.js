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
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  positive: false,
  negative: false,
  type: 'submit',
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
