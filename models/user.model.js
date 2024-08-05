const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"firstname is required"]
  },
  email: {
    type: String,
    required:[true,"email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'user'
  },

  createdAt:{
    type:Date,
    default:Date.now(),
  },
  passwordChangedAt: String,
  passwordResetToken: String,
  passwordResetExpires: Date

});


const User = mongoose.model('User', userSchema);

module.exports = User;
