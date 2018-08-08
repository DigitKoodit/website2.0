import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Columns } from 'bloomer'

const BaseContent = ({ htmlTitle = 'Digit ry', htmlDescription = '', children }) =>
  <Fragment>
    <Helmet>
      <title>{htmlTitle}</title>
      <meta name='description' content={htmlDescription} />
    </Helmet>
    <Columns>
      {children}
    </Columns>
  </Fragment>

BaseContent.propTypes = {
  htmlTitle: PropTypes.string,
  htmlDescription: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default BaseContent
