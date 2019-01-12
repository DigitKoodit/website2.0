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
  inputProps }) => {
  const { inputClassName, containerClass, labelClass, lines, readOnly, maxLength, isSize } = inputProps || {}

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}
    >
      <Control isExpanded>
        <Field
          key={label}
          component={TextInput}
          id={name}
          className={inputClassName}
          name={name}
          lines={lines}
          isActive={readOnly}
          maxLength={maxLength}
          isSize={isSize}
        />
      </Control>
    </EditorField>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object
}

const TextInput = ({
  field,
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  isTextArea,
  lines,
  readOnly,
  ...props
}) =>
  (!lines || lines === 1)
    ? <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    : <TextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      rows={lines}
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
  label: PropTypes.string,
  className: PropTypes.string
}

export default InputText
