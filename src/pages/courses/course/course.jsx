import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import { Button, Headline, Text } from '../../../common';

// Constants
import routes from '../../../routes/routes.config';

const Course = (props) => {
    return (
      <div className="course">
        <div className="course__header">
          <Headline
            className="course__headline"
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
        <div className="course__body">
          <Text className="course__location">
            {props.country}, {props.city}
          </Text>
          <Text className="course__duration">
            {props.startDate}
            {" – "}
            {props.endDate}
          </Text>
        </div>
        <div className="course__footer">
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
    )
}

Course.defaultProps = {
  isAuthorized: false,
};

Course.propTypes = {
  name: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  // Depends on user authorization execute different actions
  isAuthorized: PropTypes.bool.isRequired,
};

export default Course;