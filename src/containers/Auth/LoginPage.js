import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form, { Input, PasswordInput } from '../../components/Form'
import { loginActions } from '../../actions'

const initalFormModel = {
  username: '',
  password: ''
}

const LoginPage = ({ loggingIn, model, startLogin }) => {
  const spinner = loggingIn && <i className='fas fa-circle-notch fa-spin button-icon' />
  return (
    <div className='site-container'>
      <div className='form-page'>
        <Form
          model={initalFormModel}
          validationErrors={model.error}
          handleSubmit={startLogin}>
          {inputProps => (
            <Fragment>
              <Input type='text' placeholder='Käyttäjänimi tai sähköposti' field='username' {...inputProps} />
              <PasswordInput placeholder='Salasana' field='password' {...inputProps} />
              <button type='submit' className='btn btn-primary'>Kirjaudu {spinner}</button>
            </Fragment>
          )}
        </Form>
        <Link to='/register' className='btn btn-link'>Rekisteröidy</Link>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  model: PropTypes.object.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  startLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    model: state.login,
    loggingIn: state.login.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLogin: ({ username, password }) => {
      dispatch(loginActions.startLogin(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
