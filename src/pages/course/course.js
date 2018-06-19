import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// GraphQL Queries
import COURSE_BY_ID from './graphql/queries/course-by-id.graphql';
import LECTURES_BY_COURSE_ID from './graphql/queries/lectures-by-course-id.graphql';

// Components
import { Text, ButtonLink, Headline } from '../../common';
import Can from '../../common/can/can-bound';
import { LectureThumbnail } from './lecture-thumbnail';

// Constants
import routes from '../../routes/routes.config';

class Course extends Component {

  getCourseName = () => {
    return this.props.isCourseLoading
      ? 'Course'
      : this.props.course.name;
  }

  render() {
    return (
      <div className="course-container">
        <div className="course__title">
          <Headline
            large
            title={this.getCourseName()}
          />
        </div>

        <Can
          I="create"
          a="lecture"
          render={() => (
            <div className="course__actions">
              <ButtonLink
                positive
                to={routes.createCourseLecture(
                  this.props.match.params.specializationId,
                  this.props.match.params.courseId
                )}
              >
                Create a lecture
              </ButtonLink>
            </div>
          )}
        />

        <div className="course__info">
          <Text>
            Found lectures: {this.props.lectures.length}
          </Text>
        </div>

        <div className="course__lectures">
          {this.props.lectures.map(lecture => {
            return (
              <LectureThumbnail
                key={lecture.id}
                lectureId={lecture.id}
                courseId={this.props.match.params.courseId}
                specializationId={this.props.match.params.specializationId}
                name={lecture.name}
                startDate={lecture.startDate}
                endDate={lecture.endDate}
                lecturer={lecture.lecturer}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

Course.defaultProps = {
  lectures: [],
};

export default compose(
  withRouter,
  graphql(COURSE_BY_ID, {
    options: (props) => ({
      variables: {
        courseId: props.match.params.courseId,
      },
    }),
    props: ({ data: { course, loading } }, ownProps) => ({
      course,
      isCourseLoading: loading,
    }),
  }),
  graphql(LECTURES_BY_COURSE_ID, {
    options: (props) => ({
      variables: {
        courseId: props.match.params.courseId,
      },
    }),
    props: ({ data: { lectures, loading } }, ownProps) => ({
      lectures,
      isLecturesLoading: loading,
    }),
  }),
)(Course);
