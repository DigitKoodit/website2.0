import React from 'react'
import PropTypes from 'prop-types' //
import { withRouter } from 'react-router'
import isNil from 'lodash/isNil'
import fetch from 'fetch-hoc'
import { Route } from 'react-router-dom'
import Base, { baseColumnSize } from '../../components/Layout/Base'
import { Column } from 'bloomer'
import asyncComponent from '../../components/AsyncComponent'
import Markdown from '../../components/ContentManagement/Markdown'

const NotFound = asyncComponent(() => import('../NotFound'))

const PageContent = ({ siteContent }) => (
  <Base
    htmlTitle={siteContent.title}
    htmlDescription={siteContent.description} >
    <Column isSize={baseColumnSize}>
      <Markdown source={siteContent.content} />
    </Column>
  </Base>
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
