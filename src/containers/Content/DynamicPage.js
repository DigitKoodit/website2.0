import React, { Fragment } from 'react'
import PropTypes from 'prop-types' //
import { withRouter } from 'react-router'
import fetch from 'fetch-hoc'
import { Route } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
import asyncComponent from '../../components/AsyncComponent'

const AsyncNotFound = asyncComponent(() => import('../NotFound'))

const PageContent = ({ siteContent }) => (
  <Fragment>
    <Helmet>
      <title>{siteContent.title}</title>
      <meta name='description' content={siteContent.description} />
    </Helmet>
    <div className='row'>
      <div className='col-xs-12' />
      {siteContent &&
        <ReactMarkdown
          className={'markdown-area'}
          source={decodeURI(siteContent.content)}
          escapeHtml={false}
        />
      }
    </div>
  </Fragment>
)

const DynamicPage = ({ data: siteContent }) => {
  return (
    // React Components in JSX look like HTML tags
    <div className='site-container'>
      <div className='site-content'>
        {siteContent && <PageContent siteContent={siteContent} />}
      </div>
    </div >
  )
}

DynamicPage.propTypes = {
  data: PropTypes.object
}

// eslint-disable-next-line
const pageContentLoader = Children => ({ location }) => {
  if(!location.state) {
    return <Route status={AsyncNotFound} component={AsyncNotFound} />
  }
  const apiUrl = `/api/content/${location.state.sitePageId}`
  const FetchData = fetch(apiUrl)(Children)
  return <FetchData />
}

export default withRouter(pageContentLoader(DynamicPage))
