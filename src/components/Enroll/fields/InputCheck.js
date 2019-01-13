import React from 'react'
import PropTypes from 'prop-types'
import { Control, Checkbox } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
import { Field } from 'formik'

const InputCheck = ({
  label,
  name,
  options,
  hint,
  isHorizontal,
  inputProps
}) => {
  const { containerClass, labelClass } = inputProps || {}

  const inputs = options
    ? renderCheckButtons(options, name, inputProps)
    : renderCheckButton(name, inputProps)

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass} >
      <Control>
        {inputs}
      </Control>
    </EditorField>
  )
}

InputCheck.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object
}

const renderCheckButtons = (options, fieldName, inputProps) =>
  options.map(input =>
    <Field
      key={input.label}
      component={CheckButton}
      id={input.name}
      label={input.label}
      className={inputProps.inputClassName}
      name={`[${fieldName}][${input.name}]`}
    />
  )

const renderCheckButton = (name, inputProps) =>
  <Field
    key={name}
    component={CheckButton}
    id={name}
    className={inputProps.inputClassName}
    name={name}
  />

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
      checked={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      {...props}
    >
      {label &&
        <label htmlFor={id}>
          <span> {label}</span>
        </label>
      }
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
