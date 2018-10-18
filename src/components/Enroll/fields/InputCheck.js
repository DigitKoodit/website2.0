import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldLabel, FieldBody, Control, Checkbox as BCheckbox } from 'bloomer'

const InputCheck = ({ label, value, handleChange, options = {}, ...inputProps }) => {
  const inputs = Array.isArray(value)
    ? value.map((input, i) => renderCheckbox(input, handleChange, inputProps))
    : renderCheckbox(value, handleChange, inputProps)

  return (
    <Field isHorizontal>
      <FieldLabel>
        <span>{label}</span>
      </FieldLabel>
      <FieldBody>
        {inputs}
      </FieldBody>
    </Field>
  )
}

const renderCheckbox = (input, handleChange, { className }) => (
  <Field key={input.name}>
    <Control>
      <BCheckbox
        type='checkbox'
        className={className}
        name={input.name}
        checked={input.value}
        onChange={handleChange}>
        {input.label}
      </BCheckbox>
    </Control>
  </Field>
)
InputCheck.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
  options: PropTypes.object
}

export default InputCheck
