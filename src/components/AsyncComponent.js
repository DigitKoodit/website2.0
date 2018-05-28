import React, { Component } from 'react'

const asyncComponent = importComponent => {
  class AsyncComponent extends Component {
    state = {
      component: null
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncComponent
}

export default asyncComponent
