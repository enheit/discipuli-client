import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorization from '../services/authorization.service';

import routes from './routes.config';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => {
    const isTokenValid = Authorization.checkToken();

    if(isTokenValid) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }

    return (
      <Redirect
        to={{
          pathname: routes.login(),
          state: { from: props.location }
        }}
      />
    )
  }}
  />
);

export default PrivateRoute;