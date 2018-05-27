import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import jwt from 'jsonwebtoken';

import routes from './routes/routes.config';
import PrivateRoute from './routes/private.router';
import UnauthorizedOnlyRoute from './routes/unauthorized-only.router';

import { EmptyLayout, MainLayout } from '../src/layouts';

const LoadableLogin = Loadable({
  loader: () => import('./pages/login/login'),
  loading: () => <div>Loading</div>,
});

const LoadableRegistration = Loadable({
  loader: () => import('./pages/registration/registration'),
  loading: () => <div>Loading</div>,
});

const LoadableLectrues = Loadable({
  loader: () => import('./pages/lectures/lectures'),
  loading: () => <div>Loading</div>,
});

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          path={routes.root()}
          to={routes.lectures()}
        />
        <UnauthorizedOnlyRoute
          layout={EmptyLayout}
          path={routes.login()}
          component={LoadableLogin}
        />
        <UnauthorizedOnlyRoute
          layout={EmptyLayout}
          path={routes.registration()}
          component={LoadableRegistration}
        />
        <PrivateRoute
          layout={MainLayout}
          path={routes.lectures()}
          component={LoadableLectrues}
        />
      </Switch>
    );
  }
}

export default hot(module)(App);