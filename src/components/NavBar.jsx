import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import SideBar from './SideBarCart';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    if (token) {
      setShow(true)
    } else {
      navigate("/Login")
    }
  };



  const logOut = () => {
    localStorage.setItem("token", "")
    location.reload();
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#/">E-Comerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/">Home</Nav.Link>
              <Nav.Link href="#/login">Login</Nav.Link>
              <Nav.Link href="#/purchase">Purchase</Nav.Link>
            </Nav>
            {token && <Button type='button' variant="danger" onClick={logOut}>LogOut</Button>}
          </Navbar.Collapse>
          <Button  variant="primary" onClick={handleShow} className="m-2" style={{background: " #F85555"}}>
            cart
          </Button>
          <Nav.Link href="#/user">name</Nav.Link>
        </Container>
      </Navbar>

      <SideBar show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;