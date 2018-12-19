import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import noop from 'lodash/noop'
import mapValues from 'lodash/mapValues'
import isNil from 'lodash/isNil'
import { Button } from 'bloomer'
import { withFormik } from 'formik'
import selectInput from './fields'
import ArrayEditor from '../Intra/ModelEditor/ArrayEditor'

const InnerForm = ({
  values,
  fields,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  submitRenderer
}) =>
  <form className='form' onSubmit={handleSubmit}>
    {fields.map(({ type, name, label, defaultValue, required, readOnly, customRenderer, ...rest }, index) => {
      if(customRenderer) {
        return (
          <Fragment key={name}>
            {customRenderer({ name, label, value: values[name], values, handleChange })}
          </Fragment>)
      }
      const Input = type === 'arrayEditor' ? ArrayEditor : selectInput(type)
      return (
        <Fragment key={name}>
          <Input
            className='editor-input-field mb-3'
            type={type}
            name={name}
            label={label}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            readOnly={readOnly}
            {...rest}
          />
          {touched[name] && errors[name] && <div className='form-errors'>{errors[name]}</div>}
        </Fragment>
      )
    })}

    {submitRenderer &&
      <Button className='mt-1' type='submit' isSize='small' isColor='success' disabled={isSubmitting}>
        {isFunction(submitRenderer) ? submitRenderer() : submitRenderer}
      </Button>
    }
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
  mapPropsToValues: props => mapValues(props.defaultValues, value =>
    Array.isArray(value)
      ? value.map(serializeForInput)
      : serializeForInput(value)),
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

const serializeForInput = value => !isNil(value) ? value : ''

Form.propTypes = {
  onSave: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.object
  })),
  validate: PropTypes.func.isRequired
}

Form.defaultProps = {
  validate: noop
}

export default Form
