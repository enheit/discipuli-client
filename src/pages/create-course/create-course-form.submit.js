export default async (formValues, { props, setErrors, resetForm }) => {
  try {
    const { data } = await props.createCourse(
      formValues.courseName,
      formValues.specialization,
      formValues.country,
      formValues.city,
      formValues.startDate,
      formValues.endDate,
    );

    resetForm();
  } catch (error) {
    console.error(error);
  }
};