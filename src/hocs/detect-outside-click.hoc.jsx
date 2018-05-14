import React, { Component } from 'react';

const detectOutsideEvent = (Component) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.componentRef = React.createRef();
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
      const { componentRef } = this.componentRef.current;
      if (componentRef && !componentRef.current.contains(event.target)) {
        this.props.handleOutsideEvent();
      }
    }

    render() {
      return (
        <Component
          ref={this.componentRef}
          {...this.props}
        />
      )
    }
  }
}

export default detectOutsideEvent;
