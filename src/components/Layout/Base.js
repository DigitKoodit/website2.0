import React from 'react'
import PropTypes from 'prop-types'
import { Section, Columns } from 'bloomer'
import { Helmet } from 'react-helmet'

const Base = ({ htmlTitle = 'Digit ry', htmlDescription = '', children }) =>
  <Section>
    <Helmet>
      <title>{htmlTitle}</title>
      <meta name='description' content={htmlDescription} />
    </Helmet>
    <Columns isCentered>
      {children}
    </Columns>
  </Section>

Base.propTypes = {
  htmlTitle: PropTypes.string,
  htmlDescription: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default Base

export const baseColumnSize = { mobile: 12, tablet: '2/3', desktop: '1/2' }
