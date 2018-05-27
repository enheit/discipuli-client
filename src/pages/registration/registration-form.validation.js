import errorMessages from '../../localization/errors.messages';
import fields from '../../constants/field.constants';
import IsEmailExist from './graphql/queries/is-email-exist.graphql'

export default async (values, props) => {
  let errors = {};

  if(!values.email) {
    errors.email = errorMessages.required('e-mail address');
  } else {
      const { data } = await props.client.query({
        query: IsEmailExist,
        variables: {
          email: values.email,
        },
      });

      if(data.IsEmailExist) {
        errors.email = errorMessages.alreadyExist('e-mail address');
      }
  }

  if(!values.firstName) {
    errors.firstName = errorMessages.required('first name');
  } else if (values.firstName.length < fields.FIRST_NAME_MIN_LENGTH) {
    errors.firstName = errorMessages.tooShort('first name');
  } else if (values.firstName.length > fields.FIRST_NAME_MAX_LENGTH) {
    errors.firstName = errorMessages.tooLong('first name');
  }

  if(!values.lastName) {
    errors.lastName = errorMessages.required('last name');
  } else if (values.lastName.length < fields.LAST_NAME_MIN_LENGTH) {
    errors.lastName = errorMessages.tooShort('last name');
  } else if (values.lastName.length > fields.LAST_NAME_MAX_LENGTH) {
    errors.lastName = errorMessages.tooLong('last name');
  }

  if(!values.password) {
    errors.password = errorMessages.required('password');
  } else if (values.password.length < fields.PASSWORD_MIN_LENGTH) {
    errors.password = errorMessages.tooShort('password');
  } else if (values.password.length > fields.PASSWORD_MAX_LENGTH) {
    errors.password = errorMessages.tooLong('password');
  }

  if(!values.repeatPassword) {
    errors.repeatPassword = errorMessages.required('repeat password');
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = errorMessages.doNotMatch('Passwords');
  }

  // Check if errors exist
  if(Object.keys(errors).length > 0) {
    throw errors;
  }
};