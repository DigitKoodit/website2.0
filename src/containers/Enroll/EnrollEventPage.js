import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from '../../components/Enroll/Form'

const defaultFields = [
  { name: 'firstName', type: 'text', placeholder: 'Etunimi', defaultValue: null },
  { name: 'lastname', type: 'text', placeholder: 'Sukunimi', defaultValue: null },
  { name: 'organization', type: 'text', placeholder: 'Ainejärjestö', defaultValue: null },
  { name: 'studentYears', type: 'number', placeholder: 'Opiskeluvuosi', defaultValue: null }
]

const defaultValues = defaultFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue }), {})

export class EnrollEventPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Form
          fields={defaultFields}
          defaultValues={defaultValues}
          onSave={values => {
            return Promise.resolve()
          }}
        />
      </div>
    )
  }
}

export default EnrollEventPage
