import React from 'react'
import PropTypes from 'prop-types' //
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import ReactMarkdown from 'react-markdown'
import { Content } from 'bloomer'
import '../../styles/markdown.css'

const Markdown = ({ source }) => (
  source && <Content>
    <ReactMarkdown
      className={'markdown-area'}
      source={decodeURI(source)}
      escapeHtml={false}
      renderers={{ code: CodeBlock }}
    />
  </Content>
)

// const TitleBlock = ({ level, children }) => <Title isSize={level}>{children}</Title>
// TitleBlock.propTypes = {
//   level: PropTypes.number,
//   children: PropTypes.array
// }

const CodeBlock = ({ language, value }) => {
  const canShowHighlight = Prism.languages[language] && value
  var html = canShowHighlight ? Prism.highlight(value, Prism.languages[language], language) : value
  var cls = canShowHighlight ? 'language-' + language : ''

  return (
    <pre className={cls}>
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        className={cls}
      />
    </pre>
  )
}

Markdown.propTypes = {
  source: PropTypes.string
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string
}

export default Markdown
