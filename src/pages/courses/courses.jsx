import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose, graphql, withApollo } from 'react-apollo';

// GraphQL Queries
import COURSES from './graphql/courses.graphql';
import NOT_SUBSCRIBED_COURSES from './graphql/not-subscribed-courses.graphql';
import SPECIALIZATIONS from '../common/graphql/specializations.graphql';

// Services
import Authorization from '../../services/authorization.service';

// Utils
import reduceOptions from '../../utils/options-reducer';

// Constants
import DateFormat from '../../constants/date-format.constants';

// Components
import CourseThumbnail from './course-thumbnail';
import {
  Text, Select, Headline, ButtonLink,
} from '../../common';
import Can from '../../common/can/can-bound';
import routesConfig from '../../routes/routes.config';

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: Authorization.checkToken(),
      specialization: null,
    };
  }

  formatDate = date => moment(date).format(DateFormat.STANDARD)

  handleSpecializationFilterChange = (option) => {
    this.setState({ specialization: option });
  }

  filterCoursesBySpecialization = (course) => {
    // Return true in case filter by courses was not applied
    if (!this.state.specialization) {
      return true;
    }

    return course.specializationId === this.state.specialization.value;
  }

  render() {
    const filteredCourses = this.props.courses
      .filter(this.filterCoursesBySpecialization);

    return (
      <div className="courses">
        <div className="courses__title">
          <Headline
            large
            title="Courses"
          />
        </div>
        <Can
          I="create"
          a="course"
          render={() => (
            <div className="courses__actions">
              <ButtonLink
                positive
                to={routesConfig.createCourse()}
              >
                Create a course
              </ButtonLink>
            </div>
          )}
        />
        <div className="courses__filter">
          <div className="specialization">
            <Select
              id="specialization"
              name="specialization"
              value={this.state.specialization && this.state.specialization.value}
              loading={this.props.isSpecializationsLoading}
              placeholder="Specialization"
              options={reduceOptions(this.props.specializations, 'name', 'id')}
              onChange={this.handleSpecializationFilterChange}
            />
          </div>
        </div>
        <div className="courses__info">
          <Text>
            Found courses:
            {' '}
            {filteredCourses.length}
          </Text>
        </div>
        <div className="courses__list">
          {filteredCourses.map(course => (
            <CourseThumbnail
              key={course.id}
              courseId={course.id}
              name={course.name}
              country={course.country}
              city={course.city}
              startDate={this.formatDate(course.startDate)}
              endDate={this.formatDate(course.endDate)}
              isAuthorized={this.state.isAuthorized}
            />
          ))}
        </div>
      </div>
    );
  }
}

Courses.defaultProps = {
  courses: [],
  specializations: [],
};

Courses.propTypes = {
  isSpecializationsLoading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      specialization: PropTypes.string.isRequired,
      specializationId: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
};

const fetchCourses = () => {
  if (Authorization.checkToken()) { // Check if the user is authorized
    const { accountId } = Authorization.getProfile();

    const request = graphql(NOT_SUBSCRIBED_COURSES, {
      options: () => ({
        variables: {
          personAccountId: accountId,
        },
        fetchPolicy: 'cache-and-network',
      }),
      props: props => ({
        courses: props.data.courses,
        isCoursesLoading: props.data.loading,
      }),
    });

    return request;
  }

  const request = graphql(COURSES, {
    props: props => ({
      courses: props.data.courses,
      isCoursesLoading: props.data.loading,
    }),
  });

  return request;
};

export default compose(
  withApollo,
  graphql(SPECIALIZATIONS, {
    props: props => ({
      specializations: props.data.specializations,
      isSpecializationsLoading: props.data.loading,
    }),
  }),
  fetchCourses(),
)(Courses);
