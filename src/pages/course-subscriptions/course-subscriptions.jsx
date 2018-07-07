import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

// GraphQL Queries
import COURSE_SUBSCRIPTIONS from './graphql/queries/course-subscriptions.graphql';

// Components
import { Headline } from '../../common';
import SubscriptionThumbnail from './subscription-thumbnail';

// Services
import Authorization from '../../services/authorization.service';

const CourseSubscriptions = props => (
  <div className="course-subscriptions">
    <div className="course-subscriptions__title">
      <Headline
        large
        title="Subscriptions"
      />
    </div>
    <div className="course-subscriptions__courses">
      {props.courses.map(course => (
        <SubscriptionThumbnail
          key={course.id}
          id={course.id}
          name={course.name}
          specializationId={course.specializationId}
        />
      ))}
    </div>
  </div>
);

CourseSubscriptions.defaultProps = {
  courses: [],
};

CourseSubscriptions.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(SubscriptionThumbnail.propTypes)),
};

export default compose(
  graphql(COURSE_SUBSCRIPTIONS, {
    options: () => ({
      variables: {
        personAccountId: Authorization.getProfile().accountId,
      },
    }),
    props: props => ({
      courses: props.data.courses,
      isCoursesLoading: props.data.loading,
    }),
  }),
)(CourseSubscriptions);
