import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import Header from './Header'
import Footer from './SiteFooter'

const isDev = process.env.NODE_ENV === 'development'

const Home = React.lazy(() => import('./Home'))
const IntraPage = React.lazy(() => import('./Intra'))
const LoginPage = React.lazy(() => import('./Auth/LoginPage'))
const RegistrationPage = React.lazy(() => import('./Auth/RegistrationPage'))
// const RegistrationConfirmation = React.lazy(() => import('./Auth/RegistrationConfirmation'))
const DynamicPage = React.lazy(() => import('./Content/DynamicPage'))
const EnrollPage = React.lazy(() => import('./Enroll/EnrollPage'))

class Main extends Component {
  render() {
    return this.getRouter()
  }
  getRouter() {
    return (
      <>
        <Header />
        <div className='is-full-height'>
          <Suspense fallback={null}>
            <Switch>
              <Route path='/' exact component={Home} />
              {/* <Route path='/viralliset/hallitus' component={BoardComponent} /> */}
              {isDev &&
                <Route path='/register' exact component={RegistrationPage} />
              }
              {/* <Route path='/register/:registrationToken' component={RegistrationConfirmation} /> */}
              <Route path='/login' exact component={LoginPage} />
              <Route path='/ilmo' component={EnrollPage} />
              <PrivateRoute path='/intra' component={IntraPage} />
              <Route path='*' component={DynamicPage} />
            </Switch>
          </Suspense>
        </div >
        <Footer />
      </>
    )
  }
}

export default Main
