import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Headline, ButtonLink } from '../../../common';

// Configs
import routes from '../../../routes/routes.config';

const SubscriptionThumbnail = (props) => {
  return (
    <div className="subscription-thumbnail">
      <div className="subscription-thumbnail__title">
        <Headline
          small
          title={props.name}
        />
      </div>
      <div className="subscription-thumbnail__actions">
        <ButtonLink
          positive
          to={routes.course(props.specializationId, props.courseId)}
        >
          Open the course
        </ButtonLink>
      </div>
    </div>
  )
}

SubscriptionThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  specializationId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default SubscriptionThumbnail;
