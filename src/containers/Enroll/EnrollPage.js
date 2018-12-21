import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EnrollListPage from './EnrollListPage'
import EnrollEventPage from './EnrollEventPage'

const EnrollPage = () =>
  <Switch>
    <Route path='/ilmo' exact component={EnrollListPage} />
    <Route path='/ilmo/:eventId' exact render={({ match }) =>
      <EnrollEventPage eventId={match.params.eventId} />
    } />
  </Switch>

export default EnrollPage
