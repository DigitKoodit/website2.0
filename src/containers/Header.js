import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarItem from '../components/NavbarItem';

const Header = () => (
  <div className="header">
    <Navbar
      header={navBarHeader}
    >
      <NavbarItem
        title="Etusivu"
        path="/"
      />
      <NavbarItem
        title="Viralliset"
        path="/viralliset"
        subItems={[{
          title: 'Esittely',
          path: "/esittely"
        }, {
          title: 'Hallitus',
          path: "/hallitus"
        }, {
          title: 'Toimihenkilöt',
          path: "/toimihenkilot"
        }, {
          title: 'Toimikunnat',
          path: "/toimikunnat"
        }]}
      />
      <NavbarItem
        title="Toiminta"
        path="/toiminta"
        subItems={[{
          title: 'Tapahtumat',
          path: "/tapahtumat"
        }]}
      />
      <NavbarItem
        title="Opiskelu"
        path="/opiskelu"
        subItems={[{
          title: 'Esittely',
          path: "/esittely"
        }, {
          title: 'Hallitus',
          path: "/hallitus"
        }, {
          title: 'Toimihenkilöt',
          path: "/toimihenkilot"
        }, {
          title: 'Toimikunnat',
          path: "/toimikunnat"
        }]}
      />
      <NavbarItem
        title="Ilmoittaudu"
        path="/ilmo"
        subItems={[{
          title: 'Esittely',
          path: "/esittely"
        }, {
          title: 'Hallitus',
          path: "/hallitus"
        }, {
          title: 'Toimihenkilöt',
          path: "/toimihenkilot"
        }, {
          title: 'Toimikunnat',
          path: "/toimikunnat"
        }]}
      />
      <p style={{ display: 'inline', padding: "1.5rem" }}>|</p>
      <NavbarItem
        title="Hae"
        path="/search"
      >
        <i className="fa fa-search site-icon action" aria-hidden="true"></i>
      </NavbarItem>
      <NavbarItem
        title="Intra"
        path="www.intra.digit.fi"
      >
        <i className="fa fa-user-o site-icon action" aria-hidden="true"></i>
      </NavbarItem>
    </Navbar>
  </div >
)

const navBarHeader = (
  <div className="row middle-xs brand">
    <div className="col-xs-3 end-xs">
      <Link to="/">
        <img
          className="brand-logo"
          src="../public/images/logo.svg"
        />
      </Link>
    </div>
    <div className="col-xs-9 start-xs">
      <div className="row">
        <h1 className="brand-title">DIGIT ry</h1>
      </div>
      <div className="row">
        <p className="brand-description">Turun yliopiston diplomi-insinööriopiskelijoiden ainejärjestö.<br />Teekkariperinteitä jo vuodesta 1999.</p>
      </div>
    </div>
  </div>
)


export default Header;
