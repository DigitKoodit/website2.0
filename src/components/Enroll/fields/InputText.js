import React from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'
import { Field, FieldLabel, FieldBody, Control, Input, TextArea } from 'bloomer'

// TODO: use horizontal layout
const InputText = ({ type, label, value, handleChange, options, labelProps, ...inputAttributes }) => {
  const { containerClass, labelClass, lines, placeholder, maxLength } = options || {}

  return (
    <Field isHorizontal className={containerClass}>
      <FieldLabel>
        {label && (
          <span className={labelClass}>{label}</span>
        )}
      </FieldLabel>
      <FieldBody>
        <Field>
          <Control isExpanded>
            {(isNil(lines) || lines <= 1)
              ? (
                <Input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  name={label}
                  {...inputAttributes}
                />)
              : (
                <TextArea
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  name={label}
                  {...inputAttributes}
                />
              )}
          </Control>
        </Field>
      </FieldBody>
    </Field>
  )
}

InputText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  labelProps: PropTypes.string,
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
