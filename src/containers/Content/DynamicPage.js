import React, { Fragment } from 'react'
import PropTypes from 'prop-types' //
import { withRouter } from 'react-router'
import isNil from 'lodash/isNil'
import fetch from 'fetch-hoc'
import { Route } from 'react-router-dom'
import Markdown from '../../components/ContentManagement/Markdown'
import { Helmet } from 'react-helmet'
import asyncComponent from '../../components/AsyncComponent'

const NotFound = asyncComponent(() => import('../NotFound'))

const PageContent = ({ siteContent }) => (
  <Fragment>
    <Helmet>
      <title>{siteContent.title}</title>
      <meta name='description' content={siteContent.description} />
    </Helmet>
    <div className='row'>
      <div className='col-xs-12' />
      <Markdown source={siteContent.content} />
    </div>
  </Fragment>
)

PageContent.propTypes = {
  siteContent: PropTypes.shape({
    content: PropTypes.string
  })
}

const DynamicPage = ({ data: siteContent }) => {
  return (
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

const pageContentLoader = Children => {
  const Wrapped = ({ location }) => {
    console.log(location)
    if(!location.state || isNil(location.state.sitePageId)) {
      return <Route status={NotFound} component={NotFound} />
    }
    const apiUrl = `/api/content/${location.state.sitePageId}`
    const FetchData = fetch(apiUrl)(Children)
    return <FetchData />
  }
  Wrapped.propTypes = {
    location: PropTypes.shape({
      state: PropTypes.object
    })
  }
  return Wrapped
}

export default withRouter(pageContentLoader(DynamicPage))
