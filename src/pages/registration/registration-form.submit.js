import { Base64 } from 'js-base64';

export default async (formValues, formikBag) => {
  try {
    await formikBag.props.register(
      formValues.email,
      formValues.firstName,
      formValues.lastName,
      Base64.encode(formValues.password),
      Base64.encode(formValues.repeatPassword),
    );

    formikBag.resetForm();
  } catch (error) {
    console.error(error);
  }
};
