const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../lib/response.handler');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');



//authentication
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    successResponse(res, 'successfully fetched all users',   { totalUsers: users.length, users });

  } catch (err) {
    errorResponse(res, 'getAllUsers', err);
  }
}


const signup = async (req, res, err) => {
  try {
    let { name, email, password, confirmPassword, role } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) { throw new CustomError("auth_error", 400, "Email Has Already Been Registered") };

    if (password != confirmPassword) { throw new CustomError("auth_error", 400, "Password Not Matches") };
    password = await  bcrypt.hash(password,12);

    const user = new User({
      name,
      email,
      password,
      role

    });


    await user.save();

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });

    successResponse(res, 'user registration successfull',   { token, user });

  } catch (err) {
    errorResponse(res, 'signup', err);
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    console.log(user);
    if (!user) {
      throw new CustomError("auth_error", 400, "User Not Exist")
    }
    else if (await bcrypt.compare(req.body.password,user.password)) {
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      successResponse(res, 'user loggedin successfully',   { token, user });
    } else {
      throw new CustomError("auth_error", 400, "Invalid Credentials")
    }
  } catch (err) {
    errorResponse(res, 'loginUser', err);
  }
}

const getMe = (req, res) => {
  try {
    successResponse(res, 'user fetched successfully',   req.user);
  } catch (err) {
    errorResponse(res, 'getMe', err);
  }
}

//updation
const editUser = async (req, res) => {
  try {
    console.log(req.file);
    const { name, email } = req.body;
    let user = await User.findById(req.user._id);
    user.name = name || req.user.name;
    user.email = email || req.user.email;

    await user.save();
    successResponse(res, 'user info updated',   user);
  } catch (err) {
    errorResponse(res, 'editUser', err);
  }
}

//admin function
const deleteUser = async (req, res) => {
  try {
    successResponse(res, 'user info',   req.user);
  } catch (err) {
    errorResponse(res, 'deleteUser', err);
  }
}



module.exports = {
  getAllUsers,
  signup,
  loginUser,
  getMe,
  editUser,
  deleteUser
}
