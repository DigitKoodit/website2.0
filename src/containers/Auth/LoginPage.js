import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Form, { Input, PasswordInput } from '../../components/Form'

const model = {
  username: '',
  password: ''
}

class LoginPage extends Component {
  constructor(props) {
    super(props)
    // props.dispatch(userActions.logout())
    this.state = {
      submitted: false
    }
  }

  handleSubmit = data => {
    this.setState({ submitted: true })
    const { username, password } = data
    // const { dispatch } = this.props
    // if(username && password) {
    //   dispatch(userActions.login(username, password))
    // }
    console.log(username, password)
    return Promise.resolve()
  }

  render() {
    const { loggingIn } = this.props
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
                <Input type='text' placeholder='Käyttäjänimi tai sähköposti' field='username' {...inputProps} />
                <PasswordInput placeholder='Salasana' field='password' {...inputProps} />
                <button type='submit' className='btn btn-primary'>Kirjaudu</button>
              </Fragment>
            )}
          </Form>
          <Link to='/register' className='btn btn-link'>Rekisteröidy</Link>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  loggingIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    loggingIn: true
  }
}

export default connect(mapStateToProps)(LoginPage)
