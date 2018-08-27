import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import isNil from 'lodash/isNil'
import { Route } from 'react-router-dom'
import Base, { baseColumnSize } from '../../components/Layout/Base'
import { Column } from 'bloomer'
import asyncComponent from '../../components/AsyncComponent'
import Markdown from '../../components/ContentManagement/Markdown'
import { findSitePageById, findSiteNavigationByPath } from '../../selectors/siteContentSelectors'
import { pageContentActions } from '../../actions'
import withLoader from '../../components/Helpers/withLoader'

const NotFound = asyncComponent(() => import('../NotFound'))

const PageContent = ({ siteContent }) => (
  <Column isSize={baseColumnSize}>
    <Markdown source={siteContent.content} />
  </Column>
)

PageContent.propTypes = {
  siteContent: PropTypes.shape({
    content: PropTypes.string
  })
}

const DynamicPage = ({ siteContent = {} }) => {
  return <Base
    htmlTitle={siteContent.title}
    htmlDescription={siteContent.description} >
    {siteContent.content ? <PageContent siteContent={siteContent} /> : null}
  </Base >
}

DynamicPage.propTypes = {
  siteContent: PropTypes.shape({
    content: PropTypes.string
  })
}

const pageContentLoader = Children => {
  class Wrapped extends PureComponent {
    componentDidMount = () => this.fetchPage()
    componentDidUpdate = () => this.fetchPage()

    fetchPage = () => {
      const { sitePageId, siteContent, fetchPage, loading } = this.props
      if(isNil(siteContent) && !loading) {
        fetchPage(sitePageId)
      }
    }

    render() {
      const { sitePageId, loading } = this.props
      if(loading) {
        return null
      }
      if(!sitePageId) {
        return <Route status={NotFound} component={NotFound} />
      }
      return <Children {...this.props} />
    }
  }
  Wrapped.propTypes = {
    sitePageId: PropTypes.number,
    siteContent: PropTypes.shape({
      content: PropTypes.string
    }),
    fetchPage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }
  const mapStateToProps = (state, ownProps) => {
    const requestedSiteId = ownProps.location.state ? ownProps.location.state.sitePageId : null
    const requestedPath = ownProps.location.pathname
    const containingNavItem = findSiteNavigationByPath(state, requestedPath)
    const sitePageId = requestedSiteId || (containingNavItem ? containingNavItem.sitePageId : null)
    const { loading } = state.pages
    return {
      sitePageId,
      siteContent: sitePageId ? findSitePageById(state, sitePageId) : null,
      loading
    }
  }
  const mapDispatchToProps = dispatch => ({
    fetchPage: pageId => dispatch(pageContentActions.fetchPage(pageId))
  })
  return connect(mapStateToProps, mapDispatchToProps)(withLoader(Wrapped))
}

export default withRouter((pageContentLoader(DynamicPage)))
