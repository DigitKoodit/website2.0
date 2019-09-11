import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import find from 'lodash/find'
import SiteNavbar from './SiteNavbar'
import SiteNavbarItem from '../components/SiteNavbarItem'
import { connect } from 'react-redux'
import { NavbarBrand, Image } from 'bloomer'
import brandLogo from '../public/images/logo.svg'
import { siteNavigationActions } from '../actions'
import { NavbarBurger } from '../../node_modules/bloomer/lib/components/Navbar/NavbarBurger'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.headerRef = createRef()
  }
  state = {
    isBurgerMenuOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
    this.props.fetchNavigation()
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }
  handleClick = event =>
    (this.headerRef.current.contains(event.target) || !this.state.isBurgerMenuOpen) ? null : this.handleBurgerClick()

  handleBurgerClick = () => this.setState(prevState => ({ isBurgerMenuOpen: !prevState.isBurgerMenuOpen }))

  render() {
    const { navItems } = this.props
    const { isBurgerMenuOpen } = this.state

    return (
      <div ref={this.headerRef}>
        <SiteNavbar
          brand={renderBrand(this.handleBurgerClick, isBurgerMenuOpen)}
          isActive={isBurgerMenuOpen}
          onNavbarClick={this.handleBurgerClick} >
          {navItems.filter(item => item && !item.parentId).map(item =>
            <SiteNavbarItem
              state={item}
              title={item.title}
              key={item.id}
              path={item.path}
              subItems={item.subItems && item.subItems.map(itemId => {
                const subItem = find(navItems, { id: itemId })
                return subItem && ({
                  state: subItem,
                  title: subItem.title,
                  path: subItem.path
                })
              })}
            />
          )}
          <SiteNavbarItem>
            |
          </SiteNavbarItem>
          {/* <SiteNavbarItem
            title='Hae'
            path='/search'
          >
            <i className='fa fa-search site-icon action' aria-hidden='true' />
          </SiteNavbarItem> */}
          <SiteNavbarItem
            title='Intra'
            path='/intra'
          >
            <i className='fa fa-user site-icon action' aria-hidden='true' />
          </SiteNavbarItem>
        </SiteNavbar>
      </div>
    )
  }
}

Header.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    subItems: PropTypes.array
  })),
  fetchNavigation: PropTypes.func.isRequired
}

const renderBrand = (onBurgerClick, isActive) =>
  <NavbarBrand className='pr-1 p-3' >
    <Link to='/' className='mr-2'>
      <Image isSize='32x32' src={brandLogo} alt='Digit ry' />
    </Link>
    <span className='is-size-7 is-hidden-desktop-only'>Turun yliopiston diplomi-insinööriopiskelijoiden kilta.<br />Teekkariperinteitä jo vuodesta 1999.</span>
    <NavbarBurger isActive={isActive} onClick={onBurgerClick} />
  </NavbarBrand>

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records.filter(item => item.isPublished && item.showOnNavigation)
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: () => dispatch(siteNavigationActions.fetchNavigation())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
