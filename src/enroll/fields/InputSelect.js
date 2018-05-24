import React from 'react'
import PropTypes from 'prop-types'

const InputSelect = ({ label, value, handleChange, options, ...attributes }) => {
  const selectOptions = value.map(option =>
    <option
      key={option.name}
      value={option.name}>
      {option.value}
    </option>
  )
  return (
    <div className={options.containerClass}>
      {label && <label className={options.labelClass}>{label}</label>}
      <select
        name={label}
        onChange={handleChange}
        value={value[1].name}
        {...attributes}
      >
        {selectOptions}
      </select>

    </div>
  )
}

InputSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.object
}

export default InputSelect
