import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// The next component was disabled because there is a bug with the list of rules:
// https://github.com/yannickcr/eslint-plugin-react/issues/1841
/* eslint-disable react/prop-types, react/require-default-props, react/no-unused-prop-types */
const Options = (props, ref) => {
  const renderOption = (option, index) => {
    const isOptionFocused = props.focusedOption.value === option.value;

    return (
      <div
        role="option"
        // Use onKeyDown for people with disabilities
        aria-selected={props.value === option.value}
        // Use onKeyDown for people with disabilities
        tabIndex="0"
        key={option.value}
        ref={optionRef => props.optionRef(optionRef, isOptionFocused)}
        onClick={() => props.onChange(option, index)}
        onMouseEnter={() => props.onMouseEnter(index)}
        // Use onKeyDown for people with disabilities
        onKeyDown={() => props.onChange(option, index)}
        className={classNames({
          select__option: true,
          'select__option--hovered': isOptionFocused,
          'select__option--selected': props.value === option.value,
        })}
      >
        {props.render(option)}
      </div>
    );
  };

  const renderEmptyResult = () => (
    <div className="select__option">
      Result not found
    </div>
  );

  const renderOptions = (options) => {
    if (options.length > 0) {
      return options.map(renderOption);
    }

    return renderEmptyResult();
  };

  return (
    <div
      ref={ref}
    >
      <div
        className="select__options"
        ref={props.menuRef}
      >
        {renderOptions(props.options)}
      </div>
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]).isRequired,
    }),
  ),
  menuRef: PropTypes.node.isRequired,
  focusedOption: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  }),
  optionRef: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  }),
  render: PropTypes.func.isRequired,
};

export default React.forwardRef(Options);
/* eslint-enable react/prop-types, react/require-default-props, react/no-unused-prop-types */
