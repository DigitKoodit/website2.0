
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
import { splitNormalAndSpare } from '../../selectors/eventEnrollSelectors'

const EventStatus = ({ event }) =>
  moment().isBetween(event.activeAt, event.activeUntil)
    ? <>
      <Icon className='fa fa-calendar' aria-hidden='true' />&nbsp;
      <span className='is-inline-block'>
        <small><b>Ilmoittautuminen auki</b></small> <br />
        Ilmoittautumisaika päättyy {moment(event.activeUntil).format('DD.MM.YYYY HH:mm')}
      </span>
      {event.reservedUntil &&
        <span className='mt-1 is-block'>
          <Icon className='fa fa-users' aria-hidden='true' /> Varasijat aukea {moment(event.activeUntil).format('DD.MM.YYYY HH:mm')}
        </span>
      }
    </>
    : <>
      <i className='fa fa-calendar-times has-text-danger' aria-hidden='true' /> Ilmoittautumisaika<br />
      {moment(event.activeAt).format('DD.MM.YYYY HH:mm')} - {moment(event.activeUntil).format('DD.MM.YYYY HH:mm')}
    </>

EventStatus.propTypes = {
  event: eventPropTypes
}

const isActiveEvent = event => event &&
  moment().isAfter(moment(event.activeAt)) &&
  moment().isBefore(moment(event.activeUntil))

const isEnrollable = (event, enrollCount) => (event.maxParticipants + (event.reserveCount || 0)) > enrollCount
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
    participants: PropTypes.array,
    spareParticipants: PropTypes.array,
    push: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  navigateToEventList = () =>
    this.props.push(`/ilmo`)

  render() {
    const { event, loading, participants, spareParticipants } = this.props
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
          <Box>
            {isActiveEvent(event)
              ? <Title isSize={4} className='highlight-left-dark-blue'>
                Ilmoittaudu
              </Title>
              : <p className='has-text-grey mb-1'>
                Ilmoittautuminen ei ole vielä auennut
              </p>
            }
            <Form
              fields={event.fields.map(field => ({ ...field, name: `values[${field.name}]` }))}
              defaultValues={defaultValues(event.fields)}
              submitRenderer={isActiveEvent(event) && isEnrollable(event, participants.length + spareParticipants.length) && 'Tallenna'}
              onSave={(values, { resetForm }) =>
                this.props.addEventEnroll(values, event.id)
                  .then(() => resetForm())
              } />
            {!isEnrollable(event, participants.length + spareParticipants.length) &&
              <p className='has-text-grey'>
                Tapahtuma on täynnä
              </p>
            }
          </Box>
          <Box className='top-red' >
            <Title isSize={5} className='highlight-left-red is-inline-block'>
              Osallistujat
            </Title>
            {participants.length
              ? <>
                &nbsp;<small className='has-text-grey-light'>({participants.length}/{event.maxParticipants})</small>
                <ParticipantList
                  fields={event.fields}
                  answers={participants}
                  sort={answers => answers}
                  publicOnly
                />
              </>
              : <p>Ei osallistujia</p>
            }
            {!!spareParticipants.length &&
              <>
                <strong>
                  <p className='has-text-grey mb-1 is-inline-block'>
                    Varasijoilla
                  </p>
                </strong>
                &nbsp; <small className='has-text-grey-light'>({spareParticipants.length}/{event.reserveCount})</small>
                <ParticipantList
                  fields={event.fields}
                  answers={spareParticipants}
                  sort={answers => answers}
                  publicOnly
                />
              </>
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

const mapStateToProps = (state, { eventId }) => {
  const splittedEnrolls = splitNormalAndSpare(state, eventId)
  return {
    event: findEventById(state, eventId),
    participants: splittedEnrolls[1],
    spareParticipants: splittedEnrolls[0],
    loading: state.events.loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: () => dispatch(push()),
  fetchEvent: eventId => dispatch(eventActions.fetchEvent(eventId)),
  fetchEventEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId)),
  addEventEnroll: (data, eventId) => new Promise((resolve, reject) => {
    dispatch(eventEnrollActions.addEventEnroll(data, eventId, { resolve, reject }))
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollEventPage)
