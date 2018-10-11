import React from 'react'
import PropTypes from 'prop-types'
import { Field, Label } from 'bloomer'
import Tooltip from '../../Tooltip'

const EditorField = ({ label, children, tooltipMessage }) => {
  const LabelComponent = <Label className='is-inline has-text-grey-light has-text-weight-semibold'>{label} </Label>
  return (
    <Field>
      {tooltipMessage
        ? <Tooltip message={tooltipMessage}>
          {LabelComponent}
        </Tooltip>
        : LabelComponent
      }
      {children}
    </Field>
  )
}

EditorField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tooltipMessage: PropTypes.string
}

export default EditorField
