import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { verify } from 'jsonwebtoken';

import routes from './routes.config';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => {
    const token = localStorage.getItem('token');

    try {
      const decoded = verify(token, 'secretKey');

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    } catch (error) {
      return (
        <Redirect
          to={{
            pathname: routes.login(),
            state: { from: props.location }
          }}
        />
      )
    }
  }}/>
);

export default PrivateRoute;