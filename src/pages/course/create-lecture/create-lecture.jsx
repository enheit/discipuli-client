import React from 'react';

// Components
import { Headline } from '../../../common';
import CreateLectureForm from './create-lecture.form';

const CreateLecture = () => (
  <div className="create-lecture-container">
    <div className="create-lecture__title">
      <Headline
        large
        title="Create lecture"
      />
    </div>

    <CreateLectureForm />
  </div>
);

export default CreateLecture;
