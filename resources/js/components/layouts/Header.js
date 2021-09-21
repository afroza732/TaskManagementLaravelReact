import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
export default function Header() {
  const [publicUrl, setPublicUrl] = useState("/");
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top" >
        <Container>
          <Navbar.Brand to={`${publicUrl}`}>Task Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`${publicUrl}`}>Home</Nav.Link>
              <Nav.Link as={Link} to={`${publicUrl}about`}>About</Nav.Link>
              <Nav.Link as={Link}  to={`${publicUrl}contact`}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
