import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
// import fetch from 'fetch-hoc'
import asyncComponent from '../components/AsyncComponent'
// import ProilesRenderer from '../components/ProfilesRenderer'
import PrivateRoute from '../components/PrivateRoute'

const AsyncHeader = asyncComponent(() => import('./Header'))
const AsyncHome = asyncComponent(() => import('./Home'))
const AsyncCalendarSite = asyncComponent(() => import('./CalendarSite'))
// const AsyncBoardComponent = asyncComponent(() => BoardComponent)
const AsyncFooter = asyncComponent(() => import('./MainFooter'))
const AsyncIntraPage = asyncComponent(() => import('./Intra'))
// const AsyncIntraPage = asyncComponent(() => BoardComponent)
const AsyncLoginPage = asyncComponent(() => import('./Auth/LoginPage'))
const AsyncRegistrationPage = asyncComponent(() => import('./Auth/RegistrationPage'))
const AsyncDynamicPage = asyncComponent(() => import('./Content/DynamicPage'))
const AsyncEnrollPage = asyncComponent(() => import('./Enroll/EnrollPage'))

class Main extends Component {
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
        <Route path='/' component={AsyncHeader} />
        <Switch>
          <Route path='/' exact component={AsyncHome} />
          <Route path='/toiminta/tapahtumat' component={AsyncCalendarSite} />
          {/* <Route path='/viralliset/hallitus' component={AsyncBoardComponent} /> */}
          <Route path='/register' exact component={AsyncRegistrationPage} />
          <Route path='/login' exact component={AsyncLoginPage} />
          <PrivateRoute path='/intra' component={AsyncIntraPage} />
          <Route path='/ilmo/:id' component={AsyncEnrollPage} />
          <Route path='*' component={AsyncDynamicPage} />
        </Switch>
        <Route path='/' component={AsyncFooter} />
      </Fragment>
    )
  }
}

// const BoardSite = props => (
//   <ProfilesRenderer
//     title='Hallitus'
//     {...props}
//   />
// )
// const apiUrl = '/api/intra/board/2018'
// const buildBoard = url => fetch(url)(BoardSite)
// const BoardComponent = buildBoard(apiUrl)

export default Main
