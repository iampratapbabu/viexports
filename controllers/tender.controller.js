const User = require('../models/user.model');
const Tender = require('../models/tender.model');
const Bid = require('../models/bid.model');
const { errorResponse, successResponse } = require('../lib/response.handler');
const axios = require("axios");

//get all tenders
const getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find({ user: req.user._id });
        successResponse(res, 'tender fetched',   { totalTenders: tenders.length, tenders });

    } catch (err) {
        errorResponse(res, 'getAllTenders', err);
    }
}

const getAllTendersPublic = async (req, res) => {
    try {
        const tenders = await Tender.find().lean();

        for(let singleTender of tenders){
            const lowestBid = await Bid.aggregate(
                [
                    {
                        $match: { tender: singleTender._id }
                    },
                    { $sort: { amount: 1 } },
                    { $limit: 1 },
                    //{ $set: { "status": 1 } }
                ]
            )
            singleTender.lowestBidAmount = lowestBid[0] ?lowestBid[0]?.amount : 0;
        }

 
        successResponse(res, 'tender fetched',   { totalTenders: tenders.length, tenders });

    } catch (err) {
        errorResponse(res, 'getAllTenders', err);
    }
}


const createTender = async (req, res) => {
    try {
        const { name, desc, startTime, endTime, bufferTime } = req.body;
        if (req.user.role != "ADMIN") {
            throw new CustomError("auth_error", 400, "Not Authorized to Create Tender")

        }
        const tender = new Tender({
            user: req.user._id,
            name,
            desc,
            startTime,
            endTime,
            bufferTime

        });

        // tender.user = req.user._id;
        await tender.save();
        successResponse(res, 'tender created',   tender);

    } catch (err) {
        errorResponse(res, 'createTender', err);
    }
}

//get singlet tender with all bids with their respective users
const getSingleTender = async (req, res) => {
    try {
        const { tenderId } = req.params;
        const tender = await Tender.findById(tenderId);
        const bids = await Bid.find({ tender: tenderId }).sort('amount').populate('user');
        successResponse(res, 'tender fetched',   { tender: tender, totalBids: bids.length, bids });

    } catch (err) {
        errorResponse(res, 'getSingleTender', err);
    }
}


module.exports = {
    getAllTenders,
    getAllTendersPublic,
    createTender,
    getSingleTender
}