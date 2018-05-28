import React from 'react'
import CalendarStore from './CalendarStore'
import CalendarActions from './CalendarActions'

// Class is using Flux architecture
class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = CalendarStore.getState()
    this.onChange = this.onChange.bind(this) // bind() binds the scopes function 'onChange' not the React component's
  }

  componentDidMount() {
    CalendarStore.listen(this.onChange)
    CalendarActions.getCalendarEvents()
  }

  componentWillUnmount() {
    CalendarStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state)
  }

  render() {
    let calendarEvents = this.state.events.map(function(event, index) {
      return (
        <li key={event.name + index}>
          <p><strong>{event.start}</strong></p>
          <p>{event.name}</p>
        </li>
      )
    })

    return (
      <div id='calendar-events'>
        <h2><i className='fa fa-calendar' aria-hidden='true' /> Tapahtumat</h2>
        <ul>
          {calendarEvents}
        </ul>
        <div className='text-center'>
          <a href='http://digit.fi/toiminta.php?s=1035' type='button' className='button'>Lisää tapahtumia</a>
        </div>

      </div>
    )
  }
}

export default Calendar
