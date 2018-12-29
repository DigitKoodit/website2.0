
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

const defaultValues = (fields, initialValues = {}) => {
  const defaultModel = fields.reduce((acc, field, index) => ({ ...acc, id: index, [field.name]: field.value }), {})
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
