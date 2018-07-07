import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// GraphQL Queries
import LECTURE_BY_ID from './graphql/queries/lecture-by-id.graphql';
import TASKS_BY_LECTURE_ID from './graphql/queries/tasks-by-lecture-id.graphql';
import HOMEWORKS_BY_LECTURE_ID from './graphql/queries/homeworks-by-lecture-id.graphql';

// Components
import { Headline } from '../../common';
import TaskThumbnail from './task-thumbnail';
import HomeworkThumbnail from './homework-thumbnail';

class Lecture extends Component {
  getLectureName = () => (
    this.props.isLectureLoading
      ? 'Lecture'
      : this.props.lecture.name
  )

  getLecturerName = () => (
    this.props.isLectureLoading
      ? 'John Doe'
      : this.props.lecture.lecturer
  )

  render() {
    return (
      <div className="lecture">
        <div className="lecture__title">
          <Headline
            large
            title={this.getLectureName()}
          />
        </div>

        <div className="lecture__lecturer">
          with
          {' '}
          {this.getLecturerName()}
        </div>

        <div className="lecture__presentation">
          <div
            style={{
              height: 500,
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: 5,
              background: '#eee',
            }}
          />
        </div>

        <div className="lecture__task">
          <div className="lecture__headline">
            <Headline
              title="Tasks"
            />
          </div>
          {this.props.tasks.map(task => (
            <TaskThumbnail
              key={task.id}
              name={task.name}
              description={task.description}
              createdBy={task.createdBy}
            />
          ))}
        </div>

        <div className="lecture__homework">
          <div className="lecture__headline">
            <Headline
              title="Homework"
            />
          </div>
          {this.props.homeworks.map(homework => (
            <HomeworkThumbnail
              key={homework.id}
              name={homework.name}
              description={homework.description}
              createdBy={homework.createdBy}
            />
          ))}
        </div>
      </div>
    );
  }
}

Lecture.defaultProps = {
  tasks: [],
  homeworks: [],
  lecture: {},
};

Lecture.propTypes = {
  isLectureLoading: PropTypes.bool.isRequired,
  lecture: PropTypes.shape({
    name: PropTypes.string,
    lecturer: PropTypes.string,
  }),
  tasks: PropTypes.arrayOf(PropTypes.shape(TaskThumbnail.propTypes)),
  homeworks: PropTypes.arrayOf(PropTypes.shape(TaskThumbnail.propTypes)),
};

export default compose(
  withRouter,
  graphql(LECTURE_BY_ID, {
    options: props => ({
      variables: {
        lectureId: props.match.params.lectureId,
      },
    }),
    props: props => ({
      lecture: props.data.lecture,
      isLectureLoading: props.data.loading,
    }),
  }),
  graphql(TASKS_BY_LECTURE_ID, {
    options: props => ({
      variables: {
        lectureId: props.match.params.lectureId,
      },
    }),
    props: props => ({
      tasks: props.data.tasks,
      areTasksLoading: props.data.loading,
    }),
  }),
  graphql(HOMEWORKS_BY_LECTURE_ID, {
    options: props => ({
      variables: {
        lectureId: props.match.params.lectureId,
      },
    }),
    props: props => ({
      homeworks: props.data.homeworks,
      areHomeworksLoading: props.data.loading,
    }),
  }),
)(Lecture);
