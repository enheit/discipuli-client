import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from './routes.config';
import Authorization from '../services/authorization.service';

const UnauthorizedOnlyRoute = (properties) => {
  const { component: Component, layout: Layout, ...rest } = properties;
  return (
    <Route
      {...rest}
      render={(props) => {
        const isTokenValid = Authorization.checkToken();

        if (isTokenValid) {
          return (
            <Redirect
              to={routes.root()}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default UnauthorizedOnlyRoute;
