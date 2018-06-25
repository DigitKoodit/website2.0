import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Textarea from './Textarea'

const MarkdownEditor = ({ content, handleTextChange }) => {
  const decodedContent = decodeURI(content)
  return (
    <div className='markdown-area margin-top-1'>
      <div className='row'>
        <div className='col-xs-6'>
          <p>Sisältö</p>
          <Textarea
            className='text-input'
            onTextChange={handleTextChange}
            value={decodedContent}
          />
        </div>
        <div className=' col-xs-6'>
          <p>Esikatselu</p>
          <ReactMarkdown
            className={'markdown-area'}
            source={decodedContent}
            escapeHtml={false}
          />
        </div>
      </div>
    </div>
  )
}

MarkdownEditor.propTypes = {
  content: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired
}

export default MarkdownEditor
