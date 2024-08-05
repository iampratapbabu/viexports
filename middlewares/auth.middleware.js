const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../lib/response.handler');
const jwt = require('jsonwebtoken');
const CustomError = require('../lib/custom.error');


const protect = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];
    if (!token) throw new CustomError("auth_error", 400, "No Token Found");
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let user = await User.findById(decoded.id);
    if (!user) throw new CustomError("auth_error", 404, "No User Found")
    req.user = user;
    next();

  } catch (err) {
    errorResponse(res, 'protect middleare', err);
  }
}

const checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      next();
    } else {
      throw new CustomError("auth_error", 400, "Authorization Failed");
    }

  } catch (err) {
    errorResponse(res, 'checkAdmin ', err);
  }
}


module.exports = {
  protect,
  checkAdmin,
};