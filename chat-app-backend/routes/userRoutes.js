const router = require('express').Router();
const User = require('../models/users');

//creating user in database
router.post('/', async(req, res) => {
  try{
    const {username, email, password} = req.body;
    const user = await User.create(
      {
        username, 
        email, 
        password
      }
    );
    res.status(201).json(user);
  }
  catch(err){
    let msg;
    // To check if user with email is already in DB
    if (err.code === 11000) {
      msg = "User already exists. (Username or email must be unique)";
      res.status(400).json(msg);
    } else {
      msg = err.message;
      res.status(500).json(msg);
    }
    console.log(err)
    res.status(200).json(msg);
  }
})

//login functionality
router.post('/login', async(req, res) => {
  try{
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  }
  catch(error){
    res.status(400).json(error.message);
  }
})

module.exports = router