
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Title, Column, Box } from 'bloomer'
import moment from 'moment'
import eventPropTypes from './eventPropTypes'
import { Base } from '../../components/Layout'
import { baseColumnSize } from '../../components/Layout/Base'
import eventActions from '../../actions/eventActions'
import { findEventById } from '../../selectors/eventSelectors'
import Form from '../../components/Enroll/Form'
import Markdown from '../../components/ContentManagement/Markdown'

export class EnrollEventPage extends PureComponent {
  componentDidMount = () => {
    this.props.fetchEvent(this.props.eventId)
  }

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    event: PropTypes.shape(eventPropTypes),
    push: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  navigateToEventList = () =>
    this.props.push(`/ilmo`)

  render() {
    const { event, loading } = this.props
    if(!event || loading) {
      return null
    }
    return (
      <Base >
        <Column isSize={baseColumnSize}>
          <Title className='mb-4' isSize={2}>{event.name}</Title>
          <p className='mb-4'>
            Ilmoittautumisaika<br />
            {moment(event.activeAt).format('DD.MM.YYYY HH:mm:ss')} - {moment(event.activeUntil).format('DD.MM.YYYY HH:mm:ss')}
          </p>
          <Markdown source={event.description} />
          <Box className='p-3 pt-5 top-blue'>
            <Title isSize={4} className='highlight-left-dark-blue'>
              Ilmoittaudu
            </Title>
            <Form
              fields={event.fields}
              defaultValues={defaultValues(event.fields)}
              submitRenderer='Tallenna'
              onSave={values => {
                console.log(values, defaultValues(event.fields))
                return Promise.resolve()
              }} />
          </Box>
          <Box className='top-red' >
            <Title isSize={4} className='highlight-left-red'>
              Osallistujat
            </Title>
          </Box>
        </Column>
      </Base >
    )
  }
}

const findDefaultForCheckboxes = options =>
  options.reduce((optionAcc, option) => ({ ...optionAcc, [option.name]: !!option.isDefault }), {})

const findDefaultForRadio = options => {
  const option = options.find(option => option.isDefault)
  return option
    ? option.name
    : null
}

const defaultValues = (fields, initialValues = {}) => {
  console.log(fields)
  const defaultModel = fields.reduce((acc, field, index) => {
    const initialValue = Array.isArray(field.options)
      ? field.type === 'checkbox'
        ? findDefaultForCheckboxes(field.options)
        : findDefaultForRadio(field.options)
      : ''
    console.log(initialValue, field.name)
    return ({ ...acc, id: index, values: { ...acc.values, [field.name]: initialValue } })
  }, {})

  console.log(defaultModel, initialValues)
  return { ...defaultModel, ...initialValues }
}

const mapStateToProps = (state, { eventId }) => ({
  event: findEventById(state, eventId),
  loading: state.events.loading
})

const mapDispatchToProps = (dispatch) => ({
  push: () => dispatch(push()),
  fetchEvent: eventId => dispatch(eventActions.fetchEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollEventPage)
