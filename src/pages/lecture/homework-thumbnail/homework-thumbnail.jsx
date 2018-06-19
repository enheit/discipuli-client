import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Headline, Text } from '../../../common';

const HomeworkThumbnail = (props) => {
  return (
    <div className="homework-thumbnail">
      <div className="homework-thumbnail__title">
        <Headline
          small
          title={props.name}
        />
      </div>
      <div className="homework-thumbnail__description">
        <Text>
          {props.description}
        </Text>
      </div>
      <div className="homework-thumbnail__info">
        <span>by {props.createdBy}</span>
      </div>
    </div>
  )
}

HomeworkThumbnail.defaultProps = {

};

HomeworkThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default HomeworkThumbnail;
