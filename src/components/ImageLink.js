import React from 'react'
import PropTypes from 'prop-types'

// Set rel value to prevent reverse tabnabbing https://github.com/asciidoctor/asciidoctor/issues/2071
const ImageLink = ({ name, link, imageUrl, maxHeight, className, target = '_blank' }) => (
  <a href={link} alt={name} target={target} rel={target === '_blank' ? 'noopener noreferrer' : ''}>
    <img className={className} style={{ maxHeight: maxHeight && `${maxHeight}px` }} src={imageUrl} alt={name} />
  </a>
)

ImageLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  target: PropTypes.string,
  maxHeight: PropTypes.number,
  className: PropTypes.string
}

export default ImageLink
