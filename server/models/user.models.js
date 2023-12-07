const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const StudentSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    collegeEmailID:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type: String,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationExpiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
    history:{
        type:Array,
        default:[]
    }
});

const FacultySchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    collegeEmailID:{
        type: String,
        required: true,
        unique: true
    },
    department:{
        type: String,
        enum: ["development", "creative", "management", "gamedev", "cp", "aiml"],
        required: true,
    }
});

const OTPSchema = new Schema({
    collegeEmailID:{
        type: String,
        unique: true,
    },
    otp:{
        type: String,
    },
    createdAt:{
        type:Date,
    },
    expiresAt:{
        type:Date,
    }
})

const User = mongoose.model('student', StudentSchema);
const Faculty = mongoose.model('facultystudent', FacultySchema);
const OTP = mongoose.model('OTP', OTPSchema);
module.exports = {User, Faculty, OTP};