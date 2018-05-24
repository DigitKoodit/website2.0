import React from 'react'
import PropTypes from 'prop-types'

const ImageLink = ({ name, link, imageUrl }) => (
  <a href={link} alt={name}>
    <img src={imageUrl} alt={name} />
  </a>
)

ImageLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}

export default ImageLink
