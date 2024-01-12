import { useContext, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";


const MessageInput = () => {
  const [input, setInput] = useState("");
  const { socket, currentRoom, messages, setMessages } =  useContext(AppContext)

  function getFormatedDate(){
    const date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    month = month.length > 1 ? month: '0' + month;
    day = day.length > 1 ? day: '0' + day;
    return month + "/" + day + "/" + year
  }
  const todayDate = getFormatedDate();
  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages);
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes(): today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, input, user, time, todayDate);
    setInput("")
  }

  //handling user
  const user = useSelector(state => state.user)
  return ( 
    <>
      <div className="message-area">
      {/*When user is not logged in */}
        {!user && 
          <div className="alert alert-danger">
            Please Login or Signup
          </div>
        }
        {/*When user is not logged in */}
        {user && messages &&
          messages.map(({_id: date, messagesByDate}, index) => (
            <div key={index}>
              <p className="alert alert-info text-center message-date-indicator">{date}</p>
              {messagesByDate?.map(({ content, time, from:sender }, indexmsg)=>(
                <div key={indexmsg} className="message">
                  <p>{content}</p>
                </div>
              ))}
            </div>
          ))
        }
      </div>
      <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={10}>
          <Form.Group controlId="usernameControl">
            <Form.Control
              disabled={!user}
              required
              type="text"
              name='message'
              placeholder="Message"
              value={input.message}
              onChange={(e)=>{setInput(e.target.value)}}
            />
          </Form.Group>
          </Col>
          <Col md={2}>
            <Button className="send-btn" type="submit" disabled={!user}>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </> );
}

export default MessageInput;