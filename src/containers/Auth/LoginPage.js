import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    // props.dispatch(userActions.logout())

    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    // const { dispatch } = this.props
    // if(username && password) {
    //   dispatch(userActions.login(username, password))
    // }
    console.log(username, password)
  }

  render() {
    const { loggingIn } = this.props
    const { username, password, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Kirjaudu</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor='username'>Käyttäjänimi tai sähköposti</label>
            <input
              type='text' className='form-control' name='username' value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className='help-block'>Syötä käyttäjänimi tai sähköposti</div>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor='password'>Salasana</label>
            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className='help-block'>Syötä salasana</div>
            }
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Kirjaudu</button>
            <Link to='/register' className='btn btn-link'>Rekisteröidy</Link>
          </div>
        </form>
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
