import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, withApollo } from 'react-apollo';
import { withFormik } from 'formik';

// Components
import {
  Button, Input, Label, Message,
} from '../../common';

// Mutations
import Register from './graphql/mutations/registration.graphql';

// Form utils
import registrationFormSubmit from './registration-form.submit';
import registrationFormValidation from './registration-form.validation';
import registrationFormInitValues from './registration.initial-values';

const Registration = props => (
  <div className="registration-container">
    <form className="registration-form" onSubmit={props.handleSubmit}>
      <Label
        for="email"
        title="E-mail"
      />
      <Input
        id="email"
        name="email"
        placeholder="E-mail"
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
        for="firstName"
        title="First name"
      />
      <Input
        id="firstName"
        name="firstName"
        placeholder="First name"
        type="text"
        value={props.values.firstName}
        onChange={props.handleChange}
      />
      {props.touched.firstName && props.errors.firstName
        && (
          <Message
            message={props.errors.firstName}
            error
          />
        )
      }
      <Label
        for="lastName"
        title="Last name"
      />
      <Input
        id="lastName"
        name="lastName"
        placeholder="Last name"
        type="text"
        value={props.values.lastName}
        onChange={props.handleChange}
      />
      {props.touched.lastName && props.errors.lastName
        && (
          <Message
            message={props.errors.lastName}
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
        placeholder="Password"
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
      <Label
        for="repeatPassword"
        title="Repeat password"
      />
      <Input
        id="repeatPassword"
        name="repeatPassword"
        placeholder="Repeat password"
        type="password"
        value={props.values.repeatPassword}
        onChange={props.handleChange}
      />
      {props.touched.repeatPassword && props.errors.repeatPassword
        && (
          <Message
            message={props.errors.repeatPassword}
            error
          />
        )
      }
      <Button
        type="submit"
        positive
      >
        register me
      </Button>
    </form>
  </div>
);

Registration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    repeatPassword: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    password: PropTypes.bool,
    repeatPassword: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    repeatPassword: PropTypes.string,
  }).isRequired,
};

export default compose(
  graphql(Register, {
    props: props => ({
      register: (
        email,
        firstName,
        lastName,
        password,
        repeatPassword,
      ) => props.mutate({
        variables: {
          email,
          firstName,
          lastName,
          password,
          repeatPassword,
        },
      }),
    }),
    options: {
      // Using the all policy is the best way to notify your users of potential
      // issues while still showing as much data as possible from your server.
      // It saves both data and errors into the Apollo Cache so your UI can
      // use them.
      errorPolicy: 'all',
    },
  }),
  withApollo,
  withFormik({
    displayName: 'RegistrationForm',
    mapPropsToValues: registrationFormInitValues,
    validate: registrationFormValidation,
    handleSubmit: registrationFormSubmit,
  }),
)(Registration);
