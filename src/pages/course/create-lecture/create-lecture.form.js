import React, { Component } from 'react';
import { compose, withApollo, graphql } from 'react-apollo';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

// GraphQL Queries
import CREATE_LECTURE from './graphql/mutations/create-lecture.graphql';
import PRESENTATIONS from './graphql/queries/presentations.graphql'
import TASKS from './graphql/queries/tasks.graphql'
import HOMEWORKS from './graphql/queries/homeworks.graphql'
import PERSONS from './graphql/queries/persons.graphql'

// Components
import { Button, Label, Input, Message, Select } from '../../../common';

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
    if(!!option) {
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
        {this.props.touched.lectureName && this.props.errors.lectureName &&
          <Message
            message={this.props.errors.lectureName}
            error
          />}

        <Label
          for="presentation"
          title="Presentation"
        />
        <Select
          value={this.props.values.presentation}
          options={reduceOptions(this.props.presentations, 'name', 'id')}
          loading={this.props.isPresentationsLoading}
          onChange={(option) => this.handleOptionChange(option, 'presentation')}
        />
        {this.props.touched.presentation && this.props.errors.presentation &&
          <Message
            message={this.props.errors.presentation}
            error
          />}

        <Label
          for="task"
          title="Task"
        />
        <Select
          value={this.props.values.task}
          options={reduceOptions(this.props.tasks, 'name', 'id')}
          loading={this.props.isTasksLoading}
          onChange={(option) => this.handleOptionChange(option, 'task')}
        />
        {this.props.touched.task && this.props.errors.task &&
          <Message
            message={this.props.errors.task}
            error
          />}

        <Label
          for="homework"
          title="Homework"
        />
        <Select
          value={this.props.values.homework}
          options={reduceOptions(this.props.homeworks, 'name', 'id')}
          loading={this.props.isHomeworksLoading}
          onChange={(option) => this.handleOptionChange(option, 'homework')}
        />
        {this.props.touched.homework && this.props.errors.homework &&
          <Message
            message={this.props.errors.homework}
            error
          />}

        <Label
          for="lecturer"
          title="Lecturer"
        />
        <Select
          value={this.props.values.lecturer}
          options={reduceOptions(this.props.persons, 'name', 'id')}
          loading={this.props.isPersonsLoading}
          onChange={(option) => this.handleOptionChange(option, 'lecturer')}
        />
        {this.props.touched.lecturer && this.props.errors.lecturer &&
          <Message
            message={this.props.errors.lecturer}
            error
          />}

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
        {this.props.touched.startDate && this.props.errors.startDate &&
          <Message
            message={this.props.errors.startDate}
            error
          />}

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
        {this.props.touched.endDate && this.props.errors.endDate &&
          <Message
            message={this.props.errors.endDate}
            error
          />}

        <Button
          positive
          type="submit"
        >
          Create lecture
        </Button>
      </form>
    )
  }
}

export default compose(
  withRouter,
  graphql(CREATE_LECTURE, {
    props: ({ mutate }) =>  ({
      createLecture: (
        courseId,
        presentationId,
        lecturerId,
        lectureName,
        taskId,
        homeworkId,
        startDate,
        endDate,
      ) => mutate({
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
      errorPolicy: 'all'
    }
  }),
  graphql(HOMEWORKS, {
    options: (props) => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: ({ data: { homeworks, loading } }, ownProps) => ({
      homeworks,
      isHomeworksLoading: loading,
    }),
  }),
  graphql(TASKS, {
    options: (props) => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: ({ data: { tasks, loading } }, ownProps) => ({
      tasks,
      isTasksLoading: loading,
    }),
  }),
  graphql(PRESENTATIONS, {
    options: (props) => ({
      variables: {
        specializationId: props.match.params.specializationId,
      },
    }),
    props: ({ data: { presentations, loading } }, ownProps) => ({
      presentations,
      isPresentationsLoading: loading,
    }),
  }),
  graphql(PERSONS, {
    options: (props) => ({
      variables: {
        roleId: 2, // teachers
      },
    }),
    props: ({ data: { persons, loading } }, ownProps) => ({
      persons,
      isPersonsLoading: loading,
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
