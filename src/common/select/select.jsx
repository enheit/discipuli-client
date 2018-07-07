import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Options from './options';
import Option from './option';

import WithFilter from '../../render-props/with-filter';
import DetectOutsideClick from '../../render-props/detect-outside-click';

const getSelectedOption = (options, value) => options
  .find(option => option.value === value);

const getSelectedOptionIndex = (options, value) => options
  .findIndex(option => option.value === value);

class Select extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.optionsRef = null;

    this.state = this.initialState();
  }

  componentDidUpdate() {
    if (this.state.isOpen && this.focusedOptionRef) {
      this.adjustOptionVisibility();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.options.length > 0) {
      const option = getSelectedOption(nextProps.options, nextProps.value);
      const optionIndex = getSelectedOptionIndex(nextProps.options, nextProps.value);
      const selectedOption = option || null;
      const selectedOptionIndex = optionIndex !== -1 ? optionIndex : null;
      const focusedOptionIndex = selectedOptionIndex || 0;
      const inputValue = selectedOption ? selectedOption.label : '';

      return {
        inputValue,
        selectedOption,
        selectedOptionIndex,
        focusedOptionIndex,
      };
    }

    return null;
  }

  getPlaceholder = () => {
    if (this.props.loading) {
      return 'Loading';
    }

    return this.props.placeholder;
  }

  getCurrentSelectedValue = () => (
    this.state.selectedOption
      ? this.state.selectedOption.value
      : null
  );

  handleSelectorClick = () => {
    if (!this.props.disabled) {
      // We need to focus input when click on [Select...][^] <- dropdown icon.
      // In case we do not focus input after dropdown icon was clicked, the user
      // will not be able to use arrow keys to navigate within menu.
      this.inputRef.current.focus();
      this.toggleSelect();
    }
  }

  handleFilter = option => option.label
    .toLowerCase()
    .indexOf(this.state.inputFilter.toLowerCase()) !== -1;

  handleOptionChange = (option, index) => {
    if (option) {
      this.setState({
        selectedOption: option,
        selectedOptionIndex: index,
        focusedOptionIndex: index,
        inputValue: option.label,
        inputFilter: '',
        isOpen: false,
      });

      this.props.onChange(option);
    }
  }

  handleOptionsRef = (ref) => {
    this.optionsRef = ref;
  }

  handleOptionRef = (ref, isOptionFocused) => {
    if (isOptionFocused) {
      this.focusedOptionRef = ref;
    }
  }

  handleInputKeyDown = (event, options, originalOptions) => {
    switch (event.keyCode) {
      case 13: // Enter
        this.handleEnter(event, options, originalOptions);
        break;
      case 9: // Tab
        this.handleTab(event, options, originalOptions);
        break;
      case 38: // ArrowUp
        this.handleArrowUp(event, options);
        break;
      case 40: // ArrowDown
        this.handleArrowDown(event, options);
        break;
      case 27: // Escape
        this.handleEscape(event);
        break;
      default:
        break;
    }
  }

  handleDropdownIconKeyDown = (event) => {
    switch (event.keyCode) {
      case 13:
      case 40:
        this.handleSelectorClick();
        break;
      default:
        break;
    }
  }

  handleEnter = (event, options, originalOptions) => {
    if (this.state.isOpen) {
      const option = options[this.state.focusedOptionIndex];
      const originalIndex = originalOptions
        .findIndex(originalOption => originalOption.value === option.value);
      this.handleOptionChange(option, originalIndex);
    } else {
      event.preventDefault();
      this.toggleSelect();
    }
  }

  handleTab = (event, options, originalOptions) => {
    if (this.state.isOpen) {
      event.preventDefault();
      this.handleEnter(event, options, originalOptions);
    }
  }

  handleArrowUp = (event, options) => {
    if (this.state.isOpen) {
      event.preventDefault();
      this.setState(prevState => ({
        focusedOptionIndex: prevState.focusedOptionIndex > 0
          ? prevState.focusedOptionIndex - 1
          : options.length - 1,
      }));
    } else {
      this.toggleSelect();
    }
  }

  handleArrowDown = (event, options) => {
    if (this.state.isOpen) {
      event.preventDefault();
      this.setState(prevState => ({
        focusedOptionIndex: (prevState.focusedOptionIndex + 1) % options.length,
      }));
    } else {
      this.toggleSelect();
    }
  }

  // TODO: Simplify the function. Divide into small parts
  handleEscape = () => {
    if (this.state.isOpen) {
      if (this.state.selectedOption) {
        if (this.state.inputFilter) {
          this.setState(prevState => ({
            inputValue: prevState.selectedOption.label,
            inputFilter: '',
            focusedOptionIndex: prevState.selectedOptionIndex,
          }));
        } else {
          this.setState(prevState => ({
            inputValue: prevState.selectedOption.label,
            isOpen: false,
          }));
        }
      } else if (this.state.inputFilter) {
        this.setState({
          inputValue: '',
          inputFilter: '',
        });
      } else if (this.state.selectedOption) {
        this.setState(prevState => ({
          inputValue: prevState.selectedOption.label,
          isOpen: false,
        }));
      } else {
        this.toggleSelect();
      }
    }
  }

  handleMenuRef = (ref) => {
    if (ref) {
      this.menuRef = ref;
    }
  }

  handleOptionsMouseEnter = (index) => {
    this.setState({ focusedOptionIndex: index });
  }

  handleClear = () => {
    this.setState(this.initialState());
    // Fire event to notify parent component that dropdown was cleared
    this.props.onChange(null);
  }

  handleClickOutside = () => {
    // TODO: Implement logic if user has clicked outside of the component
    this.toggleSelect();
  }

  toggleSelect = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  adjustOptionVisibility = () => {
    const focusedOptionNode = this.focusedOptionRef;
    const menuNode = this.menuRef;

    const focusedRect = focusedOptionNode.getBoundingClientRect();
    const menuRect = menuNode.getBoundingClientRect();

    if (focusedRect.bottom > menuRect.bottom) {
      menuNode.scrollTop = (
        focusedOptionNode.offsetTop
        + focusedOptionNode.clientHeight
        - menuNode.offsetHeight
      );
    } else if (focusedRect.top < menuRect.top) {
      menuNode.scrollTop = focusedOptionNode.offsetTop;
    }
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
      inputFilter: value,
      isOpen: true,
      focusedOptionIndex: 0,
    });
  }

  initialState = () => ({
    inputValue: '',
    inputFilter: '',
    isOpen: false,
    selectedOption: null,
    selectedOptionIndex: null,
    focusedOptionIndex: 0,
  });

  renderClearIcon = () => (
    <i
      tabIndex="0"
      role="button"
      onClick={this.handleClear}
      onKeyDown={() => this.handleClear()}
      className="material-icons select__clear-icon"
    >
      clear
    </i>
  );

  renderDropdownIcon = () => (
    <i
      tabIndex="0"
      role="button"
      onClick={this.handleSelectorClick}
      onKeyDown={this.handleDropdownIconKeyDown}
      className={classNames({
        'material-icons': true,
        'select__dropdown-icon': true,
        'select__dropdown-icon--disabled': this.props.disabled,
      })}
    >
      {this.state.isOpen
        ? 'arrow_drop_up'
        : 'arrow_drop_down'}
    </i>
  );

  render() {
    return (
      <WithFilter
        list={this.props.options}
        filter={this.handleFilter}
        render={options => (
          <div className="select">
            <div
              className="select__selector"
            >
              <input
                id={this.props.id}
                name={this.props.name}
                ref={this.inputRef}
                disabled={this.props.loading || this.props.disabled}
                placeholder={this.getPlaceholder()}
                className="select__input"
                onClick={this.handleSelectorClick}
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                onKeyDown={(event) => {
                  this.handleInputKeyDown(event, options, this.props.options);
                }}
              />
              {this.state.isOpen && this.renderClearIcon()}
              {this.renderDropdownIcon()}
            </div>

            {this.state.isOpen
              && (
                <DetectOutsideClick
                  onClick={this.handleClickOutside}
                  render={ref => (
                    <Options
                      ref={ref}
                      value={this.getCurrentSelectedValue()}
                      render={Option}
                      options={options}
                      focusedOption={options[this.state.focusedOptionIndex]}
                      optionRef={this.handleOptionRef}
                      menuRef={this.handleMenuRef}
                      onChange={this.handleOptionChange}
                      onMouseEnter={this.handleOptionsMouseEnter}
                    />
                  )}
                />
              )
            }
          </div>
        )}
      />
    );
  }
}

Select.defaultProps = {
  placeholder: 'Select',
  loading: false,
  options: [],
  disabled: false,
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }).isRequired,
  ),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Select;
