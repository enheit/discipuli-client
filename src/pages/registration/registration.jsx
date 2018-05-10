import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Registration page</h1>
        <Link to="/login">Login</Link>
      </React.Fragment>
    )
  }
}

export default Registration;