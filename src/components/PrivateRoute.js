import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    // TODO: more robust token validation
    const jwtToken = localStorage.getItem('jwtToken')
    return (
      jwtToken
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }} />
)

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object
}

export default PrivateRoute
