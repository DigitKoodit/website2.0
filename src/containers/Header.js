import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import NavbarItem from '../components/NavbarItem'
import brandLogo from '../public/images/logo.svg'

const Header = () => (
  <div className='header'>
    <Navbar
      header={navBarHeader}
    >
      <NavbarItem
        title='Etusivu'
        path='/'
      />
      <NavbarItem
        title='Viralliset'
        path='/viralliset'
        subItems={[{
          title: 'Esittely',
          path: '/esittely'
        }, {
          title: 'Hallitus',
          path: '/hallitus'
        }, {
          title: 'Toimihenkilöt',
          path: '/toimihenkilot'
        }, {
          title: 'Toimikunnat',
          path: '/toimikunnat'
        }]}
      />
      <NavbarItem
        title='Toiminta'
        path='/toiminta'
        subItems={[{
          title: 'Tapahtut',
          path: '/tapahtumat'
        }]}
      />
      <NavbarItem
        title='Opiskelu'
        path='/opiskelu'
        subItems={[]}
      />
      <NavbarItem
        title='Ilmoittaudu'
        path='/ilmo'
        subItems={[]}
      />
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
        <i className='fa fa-user-o site-icon action' aria-hidden='true' />
      </NavbarItem>
    </Navbar>
  </div >
)

const navBarHeader = (
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

export default Header
