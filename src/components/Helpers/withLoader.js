import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

const withLoader = (LoadingComponent, loaderDelay = 500) =>
  class LoaderHoc extends Component {
    state = {
      willStartLoading: false,
      loading: this.props.loading
    }
    loadTimeout = noop

    componentDidUpdate(prevProps) {
      if(prevProps.loading !== this.props.loading) {
        this.startLoadDelay(this.props.loading)
      }
    }
    componentWillUnmount() {
      clearTimeout(this.loadTimeout)
    }

    showLoader = () => {
      // precaution if component is not mounted anymore
      if(this.state.willStartLoading) {
        this.setState({
          loading: this.state.willStartLoading
        })
      }
      this.props.showLoader()
    }

    hideLoader = () => {
      this.setState({
        willStartLoading: false,
        loading: false
      })
      clearTimeout(this.loadTimeout)
    }

    startLoadDelay = loading => {
      if(loading) {
        this.setState({
          willStartLoading: true
        })
        this.loadTimeout = setTimeout(() => {
          this.showLoader()
        }, loaderDelay)
      } else {
        this.hideLoader()
      }
    }

    static propTypes = {
      loading: PropTypes.bool.isRequired,
      showLoader: PropTypes.func
    }
    static defaultProps = {
      showLoader: noop
    }

    render() {
      const { loading, ...rest } = this.props
      return (
        <LoadingComponent {...rest} loading={this.state.loading} />
      )
    }
  }

export default withLoader
