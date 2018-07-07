import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ButtonLink = props => (
  <Link
    to={props.to}
    className={classNames({
      button: true,
      'button--disabled': props.disabled,
      'button--positive': props.positive,
      'button--negative': props.negative,
    })}
  >
    {props.children}
  </Link>
);

ButtonLink.defaultProps = {
  disabled: false,
  positive: false,
  negative: false,
};

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ButtonLink;
