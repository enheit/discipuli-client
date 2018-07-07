import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withApollo, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

// GraphQL Queries
import CREATE_LECTURE from './graphql/mutations/create-lecture.graphql';
import PRESENTATIONS from './graphql/queries/presentations.graphql';
import TASKS from './graphql/queries/tasks.graphql';
import HOMEWORKS from './graphql/queries/homeworks.graphql';
import PERSONS from './graphql/queries/persons.graphql';

// Components
import {
  Button, Label, Input, Message, Select,
} from '../../../common';

// Utils
import reduceOptions from '../../../utils/options-reducer';

// Form utils
import createLectureFormSubmit from './create-lecture-form.submit';
import createLectureFormValidation from './create-lecture-form.validation';
import createLectureFormInitValues from './create-lecture-form.initial-values';

class CreateLectureForm extends Component {
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
      <form
        className="create-lecture-form"
        onSubmit={this.props.handleSubmit}
      >
        <Label
          for="lectureName"
          title="Lecture name"
        />
        <Input
          id="lectureName"
          name="lectureName"
          placeholder="Lecture name"
          type="text"
          value={this.props.values.lectureName}
          onChange={this.props.handleChange}
        />
        {this.props.touched.lectureName && this.props.errors.lectureName
          && (
            <Message
              message={this.props.errors.lectureName}
              error
            />
          )
        }

        <Label
          for="presentation"
          title="Presentation"
        />
        <Select
          id="presentation"
          name="presentation"
          value={this.props.values.presentation}
          options={reduceOptions(this.props.presentations, 'name', 'id')}
          loading={this.props.isPresentationsLoading}
          onChange={option => this.handleOptionChange(option, 'presentation')}
        />
        {this.props.touched.presentation && this.props.errors.presentation
          && (
            <Message
              message={this.props.errors.presentation}
              error
            />
          )
        }

        <Label
          for="task"
          title="Task"
        />
        <Select
          id="task"
          name="task"
          value={this.props.values.task}
          options={reduceOptions(this.props.tasks, 'name', 'id')}
          loading={this.props.isTasksLoading}
          onChange={option => this.handleOptionChange(option, 'task')}
        />
        {this.props.touched.task && this.props.errors.task
          && (
            <Message
              message={this.props.errors.task}
              error
            />
          )
        }

        <Label
          for="homework"
          title="Homework"
        />
        <Select
          id="homework"
          name="homework"
          value={this.props.values.homework}
          options={reduceOptions(this.props.homeworks, 'name', 'id')}
          loading={this.props.isHomeworksLoading}
          onChange={option => this.handleOptionChange(option, 'homework')}
        />
        {this.props.touched.homework && this.props.errors.homework
          && (
            <Message
              message={this.props.errors.homework}
              error
            />
          )
        }

        <Label
          for="lecturer"
          title="Lecturer"
        />
        <Select
          id="lecturer"
          name="lecturer"
          value={this.props.values.lecturer}
          options={reduceOptions(this.props.persons, 'name', 'id')}
          loading={this.props.isPersonsLoading}
          onChange={option => this.handleOptionChange(option, 'lecturer')}
        />
        {this.props.touched.lecturer && this.props.errors.lecturer
          && (
            <Message
              message={this.props.errors.lecturer}
              error
            />
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
          type="datetime-local"
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
          title="End date"
        />
        <Input
          id="endDate"
          name="endDate"
          placeholder="End date"
          type="datetime-local"
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
          Create lecture
        </Button>
      </form>
    );
  }
}

CreateLectureForm.defaultProps = {
  presentations: [],
  tasks: [],
  homeworks: [],
  persons: [],
};

CreateLectureForm.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    lectureName: PropTypes.string,
    presentation: PropTypes.string,
    task: PropTypes.string,
    homework: PropTypes.string,
    lecturer: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    lectureName: PropTypes.bool,
    presentation: PropTypes.bool,
    task: PropTypes.bool,
    homework: PropTypes.bool,
    lecturer: PropTypes.bool,
    startDate: PropTypes.bool,
    endDate: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    lectureName: PropTypes.string,
    presentation: PropTypes.string,
    task: PropTypes.string,
    homework: PropTypes.string,
    lecturer: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  presentations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
  homeworks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      __typename: PropTypes.string.isRequired,
    }),
  ),
  isPresentationsLoading: PropTypes.bool.isRequired,
  isTasksLoading: PropTypes.bool.isRequired,
  isHomeworksLoading: PropTypes.bool.isRequired,
  isPersonsLoading: PropTypes.bool.isRequired,
};

export default compose(
  withRouter,
  graphql(CREATE_LECTURE, {
    props: props => ({
      createLecture: (
        courseId,
        presentationId,
        lecturerId,
        lectureName,
        taskId,
        homeworkId,
        startDate,
        endDate,
      ) => props.mutate({
        variables: {
          courseId,
          presentationId,
          lecturerId,
          lectureName,
          taskId,
          homeworkId,
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
  graphql(HOMEWORKS, {
    options: props => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: props => ({
      homeworks: props.data.homeworks,
      isHomeworksLoading: props.data.loading,
    }),
  }),
  graphql(TASKS, {
    options: props => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: props => ({
      tasks: props.data.tasks,
      isTasksLoading: props.data.loading,
    }),
  }),
  graphql(PRESENTATIONS, {
    options: props => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: props => ({
      presentations: props.data.presentations,
      isPresentationsLoading: props.data.loading,
    }),
  }),
  graphql(PERSONS, {
    options: () => ({
      variables: {
        roleId: 2, // teachers
      },
    }),
    props: props => ({
      persons: props.data.persons,
      isPersonsLoading: props.data.loading,
    }),
  }),
  withApollo,
  withFormik({
    displayName: 'CreateLectureForm',
    mapPropsToValues: createLectureFormInitValues,
    validate: createLectureFormValidation,
    handleSubmit: createLectureFormSubmit,
  }),
)(CreateLectureForm);
