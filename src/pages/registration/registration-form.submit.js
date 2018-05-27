import routes from '../../routes/routes.config';
import { Base64 } from 'js-base64';

export default async (formValues, { props, setErrors }) => {
  try {
    const { data } = await props.register(
      formValues.email,
      formValues.firstName,
      formValues.lastName,
      Base64.encode(formValues.password),
      Base64.encode(formValues.repeatPassword),
    );
  } catch (error) {
    console.error(error);
  }
};