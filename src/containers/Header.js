import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import find from 'lodash/find'
import SiteNavbar from './SiteNavbar'
import SiteNavbarItem from '../components/SiteNavbarItem'
import brandLogo from '../public/images/logo.svg'
import { connect } from 'react-redux'
import { siteNavigationActions } from '../actions'
import { NavbarBrand, NavbarBurger, Content, Image } from 'bloomer'

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
    document.addEventListener('mousedown', this.handleClick, false)
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
          {navItems.filter(item => !item.parentId).map(item =>
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
          <SiteNavbarItem
            title='Toiminta'
            path='/'
          />
          <SiteNavbarItem
            title='Uudelle opiskelijalle'
            path='/'
          />
          <SiteNavbarItem
            title='Opinnot'
            path='/'
          />
          <SiteNavbarItem
            title='Yrityksille'
            path='/'
          />
          <SiteNavbarItem>
            |
          </SiteNavbarItem>
          <SiteNavbarItem
            title='Hae'
            path='/search'
          >
            <i className='fa fa-search site-icon action' aria-hidden='true' />
          </SiteNavbarItem>
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
  <NavbarBrand style={{ padding: '1.5rem' }} >
    <Link to='/' className='mr-2'>
      <Image isSize='64x64' src={brandLogo} alt='Digit ry' />
    </Link>
    <Content>
      <h1 className='is-marginless'>DIGIT ry</h1>
      Turun yliopiston diplomi-insinööriopiskelijoiden ainejärjestö.<br />Teekkariperinteitä jo vuodesta 1999.
    </Content>
    <NavbarBurger isActive={isActive} onClick={onBurgerClick} />
  </NavbarBrand>

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records.filter(item => item.isVisible)
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: () => dispatch(siteNavigationActions.fetchNavigation())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
