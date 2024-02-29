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
    <Navbar style={{ backgroundColor: '#34424A', marginBottom: '40px' }} collapseOnSelect expand="lg">
      <Container className="space">
        <Link passHref href="/">
          <Navbar.Brand className="nav-bar">
            LETS GIT IT
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button className="btns-gen" style={{ backgroundColor: '#AF60FF' }} onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
