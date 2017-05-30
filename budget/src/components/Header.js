import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import '../styles/header.css';

const Header = (props) => {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Budget</a>
        </Navbar.Brand>
      </Navbar.Header>
      {!props.isAuthenticated
        ? (
          <Nav pullRight>
            <LinkContainer to="/signin">
              <NavItem eventKey={1}>
                <i className="fa fa-user"></i> Sign In
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavItem eventKey={1}>
                <i className="fa fa-user-plus"></i> Sign Up
              </NavItem>
            </LinkContainer>
          </Nav>
        )
        : (
          <Nav pullRight>
            <NavItem eventKey={1} onClick={props.handleSignout}>
              <i className="fa fa-sign-out" onClick={props.handleSignout}></i> Sign Out
            </NavItem>
          </Nav>
        )
      }
    </Navbar>
  )
}

export default Header;
