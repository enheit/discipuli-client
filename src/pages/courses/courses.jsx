import React, { Component } from 'react';
import moment from 'moment';
import { compose, graphql } from 'react-apollo';

// GraphQL Queries
import COURSES from './graphql/courses.graphql';
import SPECIALIZATIONS from '../common/graphql/specializations.graphql';

// Services
import Authorization from '../../services/authorization.service';

// Utils
import reduceOptions from '../../utils/options-reducer';

// Constants
import DateFormat from '../../constants/date-format.constants';

// Components
import { CourseThumbnail } from './course-thumbnail';
import { Text, Select, Headline, Button, ButtonLink } from '../../common';
import Can from '../../common/can/can-bound';
import routesConfig from '../../routes/routes.config';

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: Authorization.checkToken(),
      specialization: null,
      courses: [],
    }
  }

  formatDate = (date) => {
    return moment(date).format(DateFormat.STANDARD);
  }

  handleSpecializationFilterChange = (option) => {
    this.setState({ specialization: option });
  }

  filterCoursesBySpecialization = (course) => {
    // Return true in case filter by courses was not applied
    if(!this.state.specialization) {
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
            Found courses: {filteredCourses.length}
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
    )
  }
}

Courses.defaultProps = {
  courses: [],
  specializations: [],
}

export default compose(
  graphql(SPECIALIZATIONS, {
    props: ({ data: { specializations, loading } }, ownProps) => ({
      specializations,
      isSpecializationsLoading: loading,
    }),
  }),
  graphql(COURSES, {
    props: ({ data: { courses, loading } }, ownProps) => ({
      courses,
      isCoursesLoading: loading,
    }),
  })
)(Courses);
