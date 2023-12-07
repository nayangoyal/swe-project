const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const bookingSchema = new Schema({
    studentName:{
        type: String,
        required: true
    },
    studentEmail:{
        type: String,
        required: true
    },
    guestName:{
        type:String,
        required:true
    },
    numberOfGuests:{
        type:Number,
        default: 0
    },
    roomsBooked:{
        type:Array,
        required:true,
        default:[]
    },
    roomsRequired:{
        type:Number,
        required:true
    },
    purpose:{
        type:String,
    },
    arrivalTime:{
        type:Date,
        required:true
    },
    departureTime:{
        type:Date,
        required:true
    },
    status: {
        type: String,
        required: true,
        default:"requested"
    },
    cancel:{
        type:Boolean,
        default:false
    }
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking };
