import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Radio, FieldLabel, FieldBody } from 'bloomer'

const InputRadio = ({ label, placeholder, value, onChange, options = {}, ...inputProps }) => {
  const inputs = Array.isArray(value)
    ? value.map((input, index) => renderRadioButton(input, onChange, inputProps, index))
    : renderRadioButton(value, onChange, inputProps)

  return (
    <Field isHorizontal>
      <FieldLabel>
        <span>{label || placeholder}</span>
      </FieldLabel>
      <FieldBody>
        {inputs}
      </FieldBody>
    </Field>
  )
}

const renderRadioButton = (input, onChange, { className }, index = 0) => (
  <Field key={input.name}>
    <Control>
      <Radio
        type='radio'
        className={className}
        name={`${input.name}_${index}`}
        checked={input.value}
        onChange={onChange}>
        {input.label}
      </Radio>
    </Control>
  </Field>
)

InputRadio.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.object
}

export default InputRadio
