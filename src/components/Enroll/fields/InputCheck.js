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
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hint: PropTypes.string,
  isHorizontal: PropTypes.bool,
  inputProps: PropTypes.shape({
    containerClass: PropTypes.string,
    labelClass: PropTypes.string,
    onBlur: PropTypes.func
  })
}

const renderCheckButtons = (options, fieldName, inputProps) =>
  options.map(option =>
    <Field
      key={option.label}
      component={CheckButton}
      label={option.label}
      className={inputProps.inputClassName}
      name={`[${fieldName}][${option.name}]`}
      onBlur={inputProps.onBlur}
    />
  )

const renderCheckButton = (name, inputProps) =>
  <Field
    key={name}
    component={CheckButton}
    id={name}
    className={inputProps.inputClassName}
    name={name}
    onBlur={inputProps.onBlur}
  />

const CheckButton = ({
  field: { name, value, onChange },
  label,
  className,
  onBlur,
  ...props
}) => {
  return (
    <Checkbox
      name={name}
      id={name}
      checked={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      {...props}
    >
      {label &&
        <label htmlFor={name}>
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
  label: PropTypes.node,
  className: PropTypes.string,
  onBlur: PropTypes.func
}

export default InputCheck
