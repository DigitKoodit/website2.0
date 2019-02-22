import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Form from '../../../components/Enroll/Form'
import { Label } from 'bloomer'
import { HAZARDOUS_INPUT_CHAR_REGEX } from '../../../constants'

const defaultFields = [
  {
    name: 'fieldName',
    type: 'text',
    label: null,
    defaultValue: null,
    readOnly: true,
    isSize: 'small',
    customRenderer: item => <Label>{item.value}</Label>
  },
  {
    name: 'label',
    type: 'text',
    label: 'Nimi',
    defaultValue: null,
    isSize: 'small',
    customOnChangeHandler: (event, setFieldValue) => {
      const nameValue = event.target.value.replace(HAZARDOUS_INPUT_CHAR_REGEX, '-').toLowerCase()
      setFieldValue('name', nameValue)
    }
  },
  { name: 'name', type: 'text', label: 'Tunniste', defaultValue: null, isSize: 'small' },
  { name: 'required', type: 'checkbox', label: 'Pakollinen', defaultValue: false, isSize: 'small' },
  { name: 'public', type: 'checkbox', label: 'Näytetään vastauksissa', defaultValue: false, isSize: 'small' }
]

const textInputFields = [
  { name: 'maxLength', type: 'text', label: 'Maksimi merkkimäärä', defaultValue: null, isSize: 'small' },
  { name: 'isTextarea', type: 'checkbox', label: 'Monirivinen', defaultValue: false, isSize: 'small' }
]

const optionInputFields = [
  { name: 'options', type: 'arrayEditor', label: 'Valinnat', defaultValue: [], isSize: 'small' }
]

const defaultValues = initialValues => {
  const defaultModel = defaultFields.reduce((acc, field, index) => ({ ...acc, id: index, [field.name]: field.defaultValue }), {})
  return { ...defaultModel, ...initialValues }
}

export default class EventFieldEditor extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    onSave: PropTypes.func
  }

  render() {
    const { onSave, initialValues } = this.props
    const isTextInput = initialValues.type === 'text'
    return (
      <Form
        saveOnBlur
        onSave={values =>
          console.log(values) ||
          Promise.resolve(onSave(values))}
        fields={isTextInput ? [...defaultFields, ...textInputFields] : [...defaultFields, ...optionInputFields]}
        defaultValues={defaultValues(initialValues)}
      />
    )
  }
}
