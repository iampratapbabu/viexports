const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddle = require("../middlewares/auth.middleware")

const router = express.Router();


router.route('/')
  .get(userController.getAllUsers)

//AUTH ROUTES
router.route('/signup')
  .post(userController.signup)

router.route('/login')
  .post(userController.loginUser)

router.route('/getme')
  .get(authMiddle.protect, userController.getMe)

//EDIT AND DELETE ROUTES
router.route('/single')
  .patch(authMiddle.protect,userController.editUser)
  .delete(authMiddle.protect, userController.deleteUser)





module.exports = router;
