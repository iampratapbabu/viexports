const axios = require("axios");

const User = require('../models/user.model');
const Tender = require('../models/tender.model');
const Bid = require('../models/bid.model');
const { errorResponse, successResponse } = require('../lib/response.handler');

//get all tenders
const getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find({ user: req.user._id });
        successResponse(res, 'bid fetched',   { totalBids: bids.length, bids });

    } catch (err) {
        errorResponse(res, 'getAllBids', err);
    }
}


const createBid = async (req, res) => {
    try {
        if(req.user.role == "ADMIN"){
            throw new CustomError("auth_error", 400, "Not Authorized To Create Bid");

        }
        const { tenderId, amount, companyName,placedinBufferTime } = req.body;
        const bid = new Bid({
            user: req.user._id,
            tender: tenderId,
            amount,
            companyName,
            placedinBufferTime

        });

        await bid.save();
        successResponse(res, 'bid created',   bid);

    } catch (err) {
        errorResponse(res, 'createBid', err);
    }
}


const getSingleBid = async (req, res) => {
    try {
        const { bidId } = req.params;

        const bid = await Bid.findById(bidId).populate('tender');
        successResponse(res, 'bid fetched',   bid);

    } catch (err) {
        errorResponse(res, 'getSingleBid', err);
    }
}


module.exports = {
    getAllBids,
    createBid,
    getSingleBid
}