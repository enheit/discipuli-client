import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Headline, ButtonLink } from '../../../common';

// Configs
import routes from '../../../routes/routes.config';

const SubscriptionThumbnail = props => (
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
        to={routes.course(props.specializationId, props.id)}
      >
        Open the course
      </ButtonLink>
    </div>
  </div>
);

SubscriptionThumbnail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specializationId: PropTypes.string.isRequired,
};

export default SubscriptionThumbnail;
