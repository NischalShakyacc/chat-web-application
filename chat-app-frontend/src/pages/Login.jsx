import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/applicationApi';


const Login = () => {
  const navigate = useNavigate();
  const [loginUser, {isLoading, error}] = useLoginUserMutation() ;
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const onchange = (event) =>{
    setCredentials({
      ...credentials,
      [event.target.name]:event.target.value
    })
  }
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);
    if(validated){
      loginUser(credentials).then(({data,error}) => {
        if(data){
          console.log(data);
          //socket work
          //navigate to chat
          navigate("/chatroom");
        }else{
          console.log(error)
        }
      })
    }
  };

  return (  
    <Container className='container-form'>
    <h2>Login to access chats!</h2>
      <Form className='d-flex flex-column align-items-center gap-4 p-4 form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="6" controlId="emailControl">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name='email'
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
            name='password'
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