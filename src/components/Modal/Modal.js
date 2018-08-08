import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { Modal, ModalBackground, ModalContent } from 'bloomer'

class ModalComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.modalRef = createRef()
  }
  handleClickOutsideModal = event => (this.modalRef.current.contains(event.target)) || !this.props.isOpen ? null : this.props.handleClickOutside()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideModal, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideModal, false)
  }

  render() {
    const { children, isOpen } = this.props
    return (
      <Modal isActive={isOpen}>
        <ModalBackground />
        <div ref={this.modalRef} >
          <ModalContent>
            {children}
          </ModalContent>
        </div>
      </Modal>
    )
  }
}

ModalComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isOpen: PropTypes.bool,
  handleClickOutside: PropTypes.func
}

ModalComponent.defaultProps = {
  handleClickOutside: noop
}

export default ModalComponent
