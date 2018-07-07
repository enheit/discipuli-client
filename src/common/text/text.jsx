import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Text = props => (
  <p className={classNames({ text: true })}>
    {props.children}
  </p>
);

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Text;
