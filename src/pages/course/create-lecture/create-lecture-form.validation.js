import errorMessages from '../../../localization/errors.messages';
import fields from '../../../constants/field.constants';
import IS_LECTURE_NAME_EXISTS_WITHIN_COURSE from './graphql/queries/is-lecture-name-exists-within-course.graphql';

export default async (values, props) => {
  const errors = {};

  if (!values.lectureName) {
    errors.lectureName = errorMessages.required('lecture name');
  } else if (values.lectureName.length > fields.LECTURE_NAME_MAX_LENGTH) {
    errors.lectureName = errorMessages.tooLong('lecture name');
  } else if (values.lectureName.length < fields.LECTURE_NAME_MIN_LENGTH) {
    errors.lectureName = errorMessages.tooShort('lecture name');
  } else {
    const { data } = await props.client.query({
      query: IS_LECTURE_NAME_EXISTS_WITHIN_COURSE,
      variables: {
        name: values.lectureName,
        courseId: props.match.params.courseId,
      },
    });

    if (data.isLectureNameExistsWithinCourse) {
      errors.lectureName = errorMessages.alreadyExist('lecture name');
    }
  }

  if (!values.presentation) {
    errors.presentation = errorMessages.required('presentation');
  }

  if (!values.task) {
    errors.task = errorMessages.required('task');
  }

  if (!values.homework) {
    errors.homework = errorMessages.required('homework');
  }

  if (!values.lecturer) {
    errors.lecturer = errorMessages.required('lecturer');
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
