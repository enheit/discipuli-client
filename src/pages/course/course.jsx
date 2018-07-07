import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// GraphQL Queries
import COURSE_BY_ID from '../common/graphql/queries/course-by-id.graphql';
import LECTURES_BY_COURSE_ID from './graphql/queries/lectures-by-course-id.graphql';

// Components
import { Text, ButtonLink, Headline } from '../../common';
import Can from '../../common/can/can-bound';
import LectureThumbnail from './lecture-thumbnail';

// Constants
import routes from '../../routes/routes.config';

class Course extends Component {
  getCourseName = () => (
    this.props.isCourseLoading
      ? 'Course'
      : this.props.course.name
  )

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
                  this.props.match.params.courseId,
                )}
              >
                Create a lecture
              </ButtonLink>
            </div>
          )}
        />

        <div className="course__info">
          <Text>
            Found lectures:
            {' '}
            {this.props.lectures.length}
          </Text>
        </div>

        <div className="course__lectures">
          {this.props.lectures.map(lecture => (
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
          ))}
        </div>
      </div>
    );
  }
}

Course.defaultProps = {
  lectures: [],
  course: {},
};

Course.propTypes = {
  isCourseLoading: PropTypes.bool.isRequired,
  course: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    __typename: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      specializationId: PropTypes.string.isRequired,
      courseId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lecturer: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
};

export default compose(
  withRouter,
  graphql(COURSE_BY_ID, {
    options: props => ({
      variables: {
        courseId: props.match.params.courseId,
      },
    }),
    props: props => ({
      course: props.data.course,
      isCourseLoading: props.data.loading,
    }),
  }),
  graphql(LECTURES_BY_COURSE_ID, {
    options: props => ({
      variables: {
        courseId: props.match.params.courseId,
      },
    }),
    props: props => ({
      lectures: props.data.lectures,
      isLecturesLoading: props.data.loading,
    }),
  }),
)(Course);
