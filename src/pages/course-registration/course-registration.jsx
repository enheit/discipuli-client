import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withApollo, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// GraphQL Queries
import REGISTER_FOR_COURSE from './graphql/mutations/register-for-course.graphql';
import COURSE_BY_ID from '../common/graphql/queries/course-by-id.graphql';

// Form utils
import courseRegistrationFormSubmit from './course-registration.submit';

// Components
import { Headline, Button, Text } from '../../common';

// Constants
import dateFormat from '../../constants/date-format.constants';

class CourseRegistration extends Component {
  getCourseName = () => (
    this.props.isCourseLoading
      ? 'Loading'
      : `Registration for ${this.props.course.name}`
  )

  getMonthDiff = (leftBoundary, rightBoundary) => {
    let months = 0;

    months = (rightBoundary.getFullYear() - leftBoundary.getFullYear()) * 12;
    months -= leftBoundary.getMonth() + 1;
    months += rightBoundary.getMonth();

    return months <= 0
      ? 0
      : months;
  }

  getCourseDuration = () => {
    if (this.props.isCourseLoading) {
      return 'Loading';
    }

    const startDate = new Date(this.props.course.startDate);
    const endDate = new Date(this.props.course.endDate);
    const durationInMonth = this.getMonthDiff(startDate, endDate);

    return durationInMonth;
  }

  getFormatedDate = date => (this.props.isCourseLoading
    ? 'Loading'
    : moment(this.props.course[date]).format(dateFormat.STANDARD))

  render() {
    return (
      <div
        className="course-registration"
      >
        <div
          className="course-registration__title"
        >
          <Headline
            large
            title={this.getCourseName()}
          />
        </div>

        <div
          className="course-registration__details"
        >
          <Headline
            title="General information"
          />
          <div className="course-registration__details-item">
            <Text>
              Location:
              {' '}
              {!this.props.isCourseLoading && this.props.course.country}
              ,
              {' '}
              {!this.props.isCourseLoading && this.props.course.city}
            </Text>
          </div>
          <div className="course-registration__details-item">
            <Text>
              Start date:
              {' '}
              {this.getFormatedDate('startDate')}
            </Text>
          </div>
          <div className="course-registration__details-item">
            <Text>
              End date:
              {' '}
              {this.getFormatedDate('endDate')}
            </Text>
          </div>
          <div className="course-registration__details-item">
            <Text>
              Duration:
              {' '}
              {this.getCourseDuration()}
              {' '}
              month(s)
            </Text>
          </div>

        </div>

        <form
          className="course-registration__actions"
          onSubmit={this.props.handleSubmit}
        >
          <Button
            positive
            type="submit"
          >
            Register me
          </Button>
        </form>
      </div>
    );
  }
}

CourseRegistration.defaultProps = {
  course: {},
};

CourseRegistration.propTypes = {
  isCourseLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  course: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    __typename: PropTypes.string,
  }),
};

export default compose(
  withRouter,
  withApollo,
  graphql(REGISTER_FOR_COURSE, {
    props: props => ({
      registerForCourse: (
        courseId,
        personAccountId,
      ) => props.mutate({
        variables: {
          courseId,
          personAccountId,
        },
      }),
    }),
    options: {
      // Using the all policy is the best way to notify your users of potential
      // issues while still showing as much data as possible from your server.
      // It saves both data and errors into the Apollo Cache so your UI can
      // use them.
      errorPolicy: 'all',
    },
  }),
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
  withFormik({
    displayName: 'CourseRegistrationForm',
    handleSubmit: courseRegistrationFormSubmit,
  }),
)(CourseRegistration);
