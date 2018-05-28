import React from 'react';
import { Route } from 'react-router-dom';

import routes from './routes.config';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }}/>
);

export default PublicRoute;