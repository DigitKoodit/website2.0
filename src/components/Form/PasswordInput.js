import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getBrowserInfo } from '../../lib/utils'
import { Input } from '.'

class PasswordInput extends Component {
  constructor() {
    super()
    this.state = {
      showPassword: false,
      browser: getBrowserInfo().name
    }
  }

  setPasswordVisibility = isVisible => this.setState(prevState => ({
    showPassword: isVisible
  }))

  render() {
    const { showPassword, browser } = this.state
    // Safari doesn't support pointer events
    const isSafari = browser === 'Safari'
    const inputType = (showPassword && !isSafari) ? 'text' : 'password'
    const inputIcon = !isSafari && (showPassword ? 'fa fa-eye-slash' : 'fa fa-eye')

    return (
      <Fragment>
        <Input type={inputType} {...this.props} >
          <i className={`${inputIcon} input-icon`}
            aria-hidden='true'
            onPointerDown={() => this.setPasswordVisibility(true)}
            onPointerUp={() => this.setPasswordVisibility(false)}
            onPointerLeave={() => this.setPasswordVisibility(false)}
          />
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
