import React from 'react';
import classNames from 'classnames';

const Text = (props) => (
  <p className={classNames({
    'text': true,
  })}>
    {props.children}
  </p>
);

export default Text;
