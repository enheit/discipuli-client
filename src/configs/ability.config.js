// Services
import Ability from '../services/ability.service';
import Authorization from '../services/authorization.service';

const ability = new Ability();

if (Authorization.getProfile()) {
  ability.update(Authorization.getProfile().rules);
}

export default ability;
