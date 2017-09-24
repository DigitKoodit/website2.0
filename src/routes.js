import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import App from './containers/App';
import NotFound from './containers/NotFound';
import Header from './containers/Header';
import Footer from './containers/Footer';
import CalendarSite from './containers/CalendarSite';

const AppRoutes = () => (
  <App>
    <Route path="/" component={Header} />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/toiminta/tapahtumat" component={CalendarSite} />
      <Route status={404} component={NotFound} />
    </Switch>
    <Route path="/" component={Footer} />
  </App >
);

export default AppRoutes;