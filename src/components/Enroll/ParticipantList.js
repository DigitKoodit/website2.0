import React from 'react'
import PropTypes from 'prop-types'
import { eventOptionPropTypes } from '../../containers/Enroll/eventPropTypes'
import { Table } from 'bloomer'

const renderHeaderItems = fields =>
  <tr>
    {fields.map(field => <td key={field.name}>{field.label}</td>)}
  </tr>

const renderAnswers = (fields, answers) =>
  answers.map(answer =>
    <tr key={answer.id}>
      {fields.map(field => <td key={field.name}>
        {renderAnswer(field.type, answer.values[field.name])}
      </td>)}
    </tr>)

const renderAnswer = (type, value) => {
  if(value == null) {
    return null
  }
  if(type === 'text') {
    return value
  } else if(type === 'radio') {
    return value ? 'X' : '0'
  } else if(type === 'checkbox') {
    return Object.entries(value).map(([key, value]) => value && <span key={key}>{key}: <b>{'X'}</b></span>)
  } else if(type === 'select') {
    // Select allows only one item
    return Object.values(value)
  }
  return null
}
const ParticipantList = ({ fields = [], answers, sort, publicOnly }) => {
  const visibleFields = publicOnly ? fields.filter(field => field.public) : fields
  return <Table isFullWidth >
    <thead>
      {renderHeaderItems(visibleFields)}
    </thead>
    <tbody>
      {renderAnswers(visibleFields, sort(answers))}
    </tbody>
  </Table>
}

ParticipantList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fields: PropTypes.arrayOf(eventOptionPropTypes),
  sort: PropTypes.func.isRequired,
  publicOnly: PropTypes.bool
}

export default ParticipantList
