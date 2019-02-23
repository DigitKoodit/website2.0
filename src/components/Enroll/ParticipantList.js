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
        {renderAnswer(field.type, answer.values[field.name], field.options)}
      </td>)}
    </tr>)

const getOptionLabel = (options, name) => {
  const option = options.find(option => option.name === name)
  return option ? option.label : 'Ei vastausta'
}
const renderAnswer = (type, value, options) => {
  if(value == null) {
    return null
  }
  if(type === 'text') {
    return value
  } else if(type === 'radio' || type === 'select') {
    return getOptionLabel(options, value)
  } else if(type === 'checkbox') {
    const checkedValues = Object.entries(value)
    return checkedValues.map(([key, value], index) => value &&
      <span key={key}>
        {getOptionLabel(options, key)}{index !== checkedValues.length - 1 ? ', ' : ''}
      </span>)
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
