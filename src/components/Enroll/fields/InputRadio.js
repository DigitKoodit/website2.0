import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Radio, FieldLabel, FieldBody } from 'bloomer'

const InputRadio = ({ label, placeholder, name, value, onChange, options = {}, ...inputAttributes }) => {
  const inputs = Array.isArray(value)
    ? value.map((input, index) => renderRadioButton(name, input, onChange, inputAttributes, index))
    : renderRadioButton(name, value, onChange, inputAttributes)

  return (
    <Field isHorizontal>
      <FieldLabel>
        <span> {label || placeholder}</span>
      </FieldLabel>
      <FieldBody>
        <Control>
          {inputs}
        </Control>
      </FieldBody>
    </Field>
  )
}

const renderRadioButton = (name, input, onChange, { className }, index = 0) => (
  <Radio
    key={index}
    className={className}
    name={name}
    checked={input}
    onChange={onChange}>
    <span> {input.label}</span>
  </Radio>
)

InputRadio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  options: PropTypes.object
}

export default InputRadio
