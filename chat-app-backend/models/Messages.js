const mongoose= require("mongoose");
const {Schema} = mongoose;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const MessageSchema = new Schema({
  content: String,
  from: Object,
  socketid: String,
  time: String,
  date: String,
  to: String
},{minimize: false});

const MessageModel = mongoose.model('messages', MessageSchema);
module.exports = MessageModel