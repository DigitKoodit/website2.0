
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Title, Column, Box, Icon } from 'bloomer'
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
import { findEventEnrollsByEventId, splitNormalAndSpare } from '../../selectors/eventEnrollSelectors'
import { Subtitle } from 'bloomer/lib/elements/Subtitle'

const EventStatus = ({ event }) =>
  moment().isBetween(event.activeAt, event.activeUntil)
    ? <>
      <Icon className='fa fa-calendar' aria-hidden='true' />&nbsp;
      <span className='is-inline-block'>
        <small><b>Ilmoittautuminen auki</b></small> <br />
        Ilmoittautumisaika päättyy {moment(event.activeUntil).format('DD.MM.YYYY HH:mm:ss')}
      </span>
      {event.reservedUntil &&
        <span className='mt-1 is-block'>
          <Icon className='fa fa-users' aria-hidden='true' /> Varasijat aukeavat {moment(event.activeUntil).format('DD.MM.YYYY HH:mm:ss')}
        </span>
      }
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
    eventEnrolls: PropTypes.array,
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
              onSave={(values, { resetForm }) =>
                this.props.addEventEnroll(values, event.id)
                  .then(() => resetForm())
              } />
          </Box>
          <Box className='top-red' >
            <Title isSize={4} className='highlight-left-red'>
              Osallistujat
            </Title>
            {eventEnrolls[0] &&
              <ParticipantList
                fields={event.fields}
                answers={eventEnrolls[0]}
                sort={answers => answers}
                publicOnly
              />}
            <Subtitle isSize={5}>
              Varasijoilla
            </Subtitle>
            {eventEnrolls[1] &&
              <ParticipantList
                fields={event.fields}
                answers={eventEnrolls[1]}
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
  eventEnrolls: splitNormalAndSpare(state, eventId),
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
