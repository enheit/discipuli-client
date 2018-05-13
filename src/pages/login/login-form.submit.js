import routes from '../../routes/routes.config';

export default async ({ email, password }, { props, setErrors }) => {
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
};