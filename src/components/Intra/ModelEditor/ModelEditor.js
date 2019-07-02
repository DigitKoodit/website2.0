import React, { PureComponent } from 'react'
import PropTypes from 'prop-types' //
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import isMatch from 'lodash/isMatch'
import { Button } from 'bloomer'
import DelayedActionButton from '../../DelayedActionButton'

class ModelEditor extends PureComponent {
  state = {
    item: this.props.item
  }
  static getDerivedStateFromProps(nextProps, state) {
    // Omitted from: https://medium.com/@ddunderfelt/controlled-forms-with-react-f7ecc1ce6155
    if(nextProps.loading) {
      return null
    }
    // Required for React 16.4: compare prev props to next props
    // and don't update if they're the same. Uses lodash methods.
    const prevProps = get(state, '_prevProps', false)

    if(prevProps && isMatch(nextProps, prevProps)) {
      return null
    }
    const nextState = reduce(
      state,
      (returnState, value, prop) => {
        if(!isNil(nextProps[prop])) {
          return { ...returnState, [prop]: nextProps[prop] }
        }
        return returnState
      },
      state
    )
    // React 16.4: Save the props in state for the next run.
    nextState._prevProps = nextProps

    return nextState
  }

  handleInputChange = event => {
    const isCheckbox = event.target.type === 'checkbox'
    const value = isCheckbox ? event.target.checked : event.target.value
    const name = event.target.name
    this.updateStateItem({ [name]: isCheckbox ? value : (value || null) })
  }

  updateStateItem = newItem => this.setState(prevState => ({ item: { ...prevState.item, ...newItem } }))

  render() {
    const { item } = this.state
    const { onSave, onRemove, onCancel, renderFields } = this.props
    return (
      <>
        {renderFields(item, this.handleInputChange, this.updateStateItem)}
        {onSave &&
          <Button
            className=''
            isColor='primary'
            onClick={() => onSave(item)}>
            Tallenna
          </Button>
        }
        {onCancel &&
          <Button
            className=''
            isOutlined
            isColor='warning'
            onClick={() => onCancel(item)}>
            Peruuta
          </Button>
        }
        {onRemove &&
          <DelayedActionButton
            className=''
            isOutlined
            isColor='danger'
            onClick={() => onRemove(item)}>
            Poista
          </DelayedActionButton>
        }
      </ >)
  }
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired,
    renderFields: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func
  }
}

export default ModelEditor
