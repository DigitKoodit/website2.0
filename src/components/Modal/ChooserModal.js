import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Box, Title, MenuLink, Media, MediaContent, MediaRight, Delete, Icon } from 'bloomer'
import Modal from './Modal'
import { VerticalList } from '../Layout/'

export class ChooserModal extends PureComponent {
  state = {
    isOpen: false
  }
  closeModal = () => this.setState({ isOpen: false })
  openModal = () => this.setState({ isOpen: true })
  handleSelect = item => {
    this.props.onSelect(item)
  }
  render() {
    const { isOpen } = this.state
    const {
      title,
      dataSet,
      selectedItem,
      listItemFormatter,
      selectedRenderer
    } = this.props
    return (
      <Fragment>
        <Button isSize='small' onClick={this.openModal}>
          {isOpen ? 'Muokataan' : selectedItem ? selectedRenderer(selectedItem) : null}
        </Button>
        <Modal isOpen={isOpen} handleClickOutside={this.closeModal}>
          <Box>
            <Media>
              <MediaContent>
                <Title>{title}</Title>
                <VerticalList
                  items={dataSet}
                  listItemRenderer={item => (
                    <li key={item.id} onClick={() => this.handleSelect(item)}>
                      <MenuLink>
                        {selectedItem.id === item.id
                          ? <Icon isSize='small' className='fas fa-check mr-1' />
                          : <Icon isSize='small mr-1' />}
                        {listItemFormatter(item)}
                      </MenuLink>
                    </li>
                  )}
                />
              </MediaContent>
              <MediaRight>
                <Delete onClick={this.closeModal} />
              </MediaRight>
            </Media>
          </Box>
        </Modal >
      </Fragment>

    )
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    dataSet: PropTypes.array,
    selectedItem: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired,
    listItemFormatter: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedRenderer: PropTypes.func.isRequired
  }
}

export default ChooserModal
