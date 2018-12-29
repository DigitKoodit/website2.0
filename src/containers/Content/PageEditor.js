import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from '../../components/Form/Input'
import MarkdownEditor from '../../components/ContentManagement/MarkdownEditor'

class PageEditor extends PureComponent {
  state = { pageContent: { ...this.props.initialData } }

  handleTextChange = text => {
    this.setState(prevState => ({
      pageContent: {
        ...prevState.pageContent,
        content: text
      }
    }))
  }

  render() {
    const { pageContent, onSavePage } = this.state
    return (
      <div className='markdown-area col-xs-12'>
        <div className='row'>
          <div className='col-xs-12'>
            <p>Julkaisun nimi</p>
            <Input
              field='title'
              model={this.state.pageContent}
              onChange={this.handleTextChange} />
            <p>Kuvaus</p>
            <Input
              field='description'
              model={this.state.pageContent}
              onChange={this.handleTextChange} />
            <p>Luotu {pageContent.createdAt}</p>
            {pageContent.updatedAt && <p>Muokattu viimeksi {pageContent.updatedAt}</p>}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <MarkdownEditor
              content={pageContent.content}
              handleTextChange={this.handleTextChange}
            />
            <button onClick={onSavePage}>Tallenna</button>
          </div>
        </div>
      </div >
    )
  }
}

PageEditor.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
}

export default PageEditor
