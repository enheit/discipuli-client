import { Base64 } from 'js-base64';
import routes from '../../routes/routes.config';

// Services
import Authorization from '../../services/authorization.service';

// Configs
import ability from '../../configs/ability.config';

export default async (formValues, formikBag) => {
  const { data } = await formikBag.props.authorize(
    formValues.email,
    Base64.encode(formValues.password),
  );

  if (data.Authorization) {
    const { jwtToken } = data.Authorization;
    Authorization.setToken(jwtToken);

    // Ger user permissions/rules
    const { rules } = Authorization.getProfile();
    // Update the user permissions in the app
    ability.update(rules);

    // Redirect the user to the default page after login
    formikBag.props.history.push(routes.courses());
  } else {
    formikBag.setErrors({
      email: 'The email address is invalid',
      password: 'The password is invalid',
    });
  }
};
