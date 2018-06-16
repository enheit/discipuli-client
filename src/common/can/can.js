import React, { Component } from 'react';
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

  hasAbility = (action, subject) => {
    return this.state.ability.exist(action, subject);
  }

  render() {
    if(this.hasAbility(this.props.I, this.props.a)) {
      return this.props.render();
    }

    return null;
  }
}

Can.propTypes = {
  I: PropTypes.string,
  a: PropTypes.string,
  ability: PropTypes.instanceOf(Ability).isRequired,
}

export default Can;