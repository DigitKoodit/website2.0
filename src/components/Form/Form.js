import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      model: { ...props.model },
      validationErrors: {},
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

    this.setState({ validationErrors: {}, isDirty: false })
    return handleSubmit(this.state.model)
      .then(data => {
        if(!data) {
          return null
        }
        this.setState({ model: data, isDirty: false })
        return data
      }).catch(err => {
        this.setState({ isDirty: true })
        return err.response.json()
          .then(jsonError => {
            if(err.response.status === 400) {
              const errors = jsonError.validationErrors.reduce((acc, error) => {
                acc[error.param] = error
                return acc
              }, {})
              return this.setState({ validationErrors: errors })
            } else {
              return this.setState({ error: jsonError })
            }
          })
      })
  }

  render() {
    const inputProps = {
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
  handleSubmit: PropTypes.func.isRequired
}

export default Form
