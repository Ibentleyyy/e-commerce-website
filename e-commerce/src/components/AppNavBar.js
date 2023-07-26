import { useState, useContext, useEffect } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingBag, FaTimes } from 'react-icons/fa';
import UserContext from '../UserContext.js';
import '../App.css';

export default function AppNavBar() {
  const { user } = useContext(UserContext);

 

  return (
    <>
      <Navbar expand="lg" className="custom-navbar position-fixed">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            NEPHO_
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" activeClassName="active-link">
                HOME
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" activeClassName="active-link">
                PRODUCTS
              </Nav.Link>

              {user.isAdmin && (
                <Link
                  as={NavLink}
                  to="/admindashboard"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  ADMIN
                </Link>
              )}

              {user.id === null ? (
                <Nav.Link as={NavLink} to="/login" activeClassName="active-link">
                  LOGIN
                </Nav.Link>
              ) : (
                <>
                  {user.isAdmin === false && (
                    <Nav.Link as={NavLink} to="/details" activeClassName="active-link">
                      ORDERS
                    </Nav.Link>
                  )}
                  <Nav.Link as={NavLink} to="/logout" activeClassName="active-link">
                    LOGOUT
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

}
