import React, { PureComponent, createRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { Modal, ModalBackground, ModalContent } from 'bloomer'

const modalRoot = document.getElementById('modal')

class ModalComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.modalRef = createRef()
    this.modalDiv = document.createElement('div')
  }

  handleClickOutsideModal = event => (this.modalRef.current.contains(event.target)) || !this.props.isOpen ? null : this.props.handleClickOutside()

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideModal, false)
    modalRoot.appendChild(this.modalDiv)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideModal, false)
    modalRoot.removeChild(this.modalDiv)
  }

  render() {
    const { children, isOpen } = this.props
    return ReactDOM.createPortal(
      <Modal isActive={isOpen}>
        <ModalBackground />
        <div ref={this.modalRef} >
          <ModalContent>
            {children}
          </ModalContent>
        </div>
      </Modal>,
      this.modalDiv
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
