import React, { Component } from 'react';
import { getCalendarEventsShort } from '../lib/googleUtils';

class EventsView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    getCalendarEventsShort()
      .then(events => {
        console.log("TODO display events", events);
      })
      .catch(error => {
        console.log("ERROR FETHCING CALENDAR EVENTS", error);
      })
  }
  render() {
    return (
      <div className="site-content">
        Tapahtumakalenteri
        </div>
    )
  }
}

export default EventsView;