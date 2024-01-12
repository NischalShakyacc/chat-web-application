const express = require('express')
const app = express()

//importing routes
const userRoute = require('../routes/userRoutes');
const User = require('../models/users');
const Message = require('../models/Messages')

// const rooms = require('rooms')

const cors = require('cors');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

app.use('/users', userRoute)
require('./connection');

const server = require('http').createServer(app);
const PORT = 5001;
const io = require('socket.io')(server,{
  cors: {
    origin: 'http://localhost/5173',
    methods: ['GET','POST']
  }
})

app.get('./rooms',(req, res) => {
  res.json(rooms)
})

async function getLastMessagesFromRoom(room){
  let roomMessages = await Message.aggregate([
    {$match: {to: room}},
    {$group: {_id: '$date', messageByDate: {$push: '$$ROOT'}}}
  ])
  return roomMessages
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function(a,b){
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    // rearranging date to (year/month/day) for comparison to display messages acc to date 
    date1 = date1[2] + date1[0] + date1[1]
    date2 = date1[2] + date2[0] + date2[1]

    return date1 < date2 ? -1 : 1
  })
}

//socket connection
io.on('connection',(socket) => {

  //for creating new user
  socket.on('new-user', async() => {
    const members = await User.find();
    io.emit('new-user', members)
  })

  //for joining room
  socket.on('join-room', async(room) => {
    socket.json(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  })

  //for messages
  socket.on('message-room', async(room, sender, content, time, date) => {
    console.log('new-message', content)
    const newMessage = await Message.create({content,time,date, to: room, from:sender});
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    
    //send message to rooom
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room)
  })

  app.delete('/logout', async function(req,res){
    try {
      const {_id, newMessages} = req.body;
      const user = await User.findById(_id);
      user.status = 'offline';
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(400).send()
    }
  })
})

server.listen(PORT, () => {
  console.log('listening to port', PORT);
});