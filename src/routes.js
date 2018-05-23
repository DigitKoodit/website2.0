import React from 'react';
import { Route, Switch } from 'react-router-dom';
import fetch from 'fetch-hoc';
import Home from './containers/Home';
import App from './containers/App';
import NotFound from './containers/NotFound';
import Header from './containers/Header';
import Footer from './containers/Footer';
import CalendarSite from './containers/CalendarSite';
import ProfilesRenderer from './components/ProfilesRenderer';
import EnrollEvent from './enroll/EnrollEvent';

const AppRoutes = () => (
  <App>
    <Route path="/" component={Header} />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/toiminta/tapahtumat" component={CalendarSite} />
      <Route path="/viralliset/hallitus" component={BoardComponent} />
      <Route path="/ilmo/:id" component={EnrollEvent} />
      <Route path="/intra" component={EnrollEvent} />
      <Route status={404} component={NotFound} />
    </Switch>
    <Route path="/" component={Footer} />
  </App >
);

const BoardSite = props => (
  <ProfilesRenderer
    title="Hallitus"
    {...props}
  />
)
const apiUrl = '/api/intra/board/2018';
const buildBoard = url => fetch(url)(BoardSite);
const BoardComponent = buildBoard(apiUrl);

export default AppRoutes;