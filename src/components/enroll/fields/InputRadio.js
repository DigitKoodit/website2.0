import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Radio, Label } from 'bloomer'

const InputRadio = ({ label, value, handleChange, options, ...inputAttributes }) => {
  const inputs = value.map(input => (
    <Field key={input.name}>
      <Control>
        <Radio
          type='radio'
          placeholder={options.placeholder}
          checked={input.value}
          maxLength={options.maxLength}
          onChange={handleChange}
          name={label}
          {...inputAttributes}
        />
      </Control>
      {input.label && <Label className={options.labelClass}>{input.label}</Label>}
    </Field>
  ))
  return (
    <div className={options.containerClass}>
      {inputs}
    </div>
  )
}

InputRadio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.object
}

export default InputRadio
