import errorMessages from '../../localization/errors.messages';

export default (values, asd, kk) => {
  let errors = {};

  if(!values.email) {
    errors.email = errorMessages.required('email address');
  }

  if(values.email) {
    if(values.email.length > 254) {
      errors.email = errorMessages.tooLong('email address');
    }
  }

  if(!values.password) {
    errors.password = errorMessages.required('password');
  }

  return errors;
};