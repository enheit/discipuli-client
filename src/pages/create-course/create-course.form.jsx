import React, { Component } from 'react';
import {
  Query, compose, graphql, withApollo,
} from 'react-apollo';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

// GraphQL Queries
import SPECIALIZATIONS from '../common/graphql/specializations.graphql';
import COUNTRIES from '../common/graphql/countries.graphql';
import ACTIVE_CITIES_BY_COUNTRY_ID from '../common/graphql/active-cities-by-country-id.graphql';
import CREATE_COURSE from './graphql/mutations/create-course.graphql';

// Utils
import reduceOptions from '../../utils/options-reducer';

// Components
import {
  Button, Input, Label, Message, Select,
} from '../../common';

// Form utils
import createCourseFormSubmit from './create-course-form.submit';
import createCourseFormValidation from './create-course-form.validation';
import createCourseFormInitValues from './create-course.initial-values';

class CreateCourseForm extends Component {
  handleOptionChange = (option, fieldName) => {
    // setFieldValue update formik state manually
    // Working with 3rd party inputs https://github.com/jaredpalmer/formik#demos
    if (option) {
      this.props.setFieldValue(fieldName, option.value);
    } else {
      this.props.setFieldValue(fieldName, option); // where option === null
    }
  }

  render() {
    return (
      <form className="create-course-form" onSubmit={this.props.handleSubmit}>
        <Label
          for="courseName"
          title="Course name"
        />
        <Input
          id="courseName"
          name="courseName"
          placeholder="Course name"
          type="text"
          value={this.props.values.courseName}
          onChange={this.props.handleChange}
        />
        {this.props.touched.courseName && this.props.errors.courseName
          && (
            <Message
              message={this.props.errors.courseName}
              error
            />
          )
        }

        <Label
          for="specialization"
          title="Specialization"
        />
        <Select
          id="specialization"
          name="specialization"
          value={this.props.values.specialization}
          options={reduceOptions(this.props.specializations, 'name', 'id')}
          loading={this.props.isSpecializationsLoading}
          onChange={option => this.handleOptionChange(option, 'specialization')}
        />
        {this.props.touched.specialization && this.props.errors.specialization
          && (
            <Message
              message={this.props.errors.specialization}
              error
            />
          )
        }

        <Label
          for="country"
          title="Country"
        />
        <Select
          id="country"
          name="country"
          value={this.props.values.country}
          options={reduceOptions(this.props.countries, 'name', 'id')}
          loading={this.props.isCountriesLoading}
          onChange={option => this.handleOptionChange(option, 'country')}
        />
        {this.props.touched.country && this.props.errors.country
          && (
            <Message
              message={this.props.errors.country}
              error
            />
          )
        }

        {this.props.values.country
          && (
            <Query
              query={ACTIVE_CITIES_BY_COUNTRY_ID}
              variables={{
                countryId: this.props.values.country,
                isActive: true,
              }}
            >
              {query => (
                <React.Fragment>
                  <Label
                    for="city"
                    title="City"
                  />
                  <Select
                    id="city"
                    name="city"
                    value={this.props.values.city}
                    options={reduceOptions(query.data.cities, 'name', 'id')}
                    loading={query.loading}
                    onChange={option => this.handleOptionChange(option, 'city')}
                  />
                  {this.props.touched.city && this.props.errors.city
                    && (
                      <Message
                        message={this.props.errors.city}
                        error
                      />
                    )
                  }
                </React.Fragment>
              )}
            </Query>
          )
        }

        <Label
          for="startDate"
          title="Start date"
        />
        <Input
          id="startDate"
          name="startDate"
          placeholder="Start date"
          type="date"
          value={this.props.values.startDate}
          onChange={this.props.handleChange}
        />
        {this.props.touched.startDate && this.props.errors.startDate
          && (
            <Message
              message={this.props.errors.startDate}
              error
            />
          )
        }

        <Label
          for="endDate"
          title="endDate"
        />
        <Input
          id="endDate"
          name="endDate"
          placeholder="End date"
          type="date"
          value={this.props.values.endDate}
          onChange={this.props.handleChange}
        />
        {this.props.touched.endDate && this.props.errors.endDate
          && (
            <Message
              message={this.props.errors.endDate}
              error
            />
          )
        }

        <Button
          positive
          type="submit"
        >
          Create
        </Button>
      </form>
    );
  }
}

CreateCourseForm.defaultProps = {
  specializations: [],
  countries: [],
};

CreateCourseForm.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    courseName: PropTypes.string,
    specialization: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    courseName: PropTypes.bool,
    specialization: PropTypes.bool,
    country: PropTypes.bool,
    city: PropTypes.bool,
    startDate: PropTypes.bool,
    endDate: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    courseName: PropTypes.string,
    specialization: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }).isRequired,
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }).isRequired,
  ),
  isSpecializationsLoading: PropTypes.bool.isRequired,
  isCountriesLoading: PropTypes.bool.isRequired,
};

export default compose(
  graphql(CREATE_COURSE, {
    props: props => ({
      createCourse: (
        courseName,
        specializationId,
        countryId,
        cityId,
        startDate,
        endDate,
      ) => props.mutate({
        variables: {
          courseName,
          specializationId,
          countryId,
          cityId,
          startDate,
          endDate,
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
  graphql(SPECIALIZATIONS, {
    props: props => ({
      specializations: props.data.specializations,
      isSpecializationsLoading: props.data.loading,
    }),
  }),
  graphql(COUNTRIES, {
    props: props => ({
      countries: props.data.countries,
      isCountriesLoading: props.data.loading,
    }),
  }),
  withApollo,
  withFormik({
    displayName: 'CreateCourseForm',
    mapPropsToValues: createCourseFormInitValues,
    validate: createCourseFormValidation,
    handleSubmit: createCourseFormSubmit,
  }),
)(CreateCourseForm);
