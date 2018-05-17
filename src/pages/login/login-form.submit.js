import routes from '../../routes/routes.config';
import { Base64 } from 'js-base64';

export default async ({ email, password }, { props, setErrors }) => {
  const { data } = await props.authorize(email, Base64.encode(password));

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