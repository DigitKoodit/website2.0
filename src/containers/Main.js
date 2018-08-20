import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
// import fetch from 'fetch-hoc'
import asyncComponent from '../components/AsyncComponent'
// import ProilesRenderer from '../components/ProfilesRenderer'
import PrivateRoute from '../components/PrivateRoute'

const Header = asyncComponent(() => import('./Header'))
const Home = asyncComponent(() => import('./Home'))
const CalendarSite = asyncComponent(() => import('./CalendarSite'))
const Footer = asyncComponent(() => import('./SiteFooter'))
const IntraPage = asyncComponent(() => import('./Intra'))
const LoginPage = asyncComponent(() => import('./Auth/LoginPage'))
const RegistrationPage = asyncComponent(() => import('./Auth/RegistrationPage'))
// const RegistrationConfirmation = asyncComponent(() => import('./Auth/RegistrationConfirmation'))
const DynamicPage = asyncComponent(() => import('./Content/DynamicPage'))
const EnrollPage = asyncComponent(() => import('./Enroll/EnrollPage'))

class Main extends Component {
  render() {
    return this.getRouter()
  }
  getRouter() {
    return (
      <Fragment>
        <Header />
        <div className='is-full-height'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/toiminta/tapahtumat' component={CalendarSite} />
            {/* <Route path='/viralliset/hallitus' component={BoardComponent} /> */}
            <Route path='/register' exact component={RegistrationPage} />
            {/* <Route path='/register/:registrationToken' component={RegistrationConfirmation} /> */}
            <Route path='/login' exact component={LoginPage} />
            <PrivateRoute path='/intra' component={IntraPage} />
            <Route path='/ilmo/:id' component={EnrollPage} />
            <Route path='*' component={DynamicPage} />
          </Switch>
        </div >
        <Footer />
      </Fragment>
    )
  }
}

export default Main
