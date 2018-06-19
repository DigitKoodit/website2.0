import React from 'react'
import moment from 'moment'

// Style. Defined in webpack
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getCalendarEvents } from '../lib/googleUtils'

// a localizer for BigCalendar

class CalendarSite extends React.Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
    BigCalendar.momentLocalizer(moment)
  }

  componentDidMount() {
    getCalendarEvents()
      .then(events => {
        this.setState({
          events
        })
      })
  }

  render() {
    return (
      // React Components in JSX look like HTML tags

      <div className='site-container'>
        <div className='site-content'>
          <div className='row'>
            <div className='col-xs-12 margin-1'>
              <h1>Tapahtumakalenteri</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <BigCalendar
                style={{ height: '420px' }}
                events={this.state.events}
                culture='fi'
              />
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default CalendarSite
