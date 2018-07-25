import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import find from 'lodash/find'
import SiteNavbar from './SiteNavbar'
import SiteNavbarItem from '../components/SiteNavbarItem'
import brandLogo from '../public/images/logo.svg'
import { connect } from 'react-redux'
import { siteNavigationActions } from '../actions'
import { NavbarBrand, NavbarItem, Columns, Column, Content, Image } from 'bloomer'

class Header extends PureComponent {
  componentDidMount() {
    this.props.fetchNavigation()
  }
  render() {
    const { navItems } = this.props

    return (
      <SiteNavbar header={NavBarHeader}>
        {navItems.filter(item => !item.parentId).map(item =>
          <SiteNavbarItem
            state={item}
            title={item.title}
            key={item.id}
            path={item.path}
            subItems={item.subItems.map(itemId => {
              const subItem = find(navItems, { id: itemId })
              return subItem && ({
                state: subItem,
                title: subItem.title,
                path: subItem.path
              })
            })}
          />
        )}

        <p style={{ display: 'inline', padding: '1.5rem' }}>|</p>
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

const NavBarHeader = (
  <NavbarBrand>
    <Link to='/'>
      <Image isSize='96x96' src={brandLogo} alt={'Digit ry'} />
    </Link>
    <NavbarItem>
      <Content>
        <h1>DIGIT ry</h1>
        <p>Turun yliopiston diplomi-insinööriopiskelijoiden ainejärjestö.<br />Teekkariperinteitä jo vuodesta 1999.</p>
      </Content>
    </NavbarItem>
  </NavbarBrand>
)

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records.filter(item => item.isVisible)
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: () => dispatch(siteNavigationActions.fetchNavigation())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
