import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form, { Input, PasswordInput } from '../../components/Form'
import { Link } from 'react-router-dom'
import { registrationActions } from '../../actions'
import withLoader from '../../components/Helpers/withLoader'

const initalFormModel = {
  username: '',
  email: '',
  password: ''
}

const RegistrationPage = ({ isLoading, model, startRegistration }) => {
  const spinner = isLoading && <i className='fas fa-circle-notch fa-spin button-icon' />

  return (
    <div className='site-container'>
      <div className='form-page'>
        <Form
          model={initalFormModel}
          validationErrors={model.error}
          handleSubmit={startRegistration}>
          {inputProps => (
            <Fragment>
              <Input type='text' placeholder='Käyttäjänimi' field='username' {...inputProps} />
              <Input type='text' placeholder='Sähköpostiosoite' field='email' {...inputProps} />
              <PasswordInput placeholder='Salasana' field='password' {...inputProps} />
              {model.error.common ? <p className='error margin-1'>{model.error.common}</p> : null}
              <button type='submit' className='btn btn-primary full-width'>Rekisteröidy {spinner}</button>
            </Fragment>
          )}
        </Form>
        <Link to='/login' className='btn btn-link'>Kirjaudu</Link>
      </div>
    </div>
  )
}

RegistrationPage.propTypes = {
  model: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  startRegistration: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  model: state.registration,
  loading: state.registration.loading
})

const mapDispatchToProps = dispatch => {
  return {
    startRegistration: ({ username, email, password }) => {
      dispatch(registrationActions.startRegistration(username, email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(RegistrationPage))
