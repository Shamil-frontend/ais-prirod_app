import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HeaderUser from '../HeaderUser';

// import logo from '../../images/logo.svg';

import './AppHeader.scss';

const AppHeader = () => (
  <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/home">
      {/* <img className="logo" src={logo} width="144" height="30" alt="Логотип" /> */}
      <h4 style={{ color: 'white', marginBottom: '0' }}>АИС Природы</h4>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
      <Nav>
        <Nav.Link as={NavLink} to="/new-case">
          Новое обращение
        </Nav.Link>
      </Nav>
      <Nav>
        <HeaderUser />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;
