import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import { Headline, Text } from '../../../common';

// Constants
import routes from '../../../routes/routes.config';

const CourseThumbnail = props => (
  <div className="course-thumbnail">
    <div className="course-thumbnail__header">
      <Headline
        className="course-thumbnail__headline"
        render={() => (
          <Link
            className="link"
            to={routes.courseDetails(props.courseId)}
          >
            {props.name}
          </Link>
        )}
      />
    </div>
    <div className="course-thumbnail__body">
      <Text className="course-thumbnail__location">
        {props.country}
        ,
        {props.city}
      </Text>
      <Text className="course-thumbnail__duration">
        {props.startDate}
        {' – '}
        {props.endDate}
      </Text>
    </div>
    <div className="course-thumbnail__footer">
      <Link
        className="link"
        to={props.isAuthorized
          ? routes.courseRegistration(props.courseId)
          : routes.login()}
      >
          Register
      </Link>
    </div>
  </div>
);

CourseThumbnail.defaultProps = {
  isAuthorized: false,
};

CourseThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  // Depends on user authorization execute different actions
  isAuthorized: PropTypes.bool,
};

export default CourseThumbnail;
