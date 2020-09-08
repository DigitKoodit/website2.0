import React, { PureComponent, Suspense } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import isNil from 'lodash/isNil'
import { Route } from 'react-router-dom'
import Base, { baseColumnSize } from '../../components/Layout/Base'
import { Column } from 'bloomer'
import Markdown from '../../components/ContentManagement/Markdown'
import { findSitePageById } from '../../selectors/siteContentSelectors'
import { findNavItemByPath } from '../../selectors/navItemSelectors'
import { pageContentActions } from '../../actions'
import withLoader from '../../components/Helpers/withLoader'

const NotFound = React.lazy(() => import('../NotFound'))

const PageContent = ({ siteContent }) => (
  <Column className='left-gray' isSize={baseColumnSize}>
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
    content: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  })
}

const pageContentLoader = Children => {
  class Wrapped extends PureComponent {
    componentDidMount = () => this.fetchPage()
    componentDidUpdate = () => this.fetchPage()

    fetchPage = () => {
      const { sitePageId, siteContent, fetchPage, loading } = this.props
      if(sitePageId && isNil(siteContent) && !loading) {
        fetchPage(sitePageId)
      }
    }

    render() {
      const { sitePageId, loading, isExternal, externalPath } = this.props
      if(loading) {
        return null
      }

      if(isExternal && externalPath) {
        return window.location.href = externalPath
      }

      if(!sitePageId) {
        return (
          <Suspense fallback={null}>
            <Route status={NotFound} component={NotFound} />
          </Suspense>
        )
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
    const paths = ownProps.location.pathname.split('/').filter(path => !!path)

    // Split and select only last url
    const requestedPath = paths[paths.length - 1]
    const containingNavItem = findNavItemByPath(state, '/' + requestedPath)
    const { loading } = state.pages
    const requestingSubRouteWithoutParent = containingNavItem &&
      containingNavItem.parentId != null &&
      paths.length === 1
    if(requestingSubRouteWithoutParent) {
      return {
        sitePageId: null,
        siteContent: null,
        loading
      }
    }
    const sitePageId = requestedSiteId || (containingNavItem ? containingNavItem.sitePageId : null)
    const isExternal = containingNavItem ? !!containingNavItem.isRedirect : false;
    const externalPath = containingNavItem ? containingNavItem.externalPath : null;

    return {
      sitePageId,
      siteContent: sitePageId ? findSitePageById(state, sitePageId) : null,
      loading,
      isExternal,
      externalPath
    }
  }
  const mapDispatchToProps = dispatch => ({
    fetchPage: pageId => dispatch(pageContentActions.fetchPage(pageId))
  })
  return connect(mapStateToProps, mapDispatchToProps)(withLoader(Wrapped))
}

export default withRouter((pageContentLoader(DynamicPage)))
