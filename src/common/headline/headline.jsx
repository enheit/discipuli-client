import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Headline = props => (
  <h1 className={classNames({
    headline: true,
    'headline--large': props.large,
    'headline--small': props.small,
  })}
  >
    {props.title ? props.title : props.render()}
  </h1>
);

Headline.defaultProps = {
  title: '',
  large: false,
  small: false,
  render: () => {},
};

Headline.propTypes = {
  title: PropTypes.string,
  large: PropTypes.bool,
  small: PropTypes.bool,
  render: PropTypes.func,
};

export default Headline;
