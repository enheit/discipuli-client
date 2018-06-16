import PropTypes from 'prop-types';

// Components
import Can from './can';

// Services
import Ability from '../../services/ability.service';

const createCanWithBoundAbilities = (ability) => {
  return class BoundCan extends Can {
    static propTypes = Object.assign({}, Can.propTypes, {
      // Override parent prop-types to remove requirement of ability
      ability: PropTypes.instanceOf(Ability),
    })

    constructor(...args) {
      super(...args);
      this.state.ability = this.state.ability || ability;
    }
  }
}

export default createCanWithBoundAbilities;