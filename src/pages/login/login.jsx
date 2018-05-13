import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';

// Configs
import routes from '../../routes/routes.config';

// Mutations
import Authorize from './graphql/mutations/authorization.graphql';

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
      <div className="login-container">
        <form onSubmit={this.props.handleSubmit} className="login-form">
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
    mapPropsToValues: () => ({
      email: '',
      password: ''
    }),
    validate: (values) => {
      let errors = {};

      if(!values.email) {
        errors.email = 'The email is reqruied';
      }

      if(values.email) {
        if(values.email.length > 254) {
          errors.email = 'The email length is 254 symbols'
        }
      }

      if(!values.password) {
        errors.password = 'The password is required';
      }

      return errors;
    },
    handleSubmit: async ({ email, password }, { props, setErrors }) => {
      const { data } = await props.authorize(email, password);

      if(data.Authorization) {
        const { jwtToken } = data.Authorization;
        localStorage.setItem('token', jwtToken);
        props.history.push(routes.root());
      } else {
        setErrors({
          email: 'The email address is invalid',
          password: 'The password is invalid'
        });
      }
    },
  })
)(Login);
