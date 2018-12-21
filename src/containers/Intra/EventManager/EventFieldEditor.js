import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Form from '../../../components/Enroll/Form'
import { Label } from 'bloomer'

const defaultFields = [
  {
    name: 'fieldName',
    type: 'text',
    labπel: null,
    defaultValue: null,
    readOnly: true,
    isSize: 'small',
    customRenderer: item => <Label>{item.value}</Label>
  },
  { name: 'label', type: 'text', label: 'Nimi', defaultValue: null, isSize: 'small' },
  { name: 'name', type: 'text', label: 'Tunniste', defaultValue: null, isSize: 'small' },
  { name: 'required', type: 'checkbox', label: 'Pakollinen', defaultValue: false, isSize: 'small' },
  { name: 'public', type: 'checkbox', label: 'Näytetään vastauksissa', defaultValue: false, isSize: 'small' },
  // { name: 'order', type: 'tex', label: 'Järjestys', defaultValue: null, isSize: 'small'},
  { name: 'reserveEndAt', type: 'text', label: 'Kiintiön päättymisaika', defaultValue: null, isSize: 'small' }
]

const textInputFields = [
  { name: 'maxLength', type: 'text', label: 'Maksimi merkkimäärä', defaultValue: null, isSize: 'small' },
  { name: 'maxLines', type: 'text', label: 'Maksimi rivit', defaultValue: null, isSize: 'small' }
]

const optionInputFields = [
  { name: 'value', type: 'arrayEditor', label: 'Valinnat', defaultValue: [], isSize: 'small' }
]

const defaultValues = initialValues => {
  const defaultModel = defaultFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }), {})
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
        onSave={values => Promise.resolve(onSave(values))}
        fields={isTextInput ? [...defaultFields, ...textInputFields] : [...defaultFields, ...optionInputFields]}
        defaultValues={defaultValues(initialValues)}
        validate={values => console.log('VALIDATE', values)}
      />
    )
  }
}
