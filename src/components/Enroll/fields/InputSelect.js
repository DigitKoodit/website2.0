
import React from 'react'
import PropTypes from 'prop-types'
import { Control, Select } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
import { Field } from 'formik'

const InputSelect = ({
  label,
  name,
  options,
  hint,
  isHorizontal,
  inputProps
}) => {
  const { containerClass, labelClass } = inputProps || {}

  const inputs = renderSelect(options, name)

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

InputSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object
}

const renderSelect = (options, name) => (
  <Field id={name} name={name} component='select' className='select' >
    {options.map(option =>
      <option key={option.name} value={option.name}>{option.label}</option>
    )}
  </Field>
)

export default InputSelect
