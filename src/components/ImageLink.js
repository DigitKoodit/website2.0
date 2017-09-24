import React from 'react';

const ImageLink = ({ name, link, imageUrl }) => (
  <a href={link} alt={name}>
    <img src={imageUrl} alt={name} />
  </a>
)

export default ImageLink;