import React from 'react';
import classNames from 'classnames';

const Options = React.forwardRef((props, ref) => {
  const renderOptions = (options) => {
    if(options.length > 0) {
      return options.map(renderOption);
    }

    return renderEmptyResult();
  }

  const renderOption = (option, index) => {
    const isOptionFocused = props.focusedOption.value === option.value;

    return (
      <div
        key={option.value}
        ref={ref => props.optionRef(ref, isOptionFocused)}
        onClick={() => props.onChange(option, index)}
        onMouseEnter={() => props.onMouseEnter(index)}
        className={classNames({
          'select__option': true,
          'select__option--hovered': isOptionFocused,
          'select__option--selected': props.value === option.value,
        })}
      >
        {props.render(option)}
      </div>
    )
  }

  const renderEmptyResult = () => {
    return (
      <div className="select__option">
        Result not found
      </div>
    );
  }

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
  )
});

// TODO: Add propTypes

export default Options;
