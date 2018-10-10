import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Checkbox, Label } from 'bloomer'

const InputCheck = ({ label, value, handleChange, options = {}, ...inputAttributes }) => {
  const inputs = Array.isArray(value)
    ? value.map((input, i) => checkbox(input))
    : checkbox(value)

  return (
    <div className={options.containerClass}>
      {label && <legend className={options.labelClass}>{label}</legend>}
      {inputs}
    </div>
  )
}

const checkbox = (input, handleChange) => (
  <Field key={input.name}>
    <Control>
      <Checkbox
        type='checkbox'
        name={input.name}
        checked={input.value}
        onChange={handleChange}
      />
    </Control>
    <Label>{input.label}</Label>
  </Field>
)
InputCheck.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
  options: PropTypes.object
}

export default InputCheck
