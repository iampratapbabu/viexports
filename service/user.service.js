const CustomError = require('../lib/custom.error');
const User = require('../models/user.model');



exports.getAllUsers = async() =>{
    try{
        return await User.find();
    }catch(err){
        throw err;
    }
}