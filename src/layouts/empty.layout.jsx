import React from 'react';
import PropTypes from 'prop-types';

const EmptyLayout = props => (
  <div className="empty-layout">
    {props.children}
  </div>
);

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmptyLayout;
