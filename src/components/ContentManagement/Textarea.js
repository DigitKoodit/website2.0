import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/markdown.scss'
import { Field, Control, TextArea as BTextArea } from 'bloomer'

const Textarea = ({ value, onTextChange }) => {
  // FIXME: after tab pressed the cursor moves to the end of the textarea
  // FIXME: tab breaks editor history (ctrl+z)
  const handleKeyEvent = event => {
    // change default tab behaviour
    if(event.keyCode === 9) {
      // get the position where tab was pressed and add \t in between
      const { selectionStart, selectionEnd, value } = event.target
      const startPart = value.substring(0, selectionStart)
      const endPart = value.substring(selectionEnd)
      const tabbedString = `${startPart}\t${endPart}`
      onTextChange(tabbedString)
      event.preventDefault()
    }
  }

  return (
    <Field>
      <Control>
        <BTextArea
          className='text-input margin-top-1'
          value={value}
          onChange={e => onTextChange(e.target.value)}
          onKeyDown={handleKeyEvent}
        />
      </Control>
    </Field>
  )
}

Textarea.defaultProps = {
  value: ''
}

Textarea.propTypes = {
  value: PropTypes.string,
  onTextChange: PropTypes.func.isRequired
}

export default Textarea
