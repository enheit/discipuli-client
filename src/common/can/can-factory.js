import PropTypes from 'prop-types';

// Components
import Can, { propTypes as CanPropTypes } from './can';

// Services
import Ability from '../../services/ability.service';

const createCanWithBoundAbilities = ability => class BoundCan extends Can {
  static propTypes = Object.assign({}, CanPropTypes, {
    // Override parent prop-types to remove requirement of ability
    ability: PropTypes.instanceOf(Ability),
  })

  constructor(...args) {
    super(...args);
    this.state.ability = this.state.ability || ability;
  }
};

export default createCanWithBoundAbilities;
