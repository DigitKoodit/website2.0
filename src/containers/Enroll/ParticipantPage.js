import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isObject from 'lodash/isObject'
import { connect } from 'react-redux'
import memoize from 'micro-memoize'
import { Columns, Column, Subtitle, Box, Media, MediaContent, Button } from 'bloomer'
import { findEventEnrollsByEventId } from '../../selectors/eventEnrollSelectors'
import DataGrid from '../../components/DataGrid'
import { mapToDataGrid } from '../../components/dataGridHelper'
import { eventEnrollActions } from '../../actions'
import Modal from '../../components/Modal'
import { toCsv, toCsvDataUri } from '../../helpers/helpers'
import ExternalLinkButton from '../../components/Helpers/ExtrenalLinkButton'
import eventPropTypes from './eventPropTypes'
import { findEventById } from '../../selectors/eventSelectors'
// import ExternalLinkButton from '../../components/Helpers/ExtrenalLinkButton'

const flattenEnrollValues = enroll => ({
  id: enroll.id,
  ...enroll.values,
  isSpare: enroll.isSpare ? 'Kyllä' : ''
})

const ObjectFormatter = value => Object.entries(value)
  .filter(([key, value]) => !!value)
  .map(([key, value]) => `${key}, `)

const compareArray = (oldArgs, newArgs) => oldArgs.length === newArgs.length

export class ParticipantPage extends PureComponent {
  state = {
    selectedItemIndex: null,
    csvDataUri: null
  }
  componentDidMount = () => {
    this.props.fetchEnrolls(this.props.event.id)
  }

  parsePossibleColumns = enrolls => {
    const uniqFields = enrolls.reduce((accMap, enroll) => {
      Object.entries(enroll.values).forEach(([key, value]) =>
        accMap.set(key, isObject(value))
      )
      return accMap
    }, new Map())
    return [...uniqFields.entries()]
  }

  mapFieldsToColumnsSpecs = memoize(enrollFields => {
    return mapToDataGrid([
      { name: 'id', title: 'ID', width: 60, editingEnabled: false },
      ...enrollFields.map(([key, isObject]) => ({
        name: key, title: key, customRenderer: isObject ? ObjectFormatter : null, wordWrapEnabled: true
      })),
      { name: 'isSpare', title: 'varasijalla', customRenderer: (value) => value ? 'Kyllä' : '' }
    ])
  }, compareArray)

  mapCsvFields = enroll => [
    'id',
    ...Object.keys(enroll.values).map(key => key),
    'isSpare'
  ]

  selectItem = index => this.setState({ selectedItemIndex: index })
  clearSelection = () => this.setState({ selectedItemIndex: null })
  resetCsvData = () => this.setState({ csvDataUri: null })
  removeEventEnroll = () => {
    const { selectedItemIndex } = this.state
    const { event, enrolls, removeEventEnroll } = this.props
    const toBeRemovedEnroll = enrolls[selectedItemIndex]
    removeEventEnroll(toBeRemovedEnroll, event.id)
    this.clearSelection()
    this.resetCsvData()
  }
  generateCsv = () => {
    toCsv(
      this.mapCsvFields(this.props.enrolls[0]),
      this.props.enrolls.map(flattenEnrollValues))
      .then(csv => {
        this.setState({ csvDataUri: toCsvDataUri(csv) })
      })
      .catch(error => {
        console.error('CSV parse error', error)
      })
  }

  updateItem = changed => {
    const { updateEventEnroll, enrolls } = this.props
    const [changedIndex, changedField] = Object.entries(changed)[0]
    const changedEnroll = enrolls[changedIndex]
    if(changedEnroll && changedField) {
      const [keyValue, changedValue] = Object.entries(changedField)[0]
      const updatedEnroll = keyValue === 'isSpare'
        ? {
          ...changedEnroll,
          isSpare: changedValue === 'true'
        }
        : {
          ...changedEnroll,
          values: {
            ...changedEnroll.values,
            ...changedField
          }
        }
      updateEventEnroll(updatedEnroll)
    }
  }

  commitChanges = ({ changed, deleted }) => {
    if(changed) {
      this.updateItem(changed)
    }
    if(deleted) {
      this.selectItem(deleted[0])
    }
  }

  render() {
    const { enrolls } = this.props
    const { selectedItemIndex } = this.state
    return (
      <Columns>
        {selectedItemIndex != null
          ? <Modal isOpen handleClickOutside={this.clearSelection} >
            <Box>
              <Media>
                <MediaContent>
                  <p>Haluatko poistaa osallistujan tapahtumasta?</p>
                  <Button
                    isSize='small'
                    isColor='danger'
                    onClick={this.removeEventEnroll}>
                    Kyllä
                  </Button>
                  <Button
                    isSize='small'
                    isOutlined onClick={this.clearSelection}>
                    Peruuta
                  </Button>
                </MediaContent>
              </Media>
            </Box>
          </Modal>
          : null
        }
        <Column>
          <Subtitle isSize={5}>Osallistujat <small className='has-text-grey-light'>({enrolls.length})</small>
          </Subtitle>
          <small><span role='img' aria-label='poop'>
            Jos (kun) edit/delete -nappulat katoaa, niin päivitä sivu..&#x1F4A9;
          </span></small>
          {enrolls.length
            ? <DataGrid
              columnSpecs={this.mapFieldsToColumnsSpecs(this.parsePossibleColumns(enrolls))}
              rows={enrolls.map(flattenEnrollValues)}
              onCommitChanges={this.commitChanges}
            />
            : (
              <p className='has-text-grey mb-1'>
                Ei osallistujia
              </p>
            )
          }
          <div className='mt-3'>
            {this.renderExportButton()}
          </div>
        </Column>
      </Columns>
    )
  }
  renderExportButton = () => {
    const { event, enrolls } = this.props
    const { csvDataUri } = this.state
    return csvDataUri
      ? <ExternalLinkButton
        isColor='primary'
        href={csvDataUri}
        filename={`export-${event.name}.csv`} >
        <i className='fa fa-download' aria-hidden='true' />&nbsp;Lataa CSV
      </ExternalLinkButton>
      : <Button disabled={!enrolls.length} onClick={this.generateCsv} >
        <i className='fa fa-cogs has-text-grey' aria-hidden='true' />&nbsp;Luo CSV
      </Button>
  }
  static propTypes = {
    event: eventPropTypes,
    fetchEnrolls: PropTypes.func.isRequired,
    enrolls: PropTypes.array.isRequired,
    removeEventEnroll: PropTypes.func.isRequired,
    updateEventEnroll: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: findEventById(state, ownProps.eventId),
  enrolls: findEventEnrollsByEventId(state, ownProps.eventId) || []

})

const mapDispatchToProps = dispatch => ({
  fetchEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId, true)),
  updateEventEnroll: enroll => dispatch(eventEnrollActions.updateEventEnroll(enroll, enroll.eventId)),
  removeEventEnroll: (enrollItem, eventId) => dispatch(eventEnrollActions.removeEventEnroll(enrollItem, eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage)
