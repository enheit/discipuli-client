import React, { Component } from 'react';
import moment from 'moment';
import { Query, compose, graphql } from 'react-apollo';
import { Route } from 'react-router-dom';

// GraphQL Queries
import COURSES from './graphql/courses.graphql';
import SPECIALIZATIONS from './graphql/specializations.graphql';

// Services
import Authorization from '../../services/authorization.service';

// Constants
import DateFormat from '../../constants/date-format.constants';

// Components
import { Course } from './course';
import { Text, Select, Headline } from '../../common';

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

  reduceOptions = (specializations) => {
    return specializations.map(specialization => {
      return {
        label: specialization.name,
        value: specialization.id,
      };
    });
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
        <div className="courses__filter">
          <div className="specialization">
            <Select
              loading={this.props.isSpecializationsLoading}
              placeholder="Specialization"
              options={this.reduceOptions(this.props.specializations)}
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
            <Course
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