import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      model: { ...props.model },
      isDirty: false
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(!prevState.model.id && nextProps.model.id) {
      return { model: nextProps.model }
    }
    return null
  }

  handleChange = data => {
    const model = { ...this.state.model, ...data }
    this.setState({ model, isDirty: true })
  }

  changeField = (fieldName, value) => {
    this.handleChange({ [fieldName]: value })
  }

  onSubmit = event => {
    event.preventDefault()
    const { handleSubmit } = this.props
    this.setState({ isDirty: false })
    handleSubmit(this.state.model)
  }

  render() {
    const inputProps = {
      validationErrors: this.props.validationErrors,
      model: this.state.model,
      onChange: this.handleChange
    }

    return (
      <form onSubmit={this.onSubmit} className='form' >
        {this.props.children(inputProps)}
      </form>
    )
  }
}

Form.propTypes = {
  model: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  validationErrors: PropTypes.object
}

Form.defaultProps = {
  validationErrors: {}
}

export default Form
