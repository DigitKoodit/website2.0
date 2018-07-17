import React from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'

const InputText = ({ type, label, value, handleChange, options, ...inputAttributes }) => {
  const { containerClass, labelClass, lines, placeholder, maxLength } = options || {}

  return (
    <div className={containerClass}>
      {label && <label className={labelClass}>{label}</label>}
      {(isNil(lines) || lines <= 1)
        ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            name={label}
            {...inputAttributes}
          />)
        : (
          <textarea
            type={type}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            name={label}
            {...inputAttributes}
          />
        )}
    </div>
  )
}

InputText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  handleChange: PropTypes.func,
  options: PropTypes.shape({
    containerClass: PropTypes.string,
    lines: PropTypes.number
  })
}

export default InputText
