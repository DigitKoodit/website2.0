import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form, { Input, PasswordInput } from '../../components/Form'
import { Link } from 'react-router-dom'

const initalFormModel = {
  username: '',
  email: '',
  password: ''
}

const RegistrationPage = ({ registrationPending, model, startRegistration }) => {
  const spinner = registrationPending && <i className='fas fa-circle-notch fa-spin button-icon' />

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
              <Input type='email' placeholder='Sähköpostiosoite' field='email' {...inputProps} />
              <PasswordInput placeholder='Salasana' field='password' {...inputProps} />
              <button type='submit' className='btn btn-primary'>Rekisteröidy {spinner}</button>
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
  registrationPending: PropTypes.bool.isRequired,
  startRegistration: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  registrationPending: false,
  model: initalFormModel
})

const mapDispatchToProps = dispatch => {
  return {
    startRegistration: ({ username, email, password }) => {
      console.log(username, email, password)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
