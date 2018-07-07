import React from 'react';

// Components
import { Headline } from '../../common';
import CreateCourseForm from './create-course.form';

const CreateCourse = () => (
  <div className="create-course-container">
    <div className="create-course__title">
      <Headline
        large
        title="Create course"
      />
    </div>
    <CreateCourseForm />
  </div>
);

export default CreateCourse;
