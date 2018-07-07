import { Component } from 'react';
import PropTypes from 'prop-types';

// Services
import Ability from '../../services/ability.service';

class Can extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ability: this.props.ability,
    };
  }

  hasAbility = (action, subject) => this.state.ability.exist(action, subject)

  render() {
    if (this.hasAbility(this.props.I, this.props.a)) {
      return this.props.render();
    }

    return null;
  }
}

Can.defaultProps = {
  I: '',
  a: '',
};

// Export propTypes to follow the rule: react/forbid-foreign-prop-types
// Link: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
export const propTypes = {
  I: PropTypes.string,
  a: PropTypes.string,
  ability: PropTypes.instanceOf(Ability).isRequired,
  render: PropTypes.func.isRequired,
};

Can.propTypes = propTypes;

export default Can;
