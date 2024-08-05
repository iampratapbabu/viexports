const express = require('express');
const authMiddle = require("../middlewares/auth.middleware");
const bidController = require('../controllers/bid.controller');
const tenderController = require('../controllers/tender.controller')

const router = express.Router();

router.route('/')
.get(authMiddle.protect,tenderController.getAllTenders)
.post(authMiddle.protect,tenderController.createTender);

router.route('/public/all')
.get(authMiddle.protect,tenderController.getAllTendersPublic)


router.route('/:tenderId')
.get(authMiddle.protect,tenderController.getSingleTender);



module.exports = router;
