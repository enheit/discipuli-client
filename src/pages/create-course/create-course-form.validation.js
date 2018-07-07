import errorMessages from '../../localization/errors.messages';
import fields from '../../constants/field.constants';
import isCourseNameExist from './graphql/queries/is-course-name-exist.graphql';

export default async (values, props) => {
  const errors = {};

  if (!values.courseName) {
    errors.courseName = errorMessages.required('course name');
  } else if (values.courseName.length > fields.COURSE_NAME_MAX_LENGTH) {
    errors.courseName = errorMessages.tooLong('course name');
  } else if (values.courseName.length < fields.COURSE_NAME_MIN_LENGTH) {
    errors.courseName = errorMessages.tooShort('course name');
  } else {
    const { data } = await props.client.query({
      query: isCourseNameExist,
      variables: {
        courseName: values.courseName,
      },
    });

    if (data.isCourseNameExist) {
      errors.courseName = errorMessages.alreadyExist('course name');
    }
  }

  if (!values.specialization) {
    errors.specialization = errorMessages.required('specialization');
  }

  if (!values.country) {
    errors.country = errorMessages.required('country');
  }

  if (!values.city) {
    errors.city = errorMessages.required('city');
  }

  if (!values.startDate) {
    errors.startDate = errorMessages.required('start date');
  } else if (Date.parse(values.startDate) > Date.parse(values.endDate)) {
    errors.startDate = errorMessages.greaterThan('start date', 'end date');
  }

  if (!values.endDate) {
    errors.endDate = errorMessages.required('end date');
  } else if (Date.parse(values.endDate) < Date.parse(values.startDate)) {
    errors.endDate = errorMessages.lessThan('end date', 'start date');
  }

  // Check if errors exist
  if (Object.keys(errors).length > 0) {
    throw errors;
  }
};
