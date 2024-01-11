import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";


const MessageInput = () => {
  const [input, setInput] = useState({
    message: ''
  })

  const onchange = (event) => {
    event.preventDefault();

  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return ( 
    <>
      <div className="message-area">All Other messages</div>
      <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={10}>
          <Form.Group controlId="usernameControl">
            <Form.Control
              required
              type="text"
              name='message'
              placeholder="Message"
              value={input.message}
              onChange={onchange}
            />
          </Form.Group>
          </Col>
          <Col md={2}>
            <Button className="send-btn" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </> );
}

export default MessageInput;