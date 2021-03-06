import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import routes from '../../routes/routes.config';
import Authorization from '../../services/authorization.service';

import { DropdownMenu } from '../../common';

const LimitedHeader = () => (
  <React.Fragment>
    <Link to={routes.login()}>
      Authorize me
    </Link>
    {' '}
    /
    <Link to={routes.registration()}>
      Register me
    </Link>
  </React.Fragment>
);

const ExtendedHeader = withApollo(withRouter((props) => {
  const logout = () => {
    // Reset cache os session on logout
    props.client.resetStore();
    // Remove user's token
    Authorization.clearToken();
    // Redirect user to login page
    props.history.push(routes.login());
  };

  return (
    <React.Fragment>
      <DropdownMenu title="Menu" horizontalReverse>
        <NavLink
          exact
          activeClassName="dropdown-menu__item--active"
          to={routes.courses()}
          className="dropdown-menu__item"
        >
          Courses
        </NavLink>
        <NavLink
          activeClassName="dropdown-menu__item--active"
          to={routes.coursesSubscriptions()}
          className="dropdown-menu__item"
        >
          Subscriptions
        </NavLink>
        <button type="button" onClick={logout} className="dropdown-menu__item">
          Exit
        </button>
      </DropdownMenu>
    </React.Fragment>
  );
}));

const Header = () => (
  <header className="header">
    {!Authorization.checkToken()
      ? <LimitedHeader />
      : <ExtendedHeader />}
  </header>
);

export default Header;
