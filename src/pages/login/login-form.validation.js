import errorMessages from '../../localization/errors.messages';
import fields from '../../constants/field.constants';

export default (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = errorMessages.required('email address');
  }

  if (values.email) {
    if (values.email.length > fields.EMAIL_MAX_LENGTH) {
      errors.email = errorMessages.tooLong('email address');
    }
  }

  if (!values.password) {
    errors.password = errorMessages.required('password');
  }

  return errors;
};
