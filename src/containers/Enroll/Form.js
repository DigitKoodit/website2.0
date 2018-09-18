import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import noop from 'lodash/noop'
import mapValues from 'lodash/mapValues'
import isNil from 'lodash/isNil'
import { withFormik } from 'formik'
import selectInput from '../../components/enroll/fields'

const InnerForm = ({
  values,
  fields,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  submitRenderer = 'Submit'
}) =>
  <form className='form' onSubmit={handleSubmit}>
    {fields.map(({ type = 'text', name, label, defaultValue, required, ...rest }) => {
      const Input = selectInput(type)
      return (
        <Fragment key={name}>
          {label ? <span className='form-label'>{label}</span> : null}
          <Input
            className='form-input'
            type={type}
            name={name}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            {...rest}
          />
          {touched[name] && errors[name] && <div className='form-errors'>{errors[name]}</div>}
        </Fragment>
      )
    })}
    <button type='submit' disabled={isSubmitting}>
      {isFunction(submitRenderer) ? submitRenderer() : submitRenderer}
    </button>
  </form>

InnerForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  })).isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  submitRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}
// Wrap our form with the using withFormik HoC
const Form = withFormik({
  mapPropsToValues: props => mapValues(props.defaultValues, value => !isNil(value) ? value : ''),
  validate: (values, props) => {
    const errors = props.validate(values)
    return errors
  },
  handleSubmit: (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    props.onSave(values)
      .then(() => setSubmitting(false))
      .catch(errors => setErrors(errors))
  }
})(InnerForm)

Form.propTypes = {
  onSave: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  })),
  validate: PropTypes.func.isRequired
}

Form.defaultProps = {
  validate: noop
}

export default Form
