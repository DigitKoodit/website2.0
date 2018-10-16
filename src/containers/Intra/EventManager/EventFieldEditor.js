import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Form from '../../Enroll/Form'

const defaultFields = [
  { name: 'fieldName', type: 'text', label: null, defaultValue: null, readOnly: true, isSize: 'small' },
  { name: 'label', type: 'text', label: 'Nimi', defaultValue: null, isSize: 'small' },
  { name: 'name', type: 'text', label: 'Tunniste', defaultValue: null, isSize: 'small' },
  { name: 'required', type: 'checkbox', label: 'Pakollinen', defaultValue: false, isSize: 'small' },
  { name: 'public', type: 'checkbox', label: 'Näytetään lomakkeessa', defaultValue: false, isSize: 'small' },
  // { name: 'order', type: 'tex', label: 'Järjestys', defaultValue: null, isSize: 'small'},
  // { name: 'options', type: 'tex', label: 'Asetukset', defaultValue: null, isSize: 'small'},
  { name: 'maxParticipant', type: 'text', label: 'Maksimi osallistujamäärä', defaultValue: null, isSize: 'small' },
  { name: 'reserveCount', type: 'text', label: 'Kiintiö', defaultValue: null, isSize: 'small' },
  { name: 'reserveEndAt', type: 'text', label: 'Kiintiön päättymisaika', defaultValue: null, isSize: 'small' }
]

const textInputOptionFields = [
  { name: 'maxLength', type: 'text', label: 'Maksimi merkkimäärä', defaultValue: null, isSize: 'small' }
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
        fields={isTextInput ? [...defaultFields, ...textInputOptionFields] : defaultFields}
        defaultValues={initialValues || defaultValues}
        validate={values => console.log('VALIDATE', values)}
      />
    )
  }
}
