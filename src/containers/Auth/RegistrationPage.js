import React, { Fragment } from 'react'
import Form from '../../components/Form'
import Input from '../../components/Form/Input'

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
              <h3>Rekisteröidy</h3>
              <Input type='text' placeholder='Käyttäjänimi' field='username' {...inputProps} />
              <Input type='email' placeholder='Sähköpostiosoite' field='email' {...inputProps} />
              <Input type='text' placeholder='Salasana' field='password' {...inputProps} />
              <button type='submit' className='btn btn-primary'>Valmis</button>
            </Fragment>
          )}
        </Form>
      </div>
    </div>
  )
}

export default RegistrationPage
