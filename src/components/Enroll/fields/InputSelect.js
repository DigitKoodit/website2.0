
import React from 'react'
import PropTypes from 'prop-types'
import { Control, Select } from 'bloomer'
import EditorField from '../../Intra/ModelEditor/EditorField'
import { Field } from 'formik'

const InputSelect = ({
  label,
  value,
  hint,
  isHorizontal,
  name,
  inputProps
}) => {
  const { containerClass, labelClass } = inputProps || {}

  const inputs = renderSelect(name, value, inputProps)

  return (
    <EditorField
      label={label}
      tooltipMessage={hint}
      isHorizontal={isHorizontal}
      className={containerClass}
      labelClass={labelClass}
    >
      <Control>
        {inputs}
      </Control>
    </EditorField>
  )
}

InputSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  hint: PropTypes.string,
  isHorizontal: PropTypes.string,
  inputProps: PropTypes.object
}

const renderSelect = (name, input, { inputClassName }, index) => (
  <Field name={name} component={MySelect} />
)

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.form.handleChange(this.props.name, value)
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true)
  };

  render() {
    console.log(this.props)
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor='color'>Topics (select at least 3) </label>
        <Select
          id='color'
          multi
          onChange={this.handleChange}
          value={this.props.value}
        >
          <option>moi</option>
          <option>hei</option>

        </Select>
        {!!this.props.error &&
          this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
        )}
      </div>
    )
  }
}

// const Select = ({
//   field: { name, value, onChange, onBlur },
//   id,
//   label,
//   className,
//   ...props
// }) => {
//   return (
//     <Checkbox
//       name={name}
//       id={id}
//       value={value}
//       onChange={onChange}
//       onBlur={onBlur}
//       className={className}
//       {...props}
//     >
//       <label htmlFor={id}>
//         <span> {label}</span>
//       </label>
//     </Checkbox>
//   )
// }

// Select.propTypes = {
//   field: PropTypes.shape({
//     name: PropTypes.string,
//     value: PropTypes.bool,
//     onChange: PropTypes.func,
//     onBlur: PropTypes.func
//   }).isRequired,
//   id: PropTypes.string,
//   label: PropTypes.string,
//   className: PropTypes.string
// }

export default InputSelect
