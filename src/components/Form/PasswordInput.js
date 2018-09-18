import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getBrowserInfo } from '../../lib/utils'
import Input from './Input'

class PasswordInput extends Component {
  constructor() {
    super()
    this.state = {
      showPassword: false,
      browser: getBrowserInfo().name
    }
  }

  render() {
    const { togglePasswordVisibility, ...rest } = this.props
    const { showPassword, browser } = this.state
    // Safari doesn't support pointer events
    const isSafari = browser === 'Safari'
    const inputType = (showPassword && !isSafari) ? 'text' : 'password'
    const inputIcon = !isSafari && (showPassword ? 'fa fa-eye-slash' : 'fa fa-eye')

    return (
      <Fragment>
        <Input type={inputType} {...rest} >
          {togglePasswordVisibility &&
            <i className={`${inputIcon} input-icon`}
              aria-hidden='true'
              onPointerDown={this.showPassword}
              onPointerUp={this.hidePassword}
              onPointerLeave={this.hidePassword}
            />
          }
        </Input>
      </Fragment>
    )
  }
  hidePassword = () => this.setPasswordVisibility(false)
  showPassword = () => this.setPasswordVisibility(true)
  setPasswordVisibility = isVisible => this.setState({
    showPassword: isVisible
  })
}

PasswordInput.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  step: PropTypes.string,
  validationErrors: PropTypes.object,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  togglePasswordVisibility: PropTypes.bool
}

PasswordInput.defaultProps = {
  validationErrors: {},
  label: null
}
export default PasswordInput
