
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
import eventEnrollActions from '../../actions/eventEnrollActions'
import { findEventById } from '../../selectors/eventSelectors'
import Form from '../../components/Enroll/Form'
import Markdown from '../../components/ContentManagement/Markdown'
import ParticipantList from '../../components/Enroll/ParticipantList'
import { findEventEnrollsByEventId } from '../../selectors/eventEnrollSelectors'

const EventStatus = ({ event }) =>
  moment().isBetween(event.activeAt, event.activeUntil)
    ? <>
      <i className='fa fa-calendar-check has-text-success' aria-hidden='true' /> Ilmoittautuminen auki <br />
      Päättyy {moment(event.activeUntil).format('DD.MM.YYYY HH:mm:ss')}
    </>
    : <>
      <i className='fa fa-calendar-times has-text-danger' aria-hidden='true' /> Ilmoittautumisaika<br />
      {moment(event.activeAt).format('DD.MM.YYYY HH:mm:ss')} - {moment(event.activeUntil).format('DD.MM.YYYY HH:mm:ss')}
    </>

export class EnrollEventPage extends PureComponent {
  componentDidMount = () => {
    this.props.fetchEvent(this.props.eventId)
    this.props.fetchEventEnrolls(this.props.eventId)
  }

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    fetchEventEnrolls: PropTypes.func.isRequired,
    addEventEnroll: PropTypes.func.isRequired,
    event: eventPropTypes,
    push: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  navigateToEventList = () =>
    this.props.push(`/ilmo`)

  render() {
    const { event, loading, eventEnrolls } = this.props
    if(!event || loading) {
      return null
    }
    return (
      <Base >
        <Column isSize={baseColumnSize}>
          <Title className='mb-4' isSize={2}>{event.name}</Title>
          <p className='mb-4'>
            <EventStatus event={event} />
          </p>
          <Markdown source={event.description} />
          <Box className='p-3 pt-5 top-blue'>
            <Title isSize={4} className='highlight-left-dark-blue'>
              Ilmoittaudu
            </Title>
            <Form
              fields={event.fields.map(field => ({ ...field, name: `values[${field.name}]` }))}
              defaultValues={defaultValues(event.fields)}
              submitRenderer='Tallenna'
              onSave={values =>
                this.props.addEventEnroll(values, event.id)
              } />
          </Box>
          <Box className='top-red' >
            <Title isSize={4} className='highlight-left-red'>
              Osallistujat
            </Title>
            {eventEnrolls &&
              <ParticipantList
                fields={event.fields}
                answers={eventEnrolls}
                sort={answers => answers}
                publicOnly
              />
            }
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
  const defaultModel = fields.reduce((acc, field, index) => {
    const initialValue = Array.isArray(field.options)
      ? field.type === 'checkbox'
        ? findDefaultForCheckboxes(field.options)
        : findDefaultForRadio(field.options)
      : ''
    return ({ ...acc, id: index, values: { ...acc.values, [field.name]: initialValue } })
  }, {})
  return { ...defaultModel, ...initialValues }
}

const mapStateToProps = (state, { eventId }) => ({
  event: findEventById(state, eventId),
  eventEnrolls: findEventEnrollsByEventId(state, eventId),
  loading: state.events.loading
})

const mapDispatchToProps = (dispatch) => ({
  push: () => dispatch(push()),
  fetchEvent: eventId => dispatch(eventActions.fetchEvent(eventId)),
  fetchEventEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId)),
  addEventEnroll: (data, eventId) => new Promise((resolve, reject) => {
    dispatch(eventEnrollActions.addEventEnroll(data, eventId, { resolve, reject }))
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollEventPage)
