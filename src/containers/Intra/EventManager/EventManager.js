import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Route, Switch } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import '../../../styles/datepicker.scss'
import { Columns, Column, Title, Box, Button, Subtitle } from 'bloomer'
import isNil from 'lodash/isNil'
import { BaseContent } from '../../../components/Layout'
import { eventActions } from '../../../actions'
import EventList from './EventList'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../../components/Intra/ModelEditor'
import MarkdownEditor from '../../../components/ContentManagement/MarkdownEditor'
import { findEventById } from '../../../selectors/eventSelectors'
import EventFieldManager from './EventFieldManager'
import { INITIAL_ID } from '../../../constants'
import { isNewlyCreated, includesNewlyCreated, urlDisplayId } from '../../../store/helpers'
import { getArraySortedBy } from '../../../selectors/generalSelectors'

const rootPath = '/intra/events'

class EventManager extends PureComponent {
  componentDidMount() {
    this.props.fetchEvents()
  }

  componentDidUpdate = prevProps => {
    const { events } = this.props
    if(prevProps.events.length < events.length && includesNewlyCreated(events)) {
      this.handleActiveItemChange(INITIAL_ID)
    }
  }

  handleActiveItemChange = itemId => {
    this.props.openForEdit(urlDisplayId(itemId))
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.props.closeEditor()
    this.props.clearErrors()
  }

  renderEditor = (item, validationErrors) => <ModelEditor
    item={item}
    onSave={isNewlyCreated(item) ? this.props.addEvent : this.props.updateEvent}
    onCancel={this.clearSelection}
    onRemove={this.removeItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      return (
        <Columns>
          <Column>
            <div className='mb-3'>
              <Subtitle isSize={5}>Perustiedot</Subtitle>
              {!isNewlyCreated(item) &&
                <EditorField label='Id' >
                  {item.id}
                </EditorField>}
              <EditorField label='Nimi *' >
                <EditorInput
                  field='name'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </EditorField>
              <EditorField label='Ilmoittautuminen alkaa *' >
                <DatePicker
                  selected={moment(item.activeAt)}
                  onChange={date => updateStateItem({ activeAt: date })}
                  className='input is-small'
                />
              </EditorField>
              <EditorField label='Ilmoittautuminen päättyy *' >
                <DatePicker
                  selected={moment(item.activeUntil)}
                  onChange={date => updateStateItem({ activeUntil: date })}
                  className='input is-small'
                />
              </EditorField>
              <EditorField label='Julkaistu' >
                <EditorCheckbox
                  field='isVisible'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </EditorField>
            </div>
            <div className='mb-3'>
              <Subtitle isSize={5}>Rajat</Subtitle>
              <EditorField label='Osallistujamäärä *' >
                <EditorInput
                  field='maxParticipants'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </EditorField>
              <EditorField label='Varasijoja' >
                <EditorInput
                  field='reserveCount'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </EditorField>
              <EditorField label='Kiintiöiden aukeamisaika' >
                <DatePicker
                  selected={moment(item.activeUntil)}
                  onChange={date => updateStateItem({ activeUntil: date })}
                  className='input is-small'
                />
              </EditorField>
            </div>
            <div className='mb-3'>
              <Subtitle isSize={5}>Lomake</Subtitle>
              <EditorField label='Kuvaus *' >
                <MarkdownEditor
                  content={item.description}
                  handleTextChange={description => updateStateItem({ description: description || '' })}
                />
              </EditorField>
              <EditorField label='Kentät' >
                <EventFieldManager
                  fields={item.fields}
                  updateFields={updateStateItem}
                  validationErrors={validationErrors} />
              </EditorField>
              <EditorField label='Osallistujat' >
                <EditorInput
                  field='participants'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </EditorField>
            </div>

            <span className='has-text-grey-light'>* pakollinen</span>
          </Column>
        </Columns>

      )
    }}
  />

  removeItem = item => {
    this.props.removeEvent(item)
    this.clearSelection()
  }

  render = () => {
    const { events, initNewEvent, validationErrors } = this.props
    return (
      <BaseContent>
        <Column>
          <Title>Tapahtumat</Title>
          <Columns isMultiline>
            <Column isSize='narrow'>
              <EventList
                onItemClick={this.handleActiveItemChange}
                events={events} />
            </Column>
            <Column>
              <Button
                isSize='small'
                isColor='primary'
                onClick={initNewEvent}>
                Lisää uusi
              </Button>
              <Box>
                <Switch>
                  <Route
                    path={`${rootPath}/:activeItemId`}
                    render={({ match }) => {
                      const { activeItemId } = match.params
                      const activeItem = !isNil(activeItemId) && findEventById(events, activeItemId)
                      return activeItem
                        ? this.renderEditor(activeItem, validationErrors)
                        : `Tapahtumaa ei löytynyt`
                    }
                    } />
                  <Route render={() => <p>Valitse muokattava kohde listalta</p>} />
                </Switch>
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent>
    )
  }
}

EventManager.propTypes = {
  openForEdit: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  fetchEvents: PropTypes.func.isRequired,
  initNewEvent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  events: getArraySortedBy(state,
    {
      path: 'events',
      sortByKey: 'activeAt',
      orderBy: 'asc'
    }),
  validationErrors: state.events.error,
  closeEditor: () => ownProps.history.push(rootPath),
  openForEdit: activeItemId => ownProps.history.push(`${rootPath}/${activeItemId}`)
})

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(eventActions.clearErrors()),
  fetchEvents: () => dispatch(eventActions.fetchEvents(true)),
  fetchEvent: eventId => dispatch(eventActions.fetchEvent(eventId)),
  initNewEvent: () => dispatch(eventActions.prepareNew()),
  addEvent: item => dispatch(eventActions.addEvent(item)),
  updateEvent: item => dispatch(eventActions.updateEvent(item)),
  removeEvent: item => dispatch(eventActions.removeEvent(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventManager)
