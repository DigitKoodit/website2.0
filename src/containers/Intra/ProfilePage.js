import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginActions } from '../../actions'
import Base from '../../components/Layout/Base'

const ProfilePage = ({ logout }) => {
  return (
    <Base>
      <button onClick={logout} className='btn btn-link'>Kirjaudu ulos</button>
    </Base>
  )
}

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: {},
  loading: state.registration.loading
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(loginActions.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
