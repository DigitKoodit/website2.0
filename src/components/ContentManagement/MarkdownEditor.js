import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Column, Columns } from 'bloomer'
import Markdown from '../../components/ContentManagement/Markdown'
import Textarea from './Textarea'
import FileChooser from '../../containers/Intra/FileManager/FileChooser'

// TODO: add validation errors
export class MarkdownEditor extends PureComponent {
  chooserRef = React.createRef()

  render() {
    const { content, handleTextChange } = this.props
    const decodedContent = decodeURI(content)
    return (
      <div className='markdown-area margin-top-1'>
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: 'full', default: '1/2' }}>
            <Textarea
              onTextChange={this.handleChangeWithEncoding}
              value={decodedContent}
            />
            <div className='py-3'>
              <FileChooser
                onSelect={file => handleTextChange(`${decodedContent}
                
<img src='/${file.path}' alt='${file.filename}'/>
<a target='noopener noreferrer' href='/${file.path}'>Liite</a>`
                )} />
            </div>
          </Column>
          <Column className='markdown-preview scroll' isSize={{ mobile: 'full', tablet: 'full', default: '1/2' }}>
            <Markdown source={content} />
          </Column>
        </Columns>
      </div>
    )
  }
  handleChangeWithEncoding = text => this.props.handleTextChange(encodeURI(text))
}

MarkdownEditor.propTypes = {
  content: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired
}

export default MarkdownEditor
