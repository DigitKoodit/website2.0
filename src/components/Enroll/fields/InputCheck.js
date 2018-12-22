import React from 'react'
import PropTypes from 'prop-types'
import { Control, Checkbox as BCheckbox } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'

const InputCheck = ({ type,
  label,
  placeholder,
  value,
  onChange,
  options,
  hint,
  isHorizontal,
  ...inputAttributes }) => {
  const { containerClass, labelClass } = options || {}
  delete inputAttributes.setFieldValue
  const inputs = Array.isArray(value)
    ? value.map((input, i) => renderCheckbox(input, onChange, inputAttributes))
    : renderCheckbox(value, onChange, inputAttributes)
  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}
    >
      {inputs}
    </EditorField >
  )
}

const renderCheckbox = (input, onChange, { className }) => (
  <Control key={input.name}>
    <BCheckbox
      type='checkbox'
      className={className}
      name={input.name}
      checked={input.value}
      onChange={onChange}>
      {input.label}
    </BCheckbox>
    {input.name}
  </Control>
)

InputCheck.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  labelProps: PropTypes.string,
  hint: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  isHorizontal: PropTypes.bool,
  options: PropTypes.shape({
    containerClass: PropTypes.string,
    labelClass: PropTypes.string
  })
}

export default InputCheck
