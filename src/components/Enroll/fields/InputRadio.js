import React from 'react'
import PropTypes from 'prop-types'
import { Control, Radio } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
import { Field } from 'formik'

const InputRadio = ({
  label,
  value,
  hint,
  isHorizontal,
  name,
  inputProps,
  setFieldValue
}) => {
  const { containerClass, labelClass } = inputProps || {}

  const inputs = Array.isArray(value)
    ? value.map((input) => renderRadioButton(name, input, inputProps))
    : renderRadioButton(name, value, inputProps)

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

InputRadio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object,
  setFieldValue: PropTypes.func
}

const renderRadioButton = (name, input, { inputClassName }) => (
  <Field
    key={input.label}
    component={RadioButton}
    id={input.name}
    label={input.label}
    className={inputClassName}
    name={`values.${name}`}
  />
)

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <Radio
      name={name}
      id={id}
      value={id}
      checked={id === value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      {...props}
    >
      <label htmlFor={id}>
        <span> {label}</span>
      </label>
    </Radio>
  )
}

RadioButton.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
}

export default InputRadio
