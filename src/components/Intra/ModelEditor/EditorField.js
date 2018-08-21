import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label } from 'bloomer'
const EditorField = ({ label, children }) => (
  <Field>
    <Label className='is-inline has-text-grey-light has-text-weight-semibold'>{label} </Label>
    {children}
  </Field>
)

EditorField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default EditorField
