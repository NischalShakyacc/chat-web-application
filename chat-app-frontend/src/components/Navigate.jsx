import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutUserMutation } from '../services/applicationApi';



const Navigate = () => {
  const user = useSelector(state => state.user);
  const [logoutUser,{isLoading,error}] = useLogoutUserMutation();
  
  async function handleLogout(event){
    event.preventDefault();
    await logoutUser(user);
    window.location.replace("/")
  }

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
          {!user && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            
            <LinkContainer to="/signup">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            </>
          )}
          

          

          {user && (
            <>
              <LinkContainer to="/chatroom">
                <Nav.Link>Chat</Nav.Link>
              </LinkContainer>
              <Button variant='danger' onClick={handleLogout}>
                Logout
              </Button>
              <div className = "user-profile">{`Welcome, ${user.username}`}</div>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigate;