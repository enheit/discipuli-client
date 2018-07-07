export default async (formValues, formikBag) => {
  try {
    await formikBag.props.createCourse(
      formValues.courseName,
      formValues.specialization,
      formValues.country,
      formValues.city,
      formValues.startDate,
      formValues.endDate,
    );

    formikBag.resetForm();
  } catch (error) {
    console.error(error);
  }
};
