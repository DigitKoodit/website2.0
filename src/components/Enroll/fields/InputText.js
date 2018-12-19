import React from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'
import { Control, Input, TextArea } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
// TODO: use horizontal layout
const InputText = ({ type,
  label,
  placeholder,
  value,
  onChange,
  options,
  hint,
  isHorizontal,
  ...inputAttributes }) => {
  const { containerClass, labelClass, lines, maxLength } = options || {}

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}
    >
      <Control isExpanded>
        {(isNil(lines) || lines <= 1)
          ? (
            <Input
              type={type}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
              name={label}
              {...inputAttributes}
            />)
          : (
            <TextArea
              type={type}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
              name={label}
              {...inputAttributes}
            />
          )}
      </Control>
    </EditorField>

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
  onChange: PropTypes.func,
  options: PropTypes.shape({
    containerClass: PropTypes.string,
    labelClass: PropTypes.string,
    lines: PropTypes.number
  })
}

export default InputText
