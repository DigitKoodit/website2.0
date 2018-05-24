import React from 'react'
import PropTypes from 'prop-types'

const InputCheck = ({ label, value, handleChange, options, ...inputAttributes }) => {
  const inputs = value.map((input, i) =>
    <div key={input.name}>
      <input
        type='checkbox'
        name={input.name}
        checked={input.value}
        onChange={handleChange}
      />
      <label>{input.label}</label>
    </div>
  )

  return (
    <div className={options.containerClass}>
      {label && <legend className={options.labelClass}>{label}</legend>}
      {inputs}
    </div>
  )
}

InputCheck.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.object
}

export default InputCheck
