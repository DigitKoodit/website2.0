import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
const mapFieldsToColumns = enroll => [
  { key: 'id', name: 'ID' },
  ...Object.keys(enroll.values).map(key => ({
    key, name: key, sortable: true, filterable: true
  })),
  { key: 'isSpare', name: 'Varasijalla' }
].map(c => ({ ...defaultColumnProperties, ...c }))

const mapEnrollValues = enroll => ({
  id: enroll.id,
  ...enroll.values,
  isSpare: enroll.isSpare ? 'X' : ''
})

export class ParticipantPage extends PureComponent {
  state = {
    selectedItemId: null
  }
  componentDidMount = () => {
    this.props.fetchEnrolls(this.props.eventId)
  }

  selectItem = (rowIndex, item) => this.setState({ selectedItemId: item.id })
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
              columns={mapFieldsToColumns(enrolls[0])}
              initialRows={enrolls.map(mapEnrollValues)}
              minHeight={600}
              onRowDoubleClick={this.selectItem}
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
