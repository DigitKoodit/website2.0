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
  const {
    inputClassName,
    containerClass,
    labelClass,
    readOnly,
    maxLength,
    isTextarea,
    isSize,
    onBlur
  } = inputProps || {}

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
          onBlur={onBlur}
        />
      </Control>
    </EditorField>
  )
}

InputText.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  hint: PropTypes.string,
  isHorizontal: PropTypes.bool,
  inputProps: PropTypes.shape({
    containerClass: PropTypes.string,
    labelClass: PropTypes.string,
    onBlur: PropTypes.func
  }),
  onChange: PropTypes.func.isRequired
}

const TextInput = ({
  field: { name, value },
  id,
  label,
  className,
  isTextarea,
  readOnly,
  onBlur,
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
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isTextarea: PropTypes.bool,
  readOnly: PropTypes.bool
}

export default InputText
