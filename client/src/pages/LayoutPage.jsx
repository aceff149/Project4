import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';

export default function LayoutPage() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="./home">Question App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="./home">Home</Nav.Link>
              <Nav.Link href="./questions">Questions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>

      <footer className="bg-dark text-white text-center py-3 mt-4">
        <Container>
          <p className="mb-0">&copy; 2025 My App. All rights reserved.</p>
        </Container>
      </footer>
    </>
  )
}