// Services
import Authorization from '../../services/authorization.service';

// Configs
import routes from '../../routes/routes.config';

export default async (formValues, { props }) => {
  try {
    const subscription = await props.registerForCourse(
      props.match.params.courseId,
      Authorization.getProfile().accountId,
    );

    // Redirect to the list of courses
    props.history.push(routes.courses());
  } catch (error) {
    console.error(error);
  }
};
