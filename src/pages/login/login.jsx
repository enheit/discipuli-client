import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';

// Mutations
import Authorize from './graphql/mutations/authorization.graphql';

// Form utils
import loginFormValidation from './login-form.validation';
import loginFormSubmit from './login-form.submit';
import loginFormInitValues from './login-form.initial-values';

// Components
import {
  Input,
  Button,
  Headline,
  Label,
  Message
} from '../../common';

class Login extends Component {
  render() {
    return (
      <div
        className="login-container"
      >
        <form
          onSubmit={this.props.handleSubmit}
          className="login-form"
        >
          <Label
            for="email"
            title="E-mail"
          />
          <Input
            id="email"
            name="email"
            placeholder="email"
            component={Input}
            type="text"
            value={this.props.values.email}
            onChange={this.props.handleChange}
          />
          {this.props.touched.email && this.props.errors.email &&
            <Message
              message={this.props.errors.email}
              error
            />}
          <Label
            for="password"
            title="Password"
          />
          <Input
            id="password"
            name="password"
            placeholder="password"
            component={Input}
            type="password"
            value={this.props.values.password}
            onChange={this.props.handleChange}
          />
          {this.props.touched.password && this.props.errors.password &&
            <Message
              message={this.props.errors.password}
              error
            />}
          <Button
            type="submit"
            positive
          >
            let me in
          </Button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(Authorize, {
    props: ({ mutate }) => ({
      authorize: (email, password) => mutate({
        variables: {
          email,
          password,
        },
      }),
    }),
    options: {
      errorPolicy: 'all'
    }
  }),
  withFormik({
    displayName: 'LoginForm',
    mapPropsToValues: loginFormInitValues,
    validate: loginFormValidation,
    handleSubmit: loginFormSubmit,
  }),
)(Login);
