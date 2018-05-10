import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const LoadableLogin = Loadable({
  loader: () => import('./pages/login/login'),
  loading: Loading,
});

const LoadableRegistration = Loadable({
  loader: () => import('./pages/registration/registration'),
  loading: Loading,
});

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoadableLogin} />
        <Route path="/registration" component={LoadableRegistration} />
      </Switch>
    );
  }
}

export default hot(module)(App);