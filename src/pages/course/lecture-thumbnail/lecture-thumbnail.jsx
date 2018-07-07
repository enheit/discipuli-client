import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Components
import { Headline } from '../../../common';

// Constants
import dateFormat from '../../../constants/date-format.constants';

// Configs
import routes from '../../../routes/routes.config';

const LectureThumbnail = props => (
  <div className="lecture-thumbnail">
    <Headline
      className="lecture-thumbnail__headline"
      render={() => (
        <Link
          className="link"
          to={routes.lecture(
            props.specializationId,
            props.courseId,
            props.lectureId,
          )}
        >
          {props.name}
        </Link>
      )}
    />
    <div className="lecture-thumbnail__lecturer">
      with
      {' '}
      {props.lecturer}
    </div>
    <div className="lecture-thumbnail__date">
      <span>
        @
        {' '}
      </span>
      <span>
        {moment(props.startDate).format(dateFormat.STANDARD)}
        {' '}
      </span>
      <span>
        {moment(props.startDate).format(dateFormat.TIME)}
        {' '}
      </span>
    </div>
  </div>
);

LectureThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  specializationId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  lectureId: PropTypes.string.isRequired,
  lecturer: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
};

export default LectureThumbnail;
