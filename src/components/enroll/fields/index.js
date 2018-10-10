import React from 'react'
import * as eventFieldTypes from './eventFieldTypes'

const inputByType = type => {
  switch(type) {
    case 'text':
      return require('./InputText').default
    case 'number':
      return require('./InputText').default
    case 'select':
      return require('./InputSelect').default
    case 'radio':
      return require('./InputRadio').default
    case 'checkbox':
      return require('./InputCheck').default
    default:
      return () => <p>Kenttää ei ole olemassa</p>
  }
}

export default inputByType
export {
  eventFieldTypes
}
