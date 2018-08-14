import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Column } from 'bloomer'
import { Base } from '../../components/Layout'
import SideNav from '../../components/Intra/SideNav'
import asyncComponent from '../../components/AsyncComponent'
import authActions from '../../actions/authActions'
import routes from './intraRoutes'

class IntraPage extends Component {
  componentDidMount = () => {
    this.props.fetchProfile()
  }
  render() {
    return (
      <IntraPageComponent {...this.props} />
    )
  }
  static propTypes = {
    fetchProfile: PropTypes.func.isRequired
  }
}

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

const IntraPageComponent = () => {
  return (
    <Base>
      <Column isSize='narrow'>
        <SideNav
          items={routes}
        />
      </Column>
      <Column>
        <Switch>
          {mapRoutes(routes)}
          <Route status={NotFound} component={NotFound} />
        </Switch>
      </Column>
    </Base>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(authActions.fetchProfile())
})
export default connect(mapStateToProps, mapDispatchToProps)(IntraPage)
