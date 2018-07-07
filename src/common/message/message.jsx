import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = props => (
  <span
    className={classNames({
      message: true,
      'message--error': props.error,
      'message--success': props.success,
    })}
  >
    {props.message}
  </span>
);

Message.defaultProps = {
  error: false,
  success: false,
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default Message;
