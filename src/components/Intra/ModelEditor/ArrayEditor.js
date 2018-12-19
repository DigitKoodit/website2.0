import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'formik'
import { Columns, Column } from 'bloomer'
import selectInput from '../../Enroll/fields/index'
import { Button } from 'bloomer/lib/elements/Button'

const defaultFields = [
  { name: 'label', type: 'text', label: 'Nimi', defaultValue: null, isSize: 'small' },
  { name: 'name', type: 'text', label: 'Tunniste', defaultValue: null, isSize: 'small' },
  { name: 'maxParticipants', type: 'text', label: 'Max osallistujamäärä', defaultValue: null, isSize: 'small' },
  { name: 'reserveCount', type: 'text', label: 'Kiintiö', defaultValue: null, isSize: 'small' },
  { name: 'isDefault', type: 'radio', label: 'Oletusvalinta', defaultValue: false, isSize: 'small' }
]

const newInitialItem = initialValues => {
  console.log(initialValues)
  const defaultModel = defaultFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }), {})
  return { ...defaultModel, ...initialValues }
}

export class ArrayEditor extends PureComponent {
  render() {
    const {
      name: arrayName,
      value: optionValues,
      onChange
    } = this.props
    console.log(optionValues)
    return (
      <div className='array-field-container'>
        <FieldArray
          name={arrayName}
          render={arrayHelpers => (
            <>
              <Columns>
                {defaultFields.map(({ name, label }) => (
                  <Column className='pb-0' key={name}>
                    {label}
                  </Column>
                ))}
                <Column isSize='narrow' />
              </Columns>
              {optionValues.map((value, index) =>
                <Columns key={index}>
                  {defaultFields.map(({ type, name, label, defaultValue, required, ...rest }) => {
                    const Input = selectInput(type)
                    const inputName = `${arrayName}[${index}].${name}`
                    const inputValue = value[name] || (defaultValue != null ? defaultValue : '')
                    console.log(value, name, value[name], inputValue)
                    return (
                      <Column key={inputName}>
                        <Input
                          className='editor-input-field'
                          type={type}
                          name={inputName}
                          required={required}
                          onChange={onChange}
                          value={inputValue}
                          {...rest}
                        />
                      </Column>
                    )
                  })}
                  <Column isSize='narrow' >
                    <Button
                      isSize='small'
                      isOutlined
                      isColor='danger'
                      onClick={() => arrayHelpers.remove(index)} >
                      -
                    </Button>

                  </Column>
                </Columns>
              )}
              <Button
                isSize='small'
                isColor='success'
                isOutlined
                onClick={() => arrayHelpers.push(newInitialItem)} >
                Lisää kenttä
              </Button>
            </>
          )} />
      </div >
    )
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }
}

export default ArrayEditor
