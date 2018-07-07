import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import find from 'lodash/find'
import Navbar from './Navbar'
import NavbarItem from '../components/NavbarItem'
import brandLogo from '../public/images/logo.svg'
import { connect } from 'react-redux'
import { siteNavigationActions } from '../actions'

class Header extends PureComponent {
  componentDidMount() {
    this.props.fetchNavigation()
  }
  render() {
    const { navItems } = this.props

    return (
      <div className='header'>
        <Navbar header={NavBarHeader}>
          {navItems.filter(item => !item.parentId).map(item =>
            <NavbarItem
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
          <NavbarItem
            title='Hae'
            path='/search'
          >
            <i className='fa fa-search site-icon action' aria-hidden='true' />
          </NavbarItem>
          <NavbarItem
            title='Intra'
            path='/intra'
          >
            <i className='fa fa-user site-icon action' aria-hidden='true' />
          </NavbarItem>
        </Navbar>
      </div >
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
  <div className='row middle-xs brand'>
    <div className='col-xs-3 end-xs'>
      <Link to='/'>
        <img
          className='brand-logo'
          src={brandLogo}
          alt={'Digit ry'}
        />
      </Link>
    </div>
    <div className='col-xs-9 start-xs'>
      <div className='row'>
        <h1 className='brand-title'>DIGIT ry</h1>
      </div>
      <div className='row'>
        <p className='brand-description'>Turun yliopiston diplomi-insinööriopiskelijoiden ainejärjestö.<br />Teekkariperinteitä jo vuodesta 1999.</p>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  navItems: state.siteNavigation.records.filter(item => item.isVisible)
})

const mapDispatchToProps = (dispatch) => ({
  fetchNavigation: () => dispatch(siteNavigationActions.fetchNavigation())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
