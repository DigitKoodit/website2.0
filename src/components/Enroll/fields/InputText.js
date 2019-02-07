import React from 'react'
import PropTypes from 'prop-types'
import { Control, Input, TextArea } from 'bloomer'
import { Field } from 'formik'
import EditorField from '../../Intra/ModelEditor/EditorField'

const InputText = ({
  label,
  hint,
  isHorizontal,
  name,
  inputProps,
  onChange }) => {
  const { inputClassName, containerClass, labelClass, readOnly, maxLength, isTextarea, isSize } = inputProps || {}

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass} >
      <Control>
        <Field
          key={label}
          component={TextInput}
          id={name}
          className={inputClassName}
          name={name}
          isActive={readOnly}
          maxLength={maxLength}
          isSize={isSize}
          onChange={onChange}
          isTextarea={isTextarea}
        />
      </Control>
    </EditorField>
  )
}

InputText.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

const TextInput = ({
  field,
  field: { name, value, onBlur },
  id,
  label,
  className,
  isTextarea,
  readOnly,
  onChange,
  ...props
}) =>
  !isTextarea
    ? <Input
      id={id}
      name={name}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    : <TextArea
      id={id}
      name={name}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />

TextInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  id: PropTypes.string,
  label: PropTypes.node,
  className: PropTypes.string
}

export default InputText
