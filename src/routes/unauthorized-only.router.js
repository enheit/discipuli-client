import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes.config';
import Authorization from '../services/authorization.service';

const UnauthorizedOnlyRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => {
    const isTokenValid = Authorization.checkToken();

    if(isTokenValid) {
      return (
        <Redirect
          to={{
            pathname: routes.root(),
            state: { from: props.location }
          }}
        />
      )
    }

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }}
  />
);

export default UnauthorizedOnlyRoute;