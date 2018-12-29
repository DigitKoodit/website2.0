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
              onTextChange={handleTextChange}
              value={decodedContent}
            />

            <FileChooser
              onSelect={data => handleTextChange(`${decodedContent}
                
<img src='/${data.path}' alt=${data.filename}/>
<a target='noopener noreferrer' href='/${data.path}' alt=${data.filename}>Liite</a>`
              )} />
          </Column>
          <Column isSize={{ mobile: 'full', tablet: 'full', default: '1/2' }}>
            <Markdown source={decodedContent} />
          </Column>
        </Columns>
      </div>
    )
  }
}

MarkdownEditor.propTypes = {
  content: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired
}

export default MarkdownEditor
