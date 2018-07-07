import React from 'react';
import PropTypes from 'prop-types';

const Label = props => (
  // The next eslint-line was disabled because there is a bug with the rule:
  // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/455
  /* eslint-disable-next-line jsx-a11y/label-has-for */
  <label
    className="label"
    htmlFor={props.for}
  >
    {props.title}
  </label>
);

Label.propTypes = {
  for: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Label;
