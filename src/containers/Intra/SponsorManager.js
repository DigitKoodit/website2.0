import React, { PureComponent, Component, Fragment } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import moment from 'moment'
import { VerticalList } from '../../components/Layout/Lists'
import { sponsorActions } from '../../actions'
import isMatch from 'lodash/isMatch'
import Clickable from '../../components/Event/Clickable'
import Base from '../../components/Layout/Base'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import '../../styles/list.css'

const renderListItem = item =>
  <Fragment>
    <p className='clear-margin'><span className='text-detail'>NIMI </span>{item.name}</p>
  </Fragment>

class SponsorEditor extends Component {
  state = {
    item: this.props.item,
    focusedDate: null
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

  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox'
    const value = isCheckbox ? event.target.checked : event.target.value
    const name = event.target.name
    // Default to null TODO: better solution for checking per parameter
    this.setState(prevState => ({ item: { ...prevState.item, [name]: isCheckbox ? value : (value || null) } }))
  }
  handleContentChange = content => this.setState(prevState => ({ item: { ...prevState.item, content: content || '' } }))
  handleDateChange = (type, date) => this.setState(prevState => ({ item: { ...prevState.item, [type]: date.format() } }))

  render() {
    const { item } = this.state
    const { onSave, onRemove, onCancel } = this.props
    const isNewlyCreated = item.id < 0
    return <Fragment>
      {!isNewlyCreated && <p><span className='text-detail'>ID </span>{item.id}</p>}
      <p > <span className='text-detail'>NIMI </span> <input name='name' type='text' value={!isNil(item.name) ? item.name : ''} onChange={this.handleChange} /></p >
      <p><span className='text-detail'>KUVAUS </span><input name='description' type='text' value={!isNil(item.description) ? item.description : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>LINKKI </span><input name='link' type='text' value={!isNil(item.link) ? item.link : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>LOGO </span><input name='logo' type='text' value={!isNil(item.logo) ? item.logo : ''} onChange={this.handleChange} /></p>
      {renderDatePickers(item, this.handleDateChange)}
      <button className='margin-top-1' onClick={() => onSave(item)}>Tallenna</button>
      <button className='margin-top-1' onClick={() => onCancel(item)}>Peruuta</button>
      <button className='margin-top-1' onClick={() => onRemove(item)}>Poista</button>
    </Fragment >
  }
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      description: PropTypes.string,
      activeAt: PropTypes.string,
      activeUntil: PropTypes.string
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }
}

const renderDatePickers = (item, handleChange) => {
  const { activeAt, activeUntil } = item
  return (
    <Fragment>
      <div className='margin-top-1'><span className='text-detail'>AKTIIVINEN ALKAEN </span>
        <DatePicker
          selected={moment(activeAt)}
          onChange={date => handleChange('activeAt', date)}
        /></div>
      <div className='margin-top-1'><span className='text-detail margin-top-1'>AKTIIVINEN ASTI </span>
        <DatePicker
          selected={moment(activeUntil)}
          onChange={date => handleChange('activeUntil', date)}
        /></div>
    </Fragment>
  )
}

class SponsorManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchSponsors()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderDetailedNavItem = item => <SponsorEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addSponsor : this.props.updateSponsor}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem} />

  removeNavItem = item => {
    this.props.removeSponsor(item)
    this.clearSelection()
  }

  render = () => {
    const { sponsors, initNewSponsor } = this.props
    const { activeItemId } = this.state
    return (
      <Base>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>Intra</h2>
            <div className='row margin-top-1'>
              <div className='col-xs-2'>
                <SponsorList
                  items={sponsors}
                  onItemClick={this.handleItemClick}
                  originalItems={sponsors}
                />
                <button className='margin-top-1' onClick={initNewSponsor}>Lisää uusi</button>
              </div>
              <div className='col-xs-10'>
                <div className='box'>
                  {(activeItemId && find(sponsors, { id: activeItemId })) ? <Clickable item={find(sponsors, { id: activeItemId })} renderItem={this.renderDetailedNavItem} /> : <p>Valitse muokattava kohde listalta</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base >
    )
  }
}

const SponsorList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
  <VerticalList
    className={`list`}
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.id}
        item={item}
        items={originalItems}
        onItemClick={onItemClick}
      />
    )} />

const ListItem = ({ item, onItemClick }) => (
  <li key={item.id} className='list-item box' >
    <Clickable className='nav-item' item={item} onClick={() => onItemClick(item.id)} renderItem={renderListItem} />
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func
}

SponsorManager.propTypes = {
  sponsors: PropTypes.array.isRequired,
  fetchSponsors: PropTypes.func.isRequired,
  initNewSponsor: PropTypes.func.isRequired,
  addSponsor: PropTypes.func.isRequired,
  updateSponsor: PropTypes.func.isRequired,
  removeSponsor: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  sponsors: state.sponsors.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchSponsors: () => dispatch(sponsorActions.fetchSponsors(true)),
  fetchSponsor: sponsorId => dispatch(sponsorActions.fetchSponsor(sponsorId)),
  initNewSponsor: () => dispatch(sponsorActions.prepareNew()),
  addSponsor: item => dispatch(sponsorActions.addSponsor(item)),
  updateSponsor: item => dispatch(sponsorActions.updateSponsor(item)),
  removeSponsor: item => dispatch(sponsorActions.removeSponsor(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SponsorManager)
