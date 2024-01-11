const mongoose = require('mongoose');
require('dotenv').config();

//const check = mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@atlascluster.wpvs9pg.mongodb.net/?retryWrites=true&w=majority`)

const checkConnection = mongoose.connect(`mongodb+srv://chat-admin:${process.env.PASSWORD}@atlascluster.wpvs9pg.mongodb.net/?retryWrites=true&w=majority`)

if(checkConnection){
  console.log("Connected to mongodb atlas")
}
