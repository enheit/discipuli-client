import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Message = (props) => {
  return (
    <span
      className={classNames({
        'message': true,
        'message--error': props.error,
        'message--success': props.success,
      })}
    >
      {props.message}
    </span>
  )
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default Message;