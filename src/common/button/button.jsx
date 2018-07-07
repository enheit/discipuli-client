import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => (
  // The next eslint-line was disabled because there is a bug with the rule:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1555
  /* eslint-disable-next-line react/button-has-type */
  <button
    disabled={props.disabled}
    className={classNames({
      button: true,
      'button--disabled': props.disabled,
      'button--positive': props.positive,
      'button--negative': props.negative,
    })}
    type={props.type}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

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
  children: PropTypes.node.isRequired,
};

export default Button;
