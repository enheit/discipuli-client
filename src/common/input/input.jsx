import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = props => (
  <input
    id={props.id}
    name={props.name}
    className={classNames({
      input: true,
      'input--disabled': props.disabled,
    })}
    disabled={props.disabled}
    type={props.type}
    value={props.value}
    onChange={props.onChange}
    placeholder={props.placeholder}
  />
);

Input.defaultProps = {
  placeholder: '',
  disabled: false,
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
