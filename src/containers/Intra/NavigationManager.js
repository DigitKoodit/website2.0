import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import find from 'lodash/find'
import noop from 'lodash/noop'
import { siteNavigationActions } from '../../actions'
import Base from '../../components/Layout/Base'
import { VerticalList } from '../../components/Layout/Lists'
import '../../styles/list.css'

const Clickable = ({ item, onClick, className, renderItem }) => {
  const _onClick = () => onClick ? onClick(item.id) : noop
  return (<div className={className} onClick={_onClick}>
    {renderItem(item)}
  </div>)
}

const renderNavListItem = item =>
  <Fragment>
    <p><span className='text-detail'>NIMI </span>{item.title}</p>
    <p><span className='text-detail'>POLKU </span>{item.path}</p>
    <p><span className='text-detail'>SIVU </span>{item.isCustom ? 'Custom' : 'Sivu:' + item.sitePageId}</p>
  </Fragment>

const renderDetailedNavItem = item =>
  <Fragment>
    <p><span className='text-detail'>NIMI </span><input type='text' value={item.title} /></p>
    <p><span className='text-detail'>POLKU </span><input type='text' value={item.path} /></p>
    <p><span className='text-detail'>SIVU </span>{item.isCustom ? 'Custom' : <input type='text' value={item.sitePageId} />}</p>
    <p><span className='text-detail'>YLÄSIVU </span>{!!item.parentId && item.parentId}</p>
    <p><span className='text-detail'>ALASIVUT </span>{item.subItems.length > 0 ? <b>{item.subItems.length}</b> : 'Ei alasivuja'}</p>
    <p><span className='text-detail'>PAINO </span><input type='number' step='1' value={item.weight} /></p>
    <button className='margin-top-1'>Tallenna</button>
  </Fragment>

class NavigationManager extends PureComponent {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchNavigation()
  }
  handleNavItemClick = navItemId => this.setState({ activeItemId: navItemId })

  render() {
    const { navItems } = this.props
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
              </div>
              <div className='col-xs-8'>
                <div className='box'>
                  {activeItemId ? <Clickable item={find(navItems, { id: activeItemId })} renderItem={renderDetailedNavItem} /> : <p>Valitse muokattava kohde vasemmalta</p>}
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
    {item.subItems > 0 && (
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
  fetchNavigation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: () => dispatch(siteNavigationActions.fetchNavigation())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationManager)
