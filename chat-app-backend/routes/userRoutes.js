const router = require('express').Router();
const User = require('../models/users');

//creating user in database
router.post('/', async(req, res) => {
  try{
    const {name, email, password} = req.body;
    console.log(req.body);
    const user = await User.create(
      {
        name, 
        email, 
        password
      }
    );
    res.status(201).json(user);
  }
  catch(error){
    let message;
    // To check if user with email is already in DB
    if(error.code == 11000){
      message = "user already exists. (user must be unique)"
    } else {
      message = e.message;
    }
  }

  console.log(error);
  res.status(200).json(message);
})

//login functionality
router.post('./login', async(req, res) => {
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