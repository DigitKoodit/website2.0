import React from 'react';

const inputByType = type => {
  switch (type) {
    case 'text':
      return require('./InputText').default;
    case 'select':
      return require('./InputSelect').default;
    case 'radio':
      return require('./InputRadio').default;
    case 'check':
      return require('./InputCheck').default;
    default:
      return () => <p>Invalid input type</p>
  }
}

export default inputByType;