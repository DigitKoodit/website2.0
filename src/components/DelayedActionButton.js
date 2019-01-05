import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { Button } from 'bloomer'

export class DelayedActionButton extends PureComponent {
  state = {
    displayTimer: false,
    seconds: null
  }
  timeout = noop
  interval = noop

  startTimer = event => {
    event.preventDefault()
    const seconds = Math.floor(this.props.timeout / 1000)
    this.setState({ displayTimer: true, seconds })

    this.interval = setInterval(() => {
      if(this.state.seconds === 0) {
        return clearInterval(this.interval)
      }
      this.setState(prevState => ({ seconds: prevState.seconds - 1 }))
    }, 1000)

    this.timeout = setTimeout(() => {
      this.setState({ displayTimer: false })
    }, this.props.timeout)
  }

  handleActionClick = event => {
    this.clear()
    this.props.onClick(event)
  }
  componentWillUnmount = () => {
    this.clear()
  }

  clear = () => {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }

  render() {
    const { isColor, onClick, confirmationMessage, children, ...rest } = this.props
    return (
      this.state.displayTimer
        ? <Button
          isColor={isColor}
          onClick={this.handleActionClick}
          isOutlined={false}
          {...rest} >
          {`${confirmationMessage} ${this.state.seconds}`}
        </Button>
        : <Button
          isColor={isColor}
          onClick={this.startTimer}
          {...rest} >
          {children}
        </Button>
    )
  }

  static propTypes = {
    timeout: PropTypes.number,
    isColor: PropTypes.string,
    confirmationMessage: PropTypes.string,
    children: PropTypes.node
  }
  static defaultProps = {
    timeout: 5000,
    isColor: 'danger',
    confirmationMessage: 'Varmista painamalle toisen kerran'
  }
}

export default DelayedActionButton
