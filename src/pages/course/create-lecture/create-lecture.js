import React, { Component } from 'react';

// Components
import { Headline } from '../../../common';
import CreateLectureForm from './create-lecture.form';

class CreateLecture extends Component {
  render() {
    return (
      <div className="create-lecture-container">
        <div className="create-lecture__title">
          <Headline
            large
            title="Create lecture"
          />
        </div>

        <CreateLectureForm />
      </div>
    )
  }
}

export default CreateLecture;
