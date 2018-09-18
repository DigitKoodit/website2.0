import React from 'react'
import PropTypes from 'prop-types'
import { Input as BInput } from 'bloomer'

const Input = ({ field, label, type, step, validationErrors, model, onChange, children, ...rest }) => {
  const handleOnChange = (event) => {
    let value = event.target.value
    return onChange({ [field]: value })
  }

  return (
    <div className='input-group mb-1'>
      <Label name={field} label={label} />
      <BInput
        type={type}
        step={step}
        name={field}
        value={model[field]}
        onChange={handleOnChange}
        {...rest} />
      {children}
      {validationErrors[field] && <p>{validationErrors[field].msg}</p>}
    </div>
  )
}

Input.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.string,
  validationErrors: PropTypes.object,
  model: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node
}

Input.defaultProps = {
  validationErrors: {},
  type: 'text',
  label: null,
  children: null
}

const Label = ({ name, label }) => {
  if(label) {
    return <label htmlFor={name}>
      {label}
    </label>
  }
  return null
}

Label.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
}

export default Input
