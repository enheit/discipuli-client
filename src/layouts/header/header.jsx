import React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import routes from '../../routes/routes.config';

import { DropdownMenu } from '../../common';

const Header = (props) => {

  const logout = () => {
    // Reset cache os session on logout
    props.client.resetStore();
    // Remove user's token
    localStorage.removeItem('token');
    // Redirect user to login page
    props.history.push(routes.login());
  }

  return (
    <header className="header">
      <DropdownMenu title="Menu" horizontalReverse>
        <button onClick={logout} className="dropdown-menu__item">Exit</button>
      </DropdownMenu>
    </header>
  )
}

export default withApollo(withRouter(Header));