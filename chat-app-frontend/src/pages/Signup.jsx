import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../services/applicationApi';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [signupUser, {isLoading, error}] = useSignupUserMutation();

  const onchange = (event) =>{
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  setValidated(true);

  // Use the updated value of validated
  if (validated) {
    // handle sign up functions 
    signupUser(credentials).then(({data}) => {
        if(data){
          console.log(data);
          //socket work
          
          //navigate to chat
          navigate("/chatroom");
        }else{
          console.log(data)
        }
      })
  }
};
  return ( 
    <>
      <Container className='container-form'>
      <h2 className='title'>Create an account</h2>
      <Form className='d-flex flex-column align-items-center gap-4 p-4 form' noValidate validated={validated} onSubmit={handleSubmit} >
        <Form.Group as={Col} md="6" controlId="usernameControl">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name='username'
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
            name="email"
            placeholder="Email address"
            value={credentials.email}
            onChange={onchange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="passwordControl">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            minLength={4}
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onchange}
          />
        </Form.Group>
      <Button type="submit" className='w-25  '>Sign Up</Button>
      <div>
        <p>Already have an account? 
          <Link to={"/login"}>Log In</Link>
        </p>
      </div>
    </Form>
    </Container>
    </>
  );
}

export default Signup;