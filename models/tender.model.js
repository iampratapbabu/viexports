const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  name:{
        type:String,
        required:[true,'name is required'],
    },
   
    desc:{
        type:String,
        required:[true,"Please Provide the Blog body"]
    },
    startTime:{
        type:Date,
        default:Date.now(),
    },
    endTime:{
        type:Date,
        default:Date.now(),
    },
    bufferTime:{
        type:Date,
        default:Date.now(),
    },
    bufferType:{
        type:String,
        default:"M", //M,S,D
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
},
    //this is used for virtual populating
    {
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }

);

const Tender = mongoose.model('Tender',tenderSchema);

module.exports = Tender;
