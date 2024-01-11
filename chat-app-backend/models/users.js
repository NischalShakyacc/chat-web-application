const mongoose= require("mongoose");
const {Schema} = mongoose;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Cannot be empty"]
    },

    email:{
        type: String,
        required: [true, "Cannot be empty"],
        unique: true,
        lowercase: true,
        index: true,
        validate: [isEmail, "Email is not valid"]
    },

    password: {
        type: String,
        required: [true, "Cannot be empty"]
    },

    newMessage: {
      type: Object,
      default: {}
    },

    status: {
      type: String,
      default: "offline"
    }

},{minimize: false});

// to hide/encrypt user password before storing user password
userSchema.pre('save',function(next){
  const user = this;
  if(user.isModified('password')){
    return next(); 
  }
  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    //if no error then hash the password
    bcrypt.hash(user.password, salt, function(err,hash){
      if(err) return next(err);

      user.password = hash;
      next()
    })
  })
})



// we do not send user password in return 
userSchema.methods.toJSON = function(){
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
}

userSchema.statics.findByCredentials = async function(email, password){
  //check if user exists or not
  const user = await UserModel.findOne({email});
  if(!user){
    throw new Error('invalid credentials');
  }

  //check if password matches or not
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    throw new Error('invalid credentials')
  }

  //user has valid credentials and can be logged in
  return user;
}

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel