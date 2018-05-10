import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Login page</h1>
        <Link to="/registration">Registration</Link>
      </React.Fragment>
    )
  }
}

export default Login;
