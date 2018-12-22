import React from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'
import { Control, Input, TextArea } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'

const InputText = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  hint,
  isHorizontal,
  name,
  inputProps }) => {
  const { inputClassName, containerClass, labelClass, lines, maxLength } = inputProps || {}

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
              className={inputClassName || ''}
              type={type}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
              name={name}
              isActive={inputProps.readOnly}
            />)
          : (
            <TextArea
              className={inputClassName || ''}
              type={type}
              placeholder={placeholder}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
              name={name}
              isActive={inputProps.readOnly}
            />
          )}
      </Control>
    </EditorField>

  )
}

InputText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  inputProps: PropTypes.object
}

export default InputText
