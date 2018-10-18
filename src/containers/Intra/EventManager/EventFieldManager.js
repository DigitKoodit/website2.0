import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Columns, Column, Subtitle, Button } from 'bloomer'
import EventFieldEditor from './EventFieldEditor'
// import { INITIAL_ID } from '../../../constants'

import { eventFieldTypes } from '../../../components/Enroll/fields'

const fieldActionTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE'
}

class EventFieldManager extends Component {
  static propTypes = {
    updateFields: PropTypes.func,
    fields: PropTypes.array,
    validationErrors: PropTypes.shape({ msg: PropTypes.string })
  }

  render() {
    const { fields } = this.props
    return (
      <Fragment>
        {fields.map((field, index) =>
          <Columns key={field.name + '' + index}>
            <Column >
              <EventFieldEditor
                initialValues={field}
                onSave={updatedField => this.fieldAction(fieldActionTypes.UPDATE, updatedField)()} />
            </Column>
            <Column isSize='narrow'>
              <Button
                isColor='danger'
                isSize='small'
                onClick={this.fieldAction(fieldActionTypes.REMOVE, field)} >
                -
              </Button>
            </Column>
          </Columns>
        )}
        <FieldSelector onSelect={this.fieldAction} />
      </Fragment>
    )
  }

  fieldAction = (action, newField) => event => {
    event && event.preventDefault()
    const { fields, updateFields } = this.props
    let newFields = this.fieldActions[action](fields, newField)
    updateFields({ fields: newFields })
  }

  fieldActions = {
    ADD: (oldFields, newField) => [...oldFields, { ...newField, id: oldFields.length }],
    REMOVE: (oldFields, newField) => oldFields.filter(field => field.id !== newField.id),
    UPDATE: (oldFields, newField) => {
      const filteredFields = oldFields.filter(item => item.id !== newField.id)
      return [...filteredFields, newField]
    }
  }
}

const FieldSelector = ({ onSelect }) => {
  const { types, options, base } = eventFieldTypes
  return (
    <Fragment>
      <Subtitle isSize='6'>Valittavat kentät</Subtitle>
      {types.map(type => {
        const model = { ...base, ...options[type] }
        return <Button
          key={model.fieldName}
          isSize='small'
          onClick={onSelect(fieldActionTypes.ADD, model)}>
          {model.fieldName}
        </Button>
      })}
    </Fragment >
  )
}
FieldSelector.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default EventFieldManager
