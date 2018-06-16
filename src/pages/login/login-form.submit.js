import routes from '../../routes/routes.config';
import { Base64 } from 'js-base64';

// Services
import Authorization from '../../services/authorization.service';

// Configs
import ability from '../../configs/ability.config';

export default async ({ email, password }, { props, setErrors }) => {
  const { data } = await props.authorize(email, Base64.encode(password));

  if(data.Authorization) {
    const { jwtToken } = data.Authorization;
    Authorization.setToken(jwtToken);

    // Ger user permissions/rules
    const rules = Authorization.getProfile().rules;
    // Update the user permissions in the app
    ability.update(rules);

    // Redirect the user to the default page after login
    props.history.push(routes.courses());
  } else {
    setErrors({
      email: 'The email address is invalid',
      password: 'The password is invalid'
    });
  }
};
