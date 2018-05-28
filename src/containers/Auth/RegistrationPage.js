import React, { Fragment } from 'react'
import Form, { Input, PasswordInput } from '../../components/Form'
import { Link } from 'react-router-dom'

const RegistrationPage = () => {
  const model = {
    username: '',
    email: '',
    password: ''
  }

  return (
    <div className='site-container'>
      <div className='form-page'>
        <Form
          model={model}
          handleSubmit={data => {
            console.log('submit', data)
            return Promise.resolve()
          }}>
          {inputProps => (
            <Fragment>
              <Input type='text' placeholder='Käyttäjänimi' field='username' {...inputProps} />
              <Input type='email' placeholder='Sähköpostiosoite' field='email' {...inputProps} />
              <PasswordInput placeholder='Salasana' field='password' {...inputProps} />
              <button type='submit' className='btn btn-primary'>Rekisteröidy</button>
            </Fragment>
          )}
        </Form>
        <Link to='/login' className='btn btn-link'>Kirjaudu</Link>
      </div>
    </div>
  )
}

export default RegistrationPage
