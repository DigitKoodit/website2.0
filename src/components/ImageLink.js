import React from 'react'
import PropTypes from 'prop-types'

const ImageLink = ({ name, link, imageUrl, target = '_blank' }) => (
  <a href={link} alt={name} target={target}>
    <img src={imageUrl} alt={name} />
  </a>
)

ImageLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired
}

export default ImageLink
