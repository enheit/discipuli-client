export default async (formValues, { props, setErrors, resetForm }) => {
  try {
    const { data } = await props.createLecture(
      props.match.params.courseId,
      formValues.presentation,
      formValues.lecturer,
      formValues.lectureName,
      formValues.task,
      formValues.homework,
      new Date(formValues.startDate),
      new Date(formValues.endDate),
    );

    resetForm();
  } catch (error) {
    console.error(error);
  }
};
