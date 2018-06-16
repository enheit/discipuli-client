import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import { withFormik } from 'formik';

// Components
import { Button, Input, Label, Message } from '../../common';

// Mutations
import Register from './graphql/mutations/registration.graphql'

// Form utils
import registrationFormSubmit from './registration-form.submit';
import registrationFormValidation from './registration-form.validation';
import registrationFormInitValues from './registration.initial-values';

class Registration extends Component {
  render() {
    return (
      <div className="registration-container">
        <form className="registration-form" onSubmit={this.props.handleSubmit}>
          <Label
            for="email"
            title="E-mail"
          />
          <Input
            id="email"
            name="email"
            placeholder="E-mail"
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
            for="firstName"
            title="First name"
          />
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            type="text"
            value={this.props.values.firstName}
            onChange={this.props.handleChange}
          />
          {this.props.touched.firstName && this.props.errors.firstName &&
            <Message
              message={this.props.errors.firstName}
              error
            />}
          <Label
            for="lastName"
            title="Last name"
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last name"
            type="text"
            value={this.props.values.lastName}
            onChange={this.props.handleChange}
          />
          {this.props.touched.lastName && this.props.errors.lastName &&
            <Message
              message={this.props.errors.lastName}
              error
            />}
          <Label
            for="password"
            title="Password"
          />
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={this.props.values.password}
            onChange={this.props.handleChange}
          />
          {this.props.touched.password && this.props.errors.password &&
            <Message
              message={this.props.errors.password}
              error
            />}
          <Label
            for="repeatPassword"
            title="Repeat password"
          />
          <Input
            id="repeatPassword"
            name="repeatPassword"
            placeholder="Repeat password"
            type="password"
            value={this.props.values.repeatPassword}
            onChange={this.props.handleChange}
          />
          {this.props.touched.repeatPassword && this.props.errors.repeatPassword &&
            <Message
              message={this.props.errors.repeatPassword}
              error
            />}
          <Button
            type="submit"
            positive
          >
            register me
          </Button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(Register, {
    props: ({ mutate }) => ({
      register: (
        email,
        firstName,
        lastName,
        password,
        repeatPassword
      ) => mutate({
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
      errorPolicy: 'all'
    }
  }),
  withApollo,
  withFormik({
    displayName: 'RegistrationForm',
    mapPropsToValues: registrationFormInitValues,
    validate: registrationFormValidation,
    handleSubmit: registrationFormSubmit,
  }),
)(Registration);