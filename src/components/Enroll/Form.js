import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import noop from 'lodash/noop'
import mapValues from 'lodash/mapValues'
import isNil from 'lodash/isNil'
import { Button } from 'bloomer'
import { withFormik } from 'formik'
import inputByType from './fields'
import ArrayEditor from '../Intra/ModelEditor/ArrayEditor'

const InnerForm = ({
  values,
  fields,
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  submitRenderer,
  setFieldValue,
  submitForm,
  saveOnBlur,
  buttonDisabled
}) =>
  <form className='form' onSubmit={handleSubmit}>
    {fields.map(({ type, options, name, label, defaultValue, required, readOnly, customRenderer, customOnChangeHandler, ...rest }) => {
      if(customRenderer) {
        return (
          <Fragment key={name}>
            {customRenderer({ name, label, value: values[name], values, handleChange })}
          </Fragment>)
      }
      const Input = type === 'arrayEditor' ? ArrayEditor : inputByType(type)
      return (
        <Fragment key={name}>
          <Input
            type={type}
            name={name}
            label={required ? <strong>{label}</strong> : label}
            required={required}
            onChange={event => {
              handleChange(event)
              customOnChangeHandler && customOnChangeHandler(event, setFieldValue)
            }}
            value={values[name]}
            options={options}
            readOnly={readOnly}
            setFieldValue={setFieldValue}
            inputProps={{
              inputClassName: 'editor-input-field mb-2',
              readOnly,
              onBlur: event => saveOnBlur && submitForm(),
              ...rest
            }}
          />
          {touched[name] && errors[name] && <div className='form-errors'>{errors[name]}</div>}
        </Fragment>
      )
    })}

    {submitRenderer &&
      <Button className='mt-1' type='submit' isSize='small' isColor='success' disabled={buttonDisabled || isSubmitting}>
        {isFunction(submitRenderer) ? submitRenderer() : submitRenderer}
      </Button>
    }
  </form>

InnerForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    customOnChangeHandler: PropTypes.func
  })),
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  submitForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  submitRenderer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  saveOnBlur: PropTypes.bool,
  buttonDisabled: PropTypes.bool
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
      resetForm,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    setSubmitting(true)
    const response = props.onSave(values, { resetForm })
    if(response && response.then) {
      return response.then(() => {
        setSubmitting(false)
      })
        .catch(errors => {
          console.log('err', errors)
          setSubmitting(false)
          setErrors(errors)
        })
    }
    setSubmitting(false)
  }

})(InnerForm)

const serializeForInput = value => !isNil(value) ? value : ''

Form.propTypes = {
  saveOnBlur: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array
  })),
  validate: PropTypes.func.isRequired
}

Form.defaultProps = {
  validate: noop
}

export default Form
