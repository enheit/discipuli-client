import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

// GraphQL Queries
import COURSE_SUBSCRIPTIONS from './graphql/queries/course-subscriptions.graphql';

// Components
import { Headline } from '../../common';
import { SubscriptionThumbnail } from './subscription-thumbnail';

// Services
import Authorization from '../../services/authorization.service';

class CourseSubscriptions extends Component {
  render() {
    return (
      <div className="course-subscriptions">
        <div className="course-subscriptions__title">
          <Headline
            large
            title="Subscriptions"
          />
        </div>
        <div className="course-subscriptions__courses">
          {this.props.courses.map(course => {
            return (
              <SubscriptionThumbnail
                key={course.id}
                name={course.name}
                specializationId={course.specializationId}
                courseId={course.id}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

CourseSubscriptions.defaultProps = {
  courses: [],
}

export default compose(
  graphql(COURSE_SUBSCRIPTIONS, {
    options: (props) => ({
      variables: {
        personAccountId: Authorization.getProfile().accountId,
      },
    }),
    props: ({ data: { courses, loading } }, ownProps) => ({
      courses,
      isCoursesLoading: loading,
    }),
  }),
)(CourseSubscriptions);
