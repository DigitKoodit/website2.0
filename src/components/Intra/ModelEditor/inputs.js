import React from 'react'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import { Input, Checkbox } from 'bloomer'

const EditorInputPropType = {
  model: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
}

const EditorInput = ({ model, field, onChange, disabled, isSize = 'small', className = 'is-inline', type = 'text' }) => (
  <Input
    isSize={isSize}
    className={className}
    name={field}
    type={type}
    disabled={disabled}
    value={!isNil(model[field]) ? model[field] : ''}
    onChange={onChange} />
)

EditorInput.propTypes = {
  ...EditorInputPropType,
  isSize: PropTypes.string
}

const EditorCheckbox = ({ model, field, onChange, disabled, className = 'is-inline', type = 'checkbox' }) => (
  <Checkbox
    className={className}
    name={field}
    type={type}
    disabled={disabled}
    value={!isNil(model[field]) ? model[field] : ''}
    onChange={onChange} />
)

EditorCheckbox.propTypes = EditorInputPropType

export {
  EditorInput,
  EditorCheckbox
}
