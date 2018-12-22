import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Select, Label } from 'bloomer'

const InputSelect = ({ label, value, onChange, options, ...inputAttributes }) => {
  delete inputAttributes.setFieldValue
  const selectOptions = value.map(option =>
    <option
      key={option.name}
      value={option.name}>
      {option.value}
    </option>
  )
  return (
    <Field className={options.containerClass}>
      {label && <Label className={options.labelClass}>{label}</Label>}
      <Control>
        <Select
          name={label}
          onChange={onChange}
          value={value[1].name}
          {...inputAttributes}
        >
          {selectOptions}
        </Select>
      </Control>

    </Field>
  )
}

InputSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.object
}

export default InputSelect
