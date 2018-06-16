import { Base64 } from 'js-base64';

export default async (formValues, { props, resetForm }) => {
  try {
    const { data } = await props.register(
      formValues.email,
      formValues.firstName,
      formValues.lastName,
      Base64.encode(formValues.password),
      Base64.encode(formValues.repeatPassword),
    );

    resetForm();
  } catch (error) {
    console.error(error);
  }
};