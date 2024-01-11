import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const onchange = (event) =>{
    setCredentials({
      ...credentials,
      [event.target.name]:event.target.value
    })
    console.log(credentials)
  }
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if(validated){
      // handle Login functionality 
    }
  };

  return (  
    <Container className='container-form'>
    <h2>Login to access chats!</h2>
      <Form className='d-flex flex-column align-items-center gap-4 p-4 form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="6" controlId="usernameControl">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={onchange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="emailControl">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email address"
            value={credentials.email}
            onChange={onchange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="passwordControl">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onchange}
          />
        </Form.Group>
      <Button type="submit" className='w-25'>Log In</Button>
      <div>
        <p>
          Create an account.
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </Form>
    </Container>
  );
}

export default Login;