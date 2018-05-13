import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Headline = (props) => {
  return (
    <h1 className={classNames({
      'headline': true,
      'headline--large': props.large,
      'headline--small': props.small,
    })}>
      {props.title}
    </h1>
  )
}

Headline.propTypes = {
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
  small: PropTypes.bool,
};

export default Headline;