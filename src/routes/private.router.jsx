import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorization from '../services/authorization.service';

import routes from './routes.config';

const PrivateRoute = (properties) => {
  const { component: Component, layout: Layout, ...rest } = properties;
  return (
    <Route
      {...rest}
      render={(props) => {
        const isTokenValid = Authorization.checkToken();

        if (isTokenValid) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }

        return (
          <Redirect
            to={routes.login()}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
