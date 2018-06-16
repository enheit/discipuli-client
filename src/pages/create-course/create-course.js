import React, { Component } from 'react';

// Components
import { Headline } from '../../common';
import CreateCourseForm from './create-course.form';

class CreateCourse extends Component {
  render() {
    return (
      <div className="create-course-container">
        <div className="create-course__title">
          <Headline
            large
            title="Create course"
          />
        </div>
        <CreateCourseForm />
      </div>
    )
  }
}

export default CreateCourse;