import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { verify } from 'jsonwebtoken';

import routes from './routes.config';

const UnauthorizedOnlyRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => {
    const token = localStorage.getItem('token');

    try {
      const decoded = verify(token, 'secretKey');

      return (
        <Redirect
          to={{
            pathname: routes.root(),
            state: { from: props.location }
          }}
        />
      )
    } catch (error) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }
  }}/>
)

export default UnauthorizedOnlyRoute;