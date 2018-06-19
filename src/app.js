import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import jwt from 'jsonwebtoken';

import routes from './routes/routes.config';
import PrivateRoute from './routes/private.router';
import UnauthorizedOnlyRoute from './routes/unauthorized-only.router';
import PublicRoute from './routes/public.router';

import { EmptyLayout, MainLayout } from '../src/layouts';

const LoadableLogin = Loadable({
  loader: () => import('./pages/login/login'),
  loading: () => <div>Loading</div>,
});

const LoadableRegistration = Loadable({
  loader: () => import('./pages/registration/registration'),
  loading: () => <div>Loading</div>,
});

const LoadableCourses = Loadable({
  loader: () => import('./pages/courses/courses'),
  loading: () => <div>Loading</div>,
});

const LoadableCreateCourse = Loadable({
  loader: () => import('./pages/create-course/create-course'),
  loading: () => <div>Loading</div>,
});

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          path={routes.root()}
          to={routes.courses()}
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
        <PublicRoute
          exact
          layout={MainLayout}
          path={routes.courses()}
          component={LoadableCourses}
        />
        <PrivateRoute
          layout={MainLayout}
          path={routes.createCourse()}
          component={LoadableCreateCourse}
        />
      </Switch>
    );
  }
}

export default hot(module)(App);