import React, { Fragment } from 'react'
import isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import { Input, Checkbox, Help } from 'bloomer'

const EditorInputPropType = {
  model: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  validationErrors: PropTypes.shape({ msg: PropTypes.string })
}

const EditorInput = ({ model, field, onChange, disabled, validationErrors = {}, isSize = 'small', className = '', type = 'text' }) => {
  const composedClassName = `editor-input-field ${className}`
  return (
    <Fragment>
      <Input
        isSize={isSize}
        className={composedClassName}
        name={field}
        type={type}
        disabled={disabled}
        value={!isNil(model[field]) ? model[field] : ''}
        isColor={validationErrors[field] ? 'danger' : ''}
        onChange={onChange} />
      {validationErrors[field] && <Help isColor='danger'>{validationErrors[field].msg}</Help>}
    </Fragment>
  )
}

EditorInput.propTypes = {
  ...EditorInputPropType,
  isSize: PropTypes.string
}

const EditorCheckbox = ({ model, field, onChange, disabled, validationErrors = {}, className = 'is-inline', type = 'checkbox' }) => {
  const composedClassName = `editor-input-field ${className}`
  return (
    <Fragment>
      <Checkbox
        className={composedClassName}
        name={field}
        type={type}
        disabled={disabled}
        checked={!isNil(model[field]) && model[field]}
        onChange={onChange} />
      {validationErrors[field] && <Help isColor='danger'>{validationErrors[field].msg}</Help>}
    </Fragment>
  )
}

EditorCheckbox.propTypes = EditorInputPropType

export {
  EditorInput,
  EditorCheckbox
}
