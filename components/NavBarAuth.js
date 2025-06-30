/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar style={{ backgroundColor: '#1D2C33', marginBottom: '40px' }} collapseOnSelect expand="lg">
      <Container className="space">
        <Link passHref href="/">
          <Navbar.Brand className="nav-bar">
            <span className="attentiond">ATTENTION D</span>
            <span className="efficient">EFFICIENT</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button className="btns-gen" style={{ backgroundColor: '#6dd6d3' }} onClick={signOut}>
              Sign Out
            </Button>
            <Link passHref href="/aboutme">
              <Button className="btns-gen" style={{ backgroundColor: '#6dd6d3' }}>
                Who Made This?
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
