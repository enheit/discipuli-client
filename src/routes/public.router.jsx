import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = (properties) => {
  const { component: Component, layout: Layout, ...rest } = properties;
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default PublicRoute;
