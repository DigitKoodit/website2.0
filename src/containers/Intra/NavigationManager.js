import React, { PureComponent, Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import isMatch from 'lodash/isMatch'
import { siteNavigationActions } from '../../actions'
import Base from '../../components/Layout/Base'
import { VerticalList } from '../../components/Layout/Lists'
import Clickable from '../../components/Event/Clickable'
// import '../../styles/list.css'

const renderNavListItem = item =>
  <Fragment>
    <p className='clear-margin'><span className='text-detail'>NIMI </span>{item.title}</p>
    <p className='clear-margin'><span className='text-detail'>POLKU </span>{item.path}</p>
    <p className='clear-margin'><span className='text-detail'>SIVU </span>{item.isCustom ? 'Custom' : 'Sivu:' + item.sitePageId}</p>
  </Fragment>

class NavigationEditor extends Component {
  state = {
    navItem: this.props.navItem
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
    this.setState(prevState => ({ navItem: { ...prevState.navItem, [name]: isCheckbox ? value : (value || null) } }))
  }
  render() {
    const { navItem } = this.state
    const { onSave, onRemove, onCancel } = this.props
    return <Fragment>
      <p><span className='text-detail'>ID </span>{navItem.id}</p>
      <p><span className='text-detail'>NIMI </span><input name='title' type='text' value={!isNil(navItem.title) ? navItem.title : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>POLKU </span><input name='path' type='text' value={!isNil(navItem.path) ? navItem.path : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>SIVU </span>{navItem.isCustom ? 'Custom' : <input name='sitePageId' type='number' value={!isNil(navItem.sitePageId) ? navItem.sitePageId : ''} onChange={this.handleChange} />}</p>
      <p><span className='text-detail'>YLÄSIVU </span><input name='parentId' type='number' value={!isNil(navItem.parentId) ? navItem.parentId : ''} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>ALASIVUT </span>{navItem.subItems.length > 0 ? <b>{navItem.subItems.length}</b> : 'Ei alasivuja'}</p>
      <p><span className='text-detail'>JULKAISTU </span><input name='isVisible' type='checkbox' checked={navItem.isVisible} onChange={this.handleChange} /></p>
      <p><span className='text-detail'>PAINO </span><input name='weight' type='number' step='1' value={!isNil(navItem.weight) ? navItem.weight : ''} onChange={this.handleChange} /></p>
      <button className='margin-top-1' onClick={() => onSave(navItem)}>Tallenna</button>
      <button className='margin-top-1' onClick={() => onCancel(navItem)}>Peruuta</button>
      <button className='margin-top-1' onClick={() => onRemove(navItem)}>Poista</button>
    </Fragment>
  }
  static propTypes = {
    navItem: PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      isCustom: PropTypes.bool.isRequired,
      weight: PropTypes.number.isRequired,
      parentId: PropTypes.number,
      subItems: PropTypes.array
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }
}
class NavigationManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchNavigation(true)
  }
  handleNavItemClick = navItemId => this.setState({ activeItemId: navItemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderDetailedNavItem = item => <NavigationEditor
    navItem={item}
    onSave={this.state.activeItemId < 0 ? this.props.addNavItem : this.props.updateNavigation}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem} />

  removeNavItem = item => {
    this.props.removeNavItem(item)
    this.clearSelection()
  }

  render() {
    const { navItems, initNewNavItem } = this.props
    const { activeItemId } = this.state
    return (
      <Base>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>Sivurakenne</h2>
            <div className='row margin-top-1'>
              <div className='col-xs-4'>
                <SideNavVerticalList
                  items={navItems.filter(item => !item.parentId)}
                  onItemClick={this.handleNavItemClick}
                  originalItems={navItems}
                />
                <button className='margin-top-1' onClick={initNewNavItem}>Lisää uusi</button>
              </div>
              <div className='col-xs-8'>
                <div className='box'>
                  {(activeItemId && find(navItems, { id: activeItemId })) ? <Clickable item={find(navItems, { id: activeItemId })} renderItem={this.renderDetailedNavItem} /> : <p>Valitse muokattava kohde listalta</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base>
    )
  }
}

const SideNavVerticalList = ({ items, originalItems, onItemClick, level = 0 }) => items.length > 0 &&
  <VerticalList
    className={`list ${level > 0 ? `sub-${level}` : null}`}
    items={items}
    listItemRenderer={item => (
      <NestingListItem
        key={item.id}
        item={item}
        items={originalItems}
        onItemClick={onItemClick}
        level={level}
      />
    )} />

const NestingListItem = ({ item, items, level, onItemClick }) => (
  <li key={item.id} className='list-item box' >
    <Clickable className='nav-item' item={item} onClick={() => onItemClick(item.id)} renderItem={renderNavListItem} />
    {item.subItems.length > 0 && (
      <SideNavVerticalList
        items={items.filter(i => item.id === i.parentId)}
        originalItems={items}
        onItemClick={onItemClick}
        level={level + 1} />
    )}
  </li>
)

NestingListItem.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  level: PropTypes.number,
  onItemClick: PropTypes.func
}

NavigationManager.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    subItems: PropTypes.array
  })),
  fetchNavigation: PropTypes.func.isRequired,
  addNavItem: PropTypes.func.isRequired,
  initNewNavItem: PropTypes.func.isRequired,
  updateNavigation: PropTypes.func.isRequired,
  removeNavItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: attemptAuthorizedRoute => dispatch(siteNavigationActions.fetchNavigation(attemptAuthorizedRoute)),
  initNewNavItem: () => dispatch(siteNavigationActions.prepareNew()),
  addNavItem: navItem => dispatch(siteNavigationActions.addNavItem(navItem)),
  updateNavigation: navItem => dispatch(siteNavigationActions.updateNavigation(navItem)),
  removeNavItem: navItem => dispatch(siteNavigationActions.removeNavItem(navItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationManager)
