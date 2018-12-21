import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Title, Column } from 'bloomer'
import eventPropTypes from './eventPropTypes'
import { Base } from '../../components/Layout'
import { baseColumnSize } from '../../components/Layout/Base'
import EventList from '../Intra/EventManager/EventList'
import eventActions from '../../actions/eventActions'
import { findActiveEvents, findUpComingEvents } from '../../selectors/eventSelectors'
import { Subtitle } from 'bloomer/lib/elements/Subtitle'

export class EnrollListPage extends Component {
  componentDidMount = () => {
    this.props.fetchEvents()
  }

  static propTypes = {
    fetchEvents: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape(eventPropTypes)),
    upComingEvents: PropTypes.arrayOf(PropTypes.shape(eventPropTypes)),
    push: PropTypes.func.isRequired
  }

  navigateToEventPage = eventId =>
    this.props.push(`/ilmo/${eventId}`)

  render() {
    const { events, upComingEvents } = this.props
    return (
      <Base >
        <Column isSize={baseColumnSize}>
          <Title isSize={2}>Tapahtumat</Title>
          {events.length > 0
            ? <div className='my-4'>
              <Title isSize={3}>Avoimet</Title>
              <EventList events={events} onItemClick={this.navigateToEventPage} />
            </div>
            : <Subtitle className='my-4' >Ei tapahtumia</Subtitle>
          }
          {upComingEvents.length > 0 &&
            <div className='my-4'>
              <Title isSize={3}>Tulevat</Title>
              <EventList events={upComingEvents} onItemClick={this.navigateToEventPage} />
            </div>
          }
        </Column>
      </Base>
    )
  }
}

const mapStateToProps = (state) => ({
  events: findActiveEvents(state),
  upComingEvents: findUpComingEvents(state)
})

const mapDispatchToProps = (dispatch) => ({
  push: url => dispatch(push(url)),
  fetchEvents: () => dispatch(eventActions.fetchEvents(true))
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollListPage)
