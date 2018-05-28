import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input } from '.'

class PasswordInput extends Component {
  state = {
    showPassword: false
  }

  togglePasswordVisibility = () => this.setState(prevState => ({
    showPassword: !prevState.showPassword
  }))

  render() {
    const { showPassword } = this.state
    const inputType = showPassword ? 'text' : 'password'
    const inputIcon = showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'
    return (
      <Fragment>
        <Input type={inputType} {...this.props}>
          <i className={`${inputIcon} input-icon`} aria-hidden='true' onClick={this.togglePasswordVisibility} />
        </Input>
      </Fragment>
    )
  }
}

PasswordInput.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  step: PropTypes.string,
  validationErrors: PropTypes.object,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

PasswordInput.defaultProps = {
  validationErrors: {},
  label: null
}
export default PasswordInput
