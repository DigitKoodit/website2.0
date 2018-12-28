import React from 'react'
import PropTypes from 'prop-types'
import { Control, Checkbox } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
import { Field } from 'formik'

const InputCheck = ({
  label,
  value,
  hint,
  isHorizontal,
  name,
  inputProps
}) => {
  const { containerClass, labelClass } = inputProps || {}

  const inputs = Array.isArray(value)
    ? value.map((input, index) => renderCheckButton(name, input, inputProps, index))
    : renderCheckButton(name, value, inputProps)

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}
    >
      <Control>
        {inputs}
      </Control>
    </EditorField>
  )
}

InputCheck.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object
}

const renderCheckButton = (name, input, { inputClassName }, index) => (
  <Field
    key={input.label}
    component={CheckButton}
    id={input.name}
    label={input.label}
    className={inputClassName}
    name={index != null ? `${name}[${index}].value` : name}
  />
)

const CheckButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <Checkbox
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      {...props}
    >
      <label htmlFor={id}>
        <span> {label}</span>
      </label>
    </Checkbox>
  )
}

CheckButton.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
}

export default InputCheck
