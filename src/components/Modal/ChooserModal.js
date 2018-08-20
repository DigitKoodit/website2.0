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
      modalTitle,
      dataSet,
      selectedItem,
      listItemFormatter,
      selectedRenderer,
      placeholder = 'Ei valittu',
      nullable,
      disabled
    } = this.props
    return (
      <Fragment>
        <Button isSize='small' onClick={this.openModal} disabled={disabled}>
          {isOpen ? 'Muokataan' : selectedItem ? selectedRenderer(selectedItem) : placeholder}
        </Button>
        <Modal isOpen={isOpen} handleClickOutside={this.closeModal}>
          <Box>
            <Media>
              <MediaContent>
                <Title>{modalTitle}</Title>
                <VerticalList
                  items={dataSet}
                  listItemRenderer={item => (
                    <li key={item.id} onClick={() => this.handleSelect(item)}>
                      <MenuLink>
                        {selectedItem && selectedItem.id === item.id
                          ? <Icon isSize='small' className='fas fa-check mr-1' />
                          : <Icon isSize='small mr-1' />}
                        {listItemFormatter(item)}
                      </MenuLink>
                    </li>
                  )}
                />
                {nullable && <Button isSize='small' onClick={() => this.handleSelect(null)}>Poista valinta</Button>}
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
    modalTitle: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    dataSet: PropTypes.array,
    selectedItem: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    listItemFormatter: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedRenderer: PropTypes.func.isRequired,
    nullable: PropTypes.bool,
    disabled: PropTypes.bool
  }
}

export default ChooserModal
