/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar id="nav" collapseOnSelect expand="lg" variant="light">
      <Container id="nav-box">
        <Link passHref href="/">
          <Image id="logo" src="/images/ccblack.png" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/search">
              <Nav.Link>Find Cocktails</Nav.Link>
            </Link>
            <Link passHref href="/saved">
              <Nav.Link>My Saved</Nav.Link>
            </Link>
            <Link passHref href="/share">
              <Nav.Link>Share</Nav.Link>
            </Link>
            <Button id="sign-out" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
