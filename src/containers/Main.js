import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom';
import fetch from 'fetch-hoc';
import asyncComponent from '../components/AsyncComponent'
import ProfilesRenderer from '../components/ProfilesRenderer';


const AsyncHeader = asyncComponent(() => import('./Header'))
const AsyncHome = asyncComponent(() => import('./Home'))
const AsyncCalendarSite = asyncComponent(() => import('./CalendarSite'))
const AsyncBoardComponent = asyncComponent(() => BoardComponent)
const AsyncEnrollEvent = asyncComponent(() => import('../enroll/EnrollEvent'))
const AsyncNotFound = asyncComponent(() => import('./NotFound'))
const AsyncFooter = asyncComponent(() => import('./Footer'))

class Main extends Component {
  state = {}

  render() {
    return (
      <Fragment>
        {this.getRouter()}
      </Fragment>
    )
  }
  getRouter() {
    return (
      <Fragment>
        <Route path="/" component={AsyncHeader} />
        <Switch>
          <Route path="/" exact component={AsyncHome} />
          <Route path="/toiminta/tapahtumat" component={AsyncCalendarSite} />
          <Route path="/viralliset/hallitus" component={AsyncBoardComponent} />
          <Route path="/ilmo/:id" component={AsyncEnrollEvent} />
          <Route path="/intra" component={AsyncEnrollEvent} />
          <Route status={AsyncNotFound} component={AsyncNotFound} />
        </Switch>
        <Route path="/" component={AsyncFooter} />
      </Fragment>
    )
  }
}

const BoardSite = props => (
  <ProfilesRenderer
    title="Hallitus"
    {...props}
  />
)
const apiUrl = '/api/intra/board/2018';
const buildBoard = url => fetch(url)(BoardSite);
const BoardComponent = buildBoard(apiUrl);


export default Main
