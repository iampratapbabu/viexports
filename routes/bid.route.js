const express = require('express');
const authMiddle = require("../middlewares/auth.middleware");
const bidController = require('../controllers/bid.controller');
const tenderController = require('../controllers/tender.controller')

const router = express.Router();

router.route('/')
.get(authMiddle.protect,bidController.getAllBids)
.post(authMiddle.protect,bidController.createBid);


router.route('/:bidId')
.get(authMiddle.protect,bidController.getSingleBid)


module.exports = router;
