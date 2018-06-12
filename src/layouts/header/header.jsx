import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { verify } from 'jsonwebtoken';

import routes from '../../routes/routes.config';
import Authorization from '../../services/authorization.service';

import { DropdownMenu, Button } from '../../common';

const LimitedHeader = (props) => {
  return (
    <React.Fragment>
      <Link to={routes.login()}>Authorize me</Link> /
      <Link to={routes.registration()}>Register me</Link>
    </React.Fragment>
  )
}

const ExtendedHeader = withApollo(withRouter((props) => {
  const logout = () => {
    // Reset cache os session on logout
    props.client.resetStore();
    // Remove user's token
    Authorization.clearToken();
    // Redirect user to login page
    props.history.push(routes.login());
  }

  return (
    <React.Fragment>
      <DropdownMenu title="Menu" horizontalReverse>
        <button onClick={logout} className="dropdown-menu__item">Exit</button>
      </DropdownMenu>
    </React.Fragment>
  )
}));

const Header = (props) => {
  return (
    <header className="header">
      { !Authorization.checkToken()
        ? <LimitedHeader />
        : <ExtendedHeader /> }
    </header>
  )
}

export default Header;