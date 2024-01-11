import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar";
import MessageInput from "../components/MessageInput";

const Chatroom = () => {
  return (
    <>
      <Container className="container-form">
      <h2>Chat here</h2>
        <Row>
          <Col md={3} className="form p-3 m-2">
            <Sidebar/>
          </Col>
          <Col md={8} className="form p-3 m-2">
            <MessageInput/>
          </Col>
        </Row>
      </Container>
    </>
    );
}

export default Chatroom;