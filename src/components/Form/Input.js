import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

const Input = ({ field, label, type, step, validationErrors, model, onChange, ...rest }) => {
  const handleOnChange = (event) => {
    let value = event.target.value
    return onChange({ [field]: value })
  }

  return (
    <div className='input-group'>
      <Label name={field} label={label} />
      <input
        type={type}
        step={step}
        name={field}
        value={model[field]}
        onChange={handleOnChange}
        {...rest} />
      {!isEmpty(validationErrors) && <p>{validationErrors[field]}</p>}
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
  onChange: PropTypes.func.isRequired
}

Input.defaultProps = {
  validationErrors: {},
  type: 'text',
  label: null
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
