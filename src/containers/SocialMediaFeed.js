import React, { Component } from 'react'
import FacebookProvider, { EmbeddedPost } from 'react-facebook'

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId='224493054874665'>
        <EmbeddedPost href='http://www.facebook.com/digitry' width='500' />
      </FacebookProvider>
    )
  }
}
