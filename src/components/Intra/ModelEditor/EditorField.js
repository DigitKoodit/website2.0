import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldLabel, FieldBody } from 'bloomer'
import Tooltip from '../../Tooltip'

const EditorField = ({
  label,
  children,
  tooltipMessage,
  isHorizontal = true,
  containerClass = '',
  labelClass = '' }) => {
  const LabelComponent = label && <span className={`has-text-grey-light has-text-weight-semibold ${labelClass}`}>
    {label}
  </span>
  return (
    <Field isHorizontal={isHorizontal} className={containerClass}>
      {label && <FieldLabel>
        {tooltipMessage
          ? <Tooltip message={tooltipMessage} className='ml-1'>
            {LabelComponent}
          </Tooltip>
          : <small>{LabelComponent}</small>
        }
      </FieldLabel>
      }
      <FieldBody>
        <Field>
          {children}
        </Field>
      </FieldBody>
    </Field>
  )
}

EditorField.propTypes = {
  label: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tooltipMessage: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  isHorizontal: PropTypes.bool
}

export default EditorField
