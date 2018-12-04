import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldLabel, FieldBody } from 'bloomer'
import Tooltip from '../../Tooltip'

const EditorField = ({ label, children, tooltipMessage }) => {
  const LabelComponent = <span className='has-text-grey-light has-text-weight-semibold'>
    {label}
  </span>
  return (
    <Field isHorizontal>
      <FieldLabel>
        {tooltipMessage
          ? <Tooltip message={tooltipMessage} className='ml-1'>
            {LabelComponent}
          </Tooltip>
          : LabelComponent
        }
      </FieldLabel>
      <FieldBody>
        <Field>
          {children}
        </Field>
      </FieldBody>
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
