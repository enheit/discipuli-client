// Services
import Authorization from '../../services/authorization.service';

// Configs
import routes from '../../routes/routes.config';

export default async (formValues, formikBag) => {
  try {
    await formikBag.props.registerForCourse(
      formikBag.props.match.params.courseId,
      Authorization.getProfile().accountId,
    );

    // Redirect to the list of courses
    formikBag.props.history.push(routes.courses());
  } catch (error) {
    console.error(error);
  }
};
