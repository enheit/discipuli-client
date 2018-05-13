import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { verify } from 'jsonwebtoken';

import routes from './routes.config';

const UnauthorizedOnlyRoute = ({ component: Component, ...rest }) => (
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
      return <Component {...props} />;
    }
  }}/>
)

export default UnauthorizedOnlyRoute;