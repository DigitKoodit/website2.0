import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isObject from 'lodash/isObject'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
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
// import ExternalLinkButton from '../../components/Helpers/ExtrenalLinkButton';

const commitChanges = rows => ({ added, changed, deleted }) => {
  if(added) {
    const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0
    rows = [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row
      }))
    ]
  }
  if(changed) {
    rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row))
  }
  if(deleted) {
    const deletedSet = new Set(deleted)
    rows = rows.filter(row => !deletedSet.has(row.id))
  }
  console.log(rows)
  return rows
}
const flattenEnrollValues = enroll => ({
  id: enroll.id,
  ...enroll.values,
  isSpare: enroll.isSpare ? 'Kyllä' : ''
})

const ObjectFormatter = value => Object.entries(value)
  .filter(([key, value]) => !!value)
  .map(([key, value]) => `${key}, `)
export class ParticipantPage extends PureComponent {
  state = {
    selectedItemId: null,
    csvDataUri: null
  }
  componentDidMount = () => {
    this.props.fetchEnrolls(this.props.event.id)
  }

  mapFieldsToColumnsSpecs = enroll => mapToDataGrid([
    { name: 'id', title: 'ID', width: 60, editingEnabled: false },
    ...Object.entries(enroll.values).map(([key, value]) => ({
      name: key, title: key, customRenderer: isObject(value) ? ObjectFormatter : null, wordWrapEnabled: true
    })),
    { name: 'isSpare', title: 'varasijalla', customRenderer: (value) => value ? 'Kyllä' : '' }
  ])

  mapCsvFields = enroll => [
    'id',
    ...Object.keys(enroll.values).map(key => key),
    'isSpare'
  ]

  selectItem = ({ row }) => this.setState({ selectedItemId: row.id })
  clearSelection = () => this.setState({ selectedItemId: null })
  resetCsvData = () => this.setState({ csvDataUri: null })
  removeEventEnroll = () => {
    const { selectedItemId } = this.state
    const { event, enrolls, removeEventEnroll } = this.props
    const toBeRemovedEnroll = enrolls.find(enroll => enroll.id === selectedItemId)
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
  render() {
    const { enrolls } = this.props
    const { selectedItemId } = this.state
    return (
      <Columns>
        {selectedItemId &&
          <Modal isOpen handleClickOutside={this.clearSelection} >
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
        }
        <Column>
          <Subtitle isSize={5}>Osallistujat <small className='has-text-grey-light'>({enrolls.length})</small>
          </Subtitle>
          {enrolls.length
            ? <DataGrid
              columnSpecs={this.mapFieldsToColumnsSpecs(enrolls[0])}
              rows={enrolls.map(flattenEnrollValues)}
              onCommitChanges={commitChanges(enrolls)}
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
    removeEventEnroll: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: findEventById(state, ownProps.eventId),
  enrolls: findEventEnrollsByEventId(state, ownProps.eventId) || []

})

const mapDispatchToProps = dispatch => ({
  fetchEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId, true)),
  removeEventEnroll: (enrollItem, eventId) => dispatch(eventEnrollActions.removeEventEnroll(enrollItem, eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage)
