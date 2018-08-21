import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Column, Title } from 'bloomer'
import withLoader from '../../components/Helpers/withLoader'
import { Base } from '../../components/Layout'
import SideNav from '../../components/Intra/SideNav'
import asyncComponent from '../../components/AsyncComponent'
import authActions from '../../actions/authActions'
import routes from './intraRoutes'

const NotFound = asyncComponent(() => import('../NotFound'))

class IntraPage extends Component {
  componentDidMount = () => {
    this.props.fetchProfile()
  }
  render = () => {
    const { loading, ...rest } = this.props
    return <IntraPageComponent loading={loading} {...rest} />
  }

  static propTypes = {
    fetchProfile: PropTypes.func.isRequired,
    loading: PropTypes.bool
  }
}

const mapIntraPageStateToProps = state => ({
  loading: state.auth.loading
})

const mapIntraPageDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(authActions.fetchProfile())
})

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

const mapRoutes = routes => routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)

const IntraPageComponent = ({ loading }) => {
  if(loading) {
    return (
      <Base>
        <Column>
          <Title size={6}>Ladataan...</Title>
        </Column>
      </Base>
    )
  }
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

IntraPageComponent.propTypes = {
  loading: PropTypes.bool
}

export default connect(mapIntraPageStateToProps, mapIntraPageDispatchToProps)(withLoader(IntraPage, 1000))
