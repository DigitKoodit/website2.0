import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

const withLoader = (LoadingComponent, loaderDelay = 500) =>
  class LoaderHoc extends Component {
    state = {
      willStartLoading: false,
      isLoading: false
    }

    showLoader = () => {
      // precaution if component is not mounted anymore
      if(this.state.willStartLoading) {
        this.setState(prevState => ({
          isLoading: this.state.willStartLoading
        }))
      }
      this.props.showLoader()
    }

    hideLoader = () => {
      this.setState({
        willStartLoading: false,
        isLoading: false
      })
    }

    startLoadDelay = loading => {
      if(loading) {
        this.setState({
          willStartLoading: true
        })
        setTimeout(() => {
          this.showLoader()
        }, loaderDelay)
      } else {
        this.hideLoader()
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.loading !== this.props.loading) {
        this.startLoadDelay(this.props.loading)
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
      return (
        <LoadingComponent {...this.props} isLoading={this.state.isLoading} />
      )
    }
  }

export default withLoader
