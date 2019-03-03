import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isObject from 'lodash/isObject'
import { connect } from 'react-redux'
import { Columns, Column, Subtitle, Box, Media, MediaContent, Button } from 'bloomer'
import { findEventEnrollsByEventId } from '../../selectors/eventEnrollSelectors'
import DataGrid from '../../components/DataGrid'
import { eventEnrollActions } from '../../actions'
import Modal from '../../components/Modal'

const defaultColumnProperties = {
  width: 150,
  sortable: true,
  resizable: true
}

const mapEnrollValues = enroll => ({
  id: enroll.id,
  ...enroll.values,
  isSpare: enroll.isSpare ? 'X' : ''
})

const ObjectFormatter = ({ value }) => Object.entries(value)
  .filter(([key, value]) => !!value)
  .map(([key, value]) => `${key}, `)
export class ParticipantPage extends PureComponent {
  state = {
    selectedItemId: null
  }
  componentDidMount = () => {
    this.props.fetchEnrolls(this.props.eventId)
  }

  mapFieldsToColumns = enroll => [
    { key: 'id', name: 'ID', width: 45 },
    ...Object.entries(enroll.values).map(([key, value]) => ({
      key, name: key, sortable: true, filterable: true, formatter: isObject(value) ? ObjectFormatter : null
    })),
    { key: 'isSpare', name: 'Varasijalla' },
    { key: 'delete', name: 'Poista', sortable: false, formatter: this.renderDeleteButton, width: 70 }
  ].map(c => ({ ...defaultColumnProperties, ...c }))

  renderDeleteButton = value => (
    <Button isColor='danger' isSize='small' isOutlined onClick={() => this.selectItem(value)}>
      X
    </Button>
  )

  selectItem = ({ row }) => this.setState({ selectedItemId: row.id })
  clearSelection = () => this.setState({ selectedItemId: null })
  removeEventEnroll = () => {
    const { selectedItemId } = this.state
    const { eventId, enrolls, removeEventEnroll } = this.props
    const toBeRemovedEnroll = enrolls.find(enroll => enroll.id === selectedItemId)
    removeEventEnroll(toBeRemovedEnroll, eventId)
    this.clearSelection()
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
                  <Button isSize='small' isColor='danger' onClick={this.removeEventEnroll}>Kyllä</Button>
                  <Button isSize='small' isOutlined onClick={this.clearSelection}>Peruuta</Button>
                </MediaContent>
              </Media>
            </Box>
          </Modal>
        }
        <Column>
          <Subtitle isSize={5}>Osallistujat <small className='has-text-grey-light'>({enrolls.length})</small></Subtitle>
          {enrolls.length
            ? <DataGrid
              columns={this.mapFieldsToColumns(enrolls[0])}
              initialRows={enrolls.map(mapEnrollValues)}
              minHeight={600}
            />
            : (
              <p className='has-text-grey mb-1'>
                Ei osallistujia
              </p>
            )
          }
        </Column>
      </Columns>
    )
  }
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    fetchEnrolls: PropTypes.func.isRequired,
    enrolls: PropTypes.array.isRequired,
    removeEventEnroll: PropTypes.func.isRequired
  }
}

const mapStateToProps = (state, ownProps) => ({
  enrolls: findEventEnrollsByEventId(state, ownProps.eventId) || []

})

const mapDispatchToProps = dispatch => ({
  fetchEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId, true)),
  removeEventEnroll: (enrollItem, eventId) => dispatch(eventEnrollActions.removeEventEnroll(enrollItem, eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage)
