import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Headline, Text } from '../../../common';

const TaskThumbnail = (props) => {
  return (
    <div className="task-thumbnail">
      <div className="task-thumbnail__title">
        <Headline
          small
          title={props.name}
        />
      </div>
      <div className="task-thumbnail__description">
        <Text>
          {props.description}
        </Text>
      </div>
      <div className="task-thumbnail__info">
        <span>by {props.createdBy}</span>
      </div>
    </div>
  )
}

TaskThumbnail.defaultProps = {

};

TaskThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default TaskThumbnail;
