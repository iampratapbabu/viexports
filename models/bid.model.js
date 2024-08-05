const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    tender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tender'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    amount:{
        type:Number,
        required: [true, "Please Provide the amount"]
    },

    companyName:{
        type:String,
        required: [true, "Please Provide the company name"]
    },

    placedinBufferTime:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
 
},
    //this is used for virtual populating
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

);

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
