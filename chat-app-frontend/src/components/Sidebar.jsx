import { ListGroup } from "react-bootstrap";

const Sidebar = () => {
  const rooms = ['room 1', 'room 2', 'room 3']
  return ( 
    <>
      <p>Join room</p>
      <ListGroup>
      {
        rooms && rooms.map((room, index) => (
          <ListGroup.Item key={index} className="roomlist">
            {room}
          </ListGroup.Item>
        ))
      }
      </ListGroup>
    </>
    );
}

export default Sidebar;