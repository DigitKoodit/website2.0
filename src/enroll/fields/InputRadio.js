import React from 'react'
import PropTypes from 'prop-types'

const InputRadio = ({ label, value, handleChange, options, ...inputAttributes }) => {
  const inputs = value.map(input => (
    <div>
      <input
        type='radio'
        placeholder={options.placeholder}
        checked={input.value}
        maxLength={options.maxLength}
        onChange={handleChange}
        name={label}
        {...inputAttributes}
      />
      {input.label && <label className={options.labelClass}>{input.label}</label>}
    </div>
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
