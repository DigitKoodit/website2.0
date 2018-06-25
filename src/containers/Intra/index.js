import React, { Fragment } from 'react'
import PropTypes from 'prop-types' //
import { Route, Switch } from 'react-router-dom'
import SideNav from '../../components/Intra/SideNav'
import asyncComponent from '../../components/AsyncComponent'
import '../../styles/intra.css'

import routes from './intraRoutes'
const NotFound = asyncComponent(() => import('../NotFound'))

const mapRoutes = routes => routes.map((route, i) =>
  <RouteWithSubRoutes key={i} {...route} />
)

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props =>
      route.component ? <route.component {...props} routes={route.routes} />
        : route.routes ? mapRoutes(route.routes) : null// Renders at least children
    }
  />
)

const IntraPage = () => {
  return (
    // React Components in JSX look like HTML tags
    <div className='site-container'>
      <div className='flex-content' >
        <SideNav
          items={routes}
        />
        <div className='column' id='right'>
          <div className='bottom'>
            <Switch>
              {mapRoutes(routes)}
              <Route status={NotFound} component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </div >
  )
}

IntraPage.propTypes = {
  data: PropTypes.object
}

export default IntraPage
