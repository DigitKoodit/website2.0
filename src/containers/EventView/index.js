import React, { Component } from 'react'
import { Box, Content, Tile, Title } from 'bloomer'
import take from 'lodash/take'
import partition from 'lodash/partition'
import moment from 'moment'
import 'moment/locale/fi'

import '../../styles/eventsView.scss'
import MobileEvents from './MobileEvents'
import DesktopEvents from './DesktopEvents'
import { getCalendarEventsShort } from '../../lib/googleUtils'
import { eventsIntoDayGroups, isAlldayOrMultiday } from '../../lib/eventUtils'

class EventView extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    getCalendarEventsShort()
      .then(events => {
        this.setState({ events })
      })
      .catch(error => {
        console.log('ERROR FETHCING CALENDAR EVENTS', error)
      })
  }

  render() {
    const today = moment().startOf('day')
    const takeFirstThree = days =>
      take(days.filter(({ date }) => moment(date).isSameOrAfter(today)), 3)

    const firstThreeDays = takeFirstThree(eventsIntoDayGroups(this.state.events))
      .map(day => {
        const [eventsMultiDay, eventsSingleDay] = partition(day.events, isAlldayOrMultiday)

        return {
          ...day,
          eventsMultiDay,
          eventsSingleDay
        }
      })

    return (
      <Tile isParent className='frontpage-responsive-tile'>
        <Tile isChild render={
          props => (
            <Box {...props}>
              <Content>
                <Title className='highlight-left-blue'>Tapahtumat</Title>
                <DesktopEvents days={firstThreeDays} />
                <MobileEvents days={firstThreeDays} />
              </Content>
            </Box>
          )
        } />
      </Tile>
    )
  }
}

export default EventView
