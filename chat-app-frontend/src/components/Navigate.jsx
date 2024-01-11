import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';


const Navigate = () => {
  return ( 
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Chat Application</Navbar.Brand>
          </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/chatroom">
            <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Log In</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigate;