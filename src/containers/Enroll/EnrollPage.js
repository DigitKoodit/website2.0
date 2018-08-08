import React from 'react'
import Form from './Form'

const defaultFields = [
  { name: 'firstName', type: 'text', placeholder: 'Etunimi', defaultValue: null },
  { name: 'lastname', type: 'text', placeholder: 'Sukunimi', defaultValue: null },
  { name: 'organization', type: 'text', placeholder: 'Ainejärjestö', defaultValue: null },
  { name: 'studentYears', type: 'number', placeholder: 'Opiskeluvuosi', defaultValue: null }
]

const defaultValues = defaultFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }), {})

const EnrollPage = () =>
  <Form
    fields={defaultFields}
    defaultValues={defaultValues}
    onSave={values => {
      return Promise.resolve()
    }}
  />

export default EnrollPage
