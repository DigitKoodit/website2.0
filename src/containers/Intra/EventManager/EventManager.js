import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import moment from 'moment'
import { BaseContent } from '../../../components/Layout'
import { eventActions } from '../../../actions'
import { Columns, Column, Title, Box, Button, Subtitle } from 'bloomer'
import DatePicker from 'react-datepicker'
import '../../../styles/datepicker.scss'
import EventList from './EventList'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../../components/Intra/ModelEditor'
import MarkdownEditor from '../../../components/ContentManagement/MarkdownEditor'
import { findEventById } from '../../../selectors/eventSelectors'
import EventFieldManager from './EventFieldManager'
import { isNewlyCreated, includesNewlyCreated } from '../../../store/helpers'
import { INITIAL_ID } from '../../../constants'

class EventManager extends PureComponent {
  state = {
    activeItemId: null
  }

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
    this.setState({ activeItemId: itemId })
    this.props.clearErrors()
  }

  clearSelection = () => {
    this.setState({ activeItemId: null })
    this.props.clearErrors()
  }

  renderDetailedEvent = (item, validationErrors) => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addEvent : this.props.updateEvent}
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
    const { activeItemId } = this.state
    const activeItem = !isNil(activeItemId) && findEventById(events, activeItemId)
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
                {activeItem
                  ? this.renderDetailedEvent(activeItem, validationErrors)
                  : <p>Valitse muokattava kohde listalta</p>}
              </Box>
            </Column>
          </Columns>
        </Column>
      </BaseContent>
    )
  }
}

EventManager.propTypes = {
  events: PropTypes.array.isRequired,
  validationErrors: PropTypes.shape({ msg: PropTypes.string }),
  fetchEvents: PropTypes.func.isRequired,
  initNewEvent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  events: state.events.records,
  validationErrors: state.events.error
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
