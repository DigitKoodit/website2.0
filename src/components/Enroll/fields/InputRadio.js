import React from 'react'
import PropTypes from 'prop-types'
import { Control, Radio } from 'bloomer'
import { Field } from 'formik'
import EditorField from '../../Intra/ModelEditor/EditorField'

const InputRadio = ({
  label,
  name,
  options,
  hint,
  isHorizontal,
  inputProps
}) => {
  const { containerClass, labelClass, onBlur } = inputProps || {}

  const inputs = renderRadioButtons(options, name, onBlur)

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}>
      <Control>
        {inputs}
      </Control>
    </EditorField>
  )
}

InputRadio.propTypes = {
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

const renderRadioButtons = (options, name, onBlur) =>
  options.map((option, { inputClassName }) => (
    <Field
      key={option.label}
      component={RadioButton}
      id={option.name}
      label={option.label}
      className={inputClassName}
      name={name}
      onBlur={onBlur}
    />
  ))

const RadioButton = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  onBlur,
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
    </Radio >
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
  label: PropTypes.node,
  className: PropTypes.string,
  onBlur: PropTypes.func
}

export default InputRadio
