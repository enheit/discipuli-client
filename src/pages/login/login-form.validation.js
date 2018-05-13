export default (values) => {
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
};