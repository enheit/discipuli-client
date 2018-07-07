export default async (formValues, formikBag) => {
  try {
    await formikBag.props.createLecture(
      formikBag.props.match.params.courseId,
      formValues.presentation,
      formValues.lecturer,
      formValues.lectureName,
      formValues.task,
      formValues.homework,
      new Date(formValues.startDate),
      new Date(formValues.endDate),
    );

    formikBag.resetForm();
  } catch (error) {
    console.error(error);
  }
};
