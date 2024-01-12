import { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const {socket, rooms, setRooms, currentRoom, setCurrentRoom, setPrivateMessage} = useContext(AppContext);
  socket.off('new-user').on('new-user', (payload) => {
    console.log(payload);
  })

  useEffect(()=>{
    if(user){
      setCurrentRoom('general');
      getRooms();
      socket.emit('join-room', 'general')
      socket.emit('new-user')
    }
  },[])

  function getRooms(){
    fetch("https://localhost:5001/rooms")
    .then((response) =>
      response.json()
    )
    .then((rooms) => 
      setRooms(rooms)
    )
  }

  function joinRoom(room, isPublic = true){
    if(!user){
      return alert('Please Login');
    }
    socket.emit('join-room', room);
    setCurrentRoom(room);
    if(isPublic){
      setPrivateMessage(null);
    }
    //notification functionality
  }

  //const srooms = ['general', 'developers']

  if(!user){
    return(<>
      Rooms Here
    </>)
  }
  return ( 
    <>
      <p>Join room</p>
      <ListGroup>
      {
        rooms && rooms.map((room, index) => (
          <ListGroup.Item 
          key={index} 
          active={room === currentRoom} 
          lassName="roomlist" 
          onClick={()=>{joinRoom(room)}} >
            {room}
          </ListGroup.Item>
        ))
      }
      </ListGroup>
    </>
    );
}

export default Sidebar;