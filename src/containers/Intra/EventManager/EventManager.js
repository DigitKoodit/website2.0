import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import moment from 'moment'
import { BaseContent } from '../../../components/Layout'
import { eventActions } from '../../../actions'
import { Column, Title, Columns, Box, Table, Button } from 'bloomer'
import DatePicker from 'react-datepicker'
import '../../../styles/datepicker.scss'
import EventList from './EventList'
import ModelEditor, { EditorField, EditorInput, EditorCheckbox } from '../../../components/Intra/ModelEditor'
import MarkdownEditor from '../../../components/ContentManagement/MarkdownEditor'
import { findEventById } from '../../../selectors/eventSelectors'
import EventFieldManager from './EventFieldManager'

class EventManager extends PureComponent {
  state = {
    activeItemId: null
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  handleItemClick = itemId => {
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
      const isNewlyCreated = item.id < 0
      return (
        <Table className='table-border-0' isNarrow >
          <tbody>
            {!isNewlyCreated && <tr>
              <td className='has-text-right'><EditorField label='Id' /></td>
              <td>{item.id}</td>
            </tr>}
            <tr>
              <td className='has-text-right'><EditorField label='Nimi' /></td>
              <td>
                <EditorInput
                  field='name'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Osallistujamäärä' /></td>
              <td>
                <EditorInput
                  field='maxParticipants'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Varasijoja' /></td>
              <td>
                <EditorInput
                  field='reserveCount'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Ilmoittautuminen alkaa' /></td>
              <td>
                <DatePicker
                  selected={moment(item.activeAt)}
                  onChange={date => updateStateItem({ activeAt: date })}
                  className='input is-small'
                />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Ilmoittautuminen päättyy' /></td>
              <td>
                <DatePicker
                  selected={moment(item.activeUntil)}
                  onChange={date => updateStateItem({ activeUntil: date })}
                  className='input is-small'
                />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Näytetään listalla' /></td>
              <td>
                <EditorCheckbox
                  field='isVisible'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Kuvaus' /></td>
              <td>
                <MarkdownEditor
                  content={item.description}
                  handleTextChange={description => updateStateItem({ description: description || '' })}
                />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Kentät' /></td>
              <td>
                <EventFieldManager
                  fields={item.fields}
                  updateFields={updateStateItem}
                  validationErrors={validationErrors} />
              </td>
            </tr>
            <tr>
              <td className='has-text-right'><EditorField label='Osallistujat' /></td>
              <td>
                <EditorInput
                  field='participants'
                  model={item}
                  onChange={handleInputChange}
                  validationErrors={validationErrors} />
              </td>
            </tr>
          </tbody>
        </Table>

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
    console.log(activeItem)
    return (
      <BaseContent>
        <Column>
          <Title>Tapahtumat</Title>
          <Columns isMultiline>
            <Column isSize='narrow'>
              <EventList
                onItemClick={this.handleItemClick}
                events={events} />
            </Column>
            <Column>
              <Button isSize='small' isColor='primary' onClick={initNewEvent}>Lisää uusi</Button>
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
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
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
