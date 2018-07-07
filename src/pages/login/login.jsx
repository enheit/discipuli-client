import React from 'react';
import PropTypes from 'prop-types';
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
  Label,
  Message,
} from '../../common';

const Login = props => (
  <div
    className="login-container"
  >
    <form
      onSubmit={props.handleSubmit}
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
        value={props.values.email}
        onChange={props.handleChange}
      />
      {props.touched.email && props.errors.email
        && (
          <Message
            message={props.errors.email}
            error
          />
        )
      }
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
        value={props.values.password}
        onChange={props.handleChange}
      />
      {props.touched.password && props.errors.password
        && (
          <Message
            message={props.errors.password}
            error
          />
        )
      }
      <Button
        type="submit"
        positive
      >
        let me in
      </Button>
    </form>
  </div>
);

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default compose(
  graphql(Authorize, {
    props: props => ({
      authorize: (email, password) => props.mutate({
        variables: {
          email,
          password,
        },
      }),
    }),
    options: {
      errorPolicy: 'all',
    },
  }),
  withFormik({
    displayName: 'LoginForm',
    mapPropsToValues: loginFormInitValues,
    validate: loginFormValidation,
    handleSubmit: loginFormSubmit,
  }),
)(Login);
