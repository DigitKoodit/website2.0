import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import { Button } from 'bloomer'

const ExternalLinkButton = ({ children, href, isColor, className, isOutlined, disabled, filename }) => (
  <Button
    isColor={isColor}
    className={className}
    isOutlined={isOutlined}
    tag='a'
    target='_blank'
    rel='noopener noreferrer'
    disabled={disabled}
    download={filename || 'download'}
    href={isFunction(href) ? href() : href} >
    {children}
  </Button >
)

ExternalLinkButton.propTypes = {
  children: PropTypes.any,
  href: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  isColor: PropTypes.string,
  className: PropTypes.string,
  isOutlined: PropTypes.bool,
  disabled: PropTypes.bool,
  filename: PropTypes.string
}

export default ExternalLinkButton
