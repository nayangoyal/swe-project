const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const { 
    User,
    OTP,
    Faculty
}  = require("../models/user.models");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { hashData, verifyHashedData } = require("../utils/hashPassword");

const { AUTH_EMAIL } = process.env;

const newOTPGenerator = expressAsyncHandler(async({collegeEmailID, subject, message, duration = 1 }) => {
    try{

        if(!(collegeEmailID && subject && message))
        {
            throw Error("Provide values for email, subject, message");
        }

        // clear any old record
        await OTP.deleteOne({ collegeEmailID });

        //generate pin
        const generatedOTP = await generateOTP();
        console.log(generatedOTP);

        // send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: collegeEmailID,
            subject,
            html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        };
        console.log("success 1");
        await sendEmail(mailOptions);
        console.log("success 2");
        // save otp record
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            collegeEmailID,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    }catch(error)
    {
        throw error;
    }
});


const verifyOTPGenerated = expressAsyncHandler(async({ collegeEmailID, otp }) => {
    try{

        if(!(collegeEmailID && otp))
        {
            throw Error("Provide values for email, otp");
        }

        // ensure otp record exists
        const matchedOTPRecord = await OTP.findOne({ collegeEmailID });

        if(!matchedOTPRecord)
        {
            throw Error("No otp records found.");
        }

        const { expiresAt } = matchedOTPRecord;

        // checking for expired code
        if(expiresAt < Date.now())
        {
            await OTP.deleteOne({ collegeEmailID });
            throw Error("Code has expired. Request for a new one.");
        }

        // not expired yet, verify value
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashedData(otp, hashedOTP);

        return validOTP;
    }catch(error)
    {
        throw error;
    }
});

const deleteOTP = expressAsyncHandler(async({collegeEmailID}) => {
    try{
        await OTP.deleteOne({collegeEmailID});
    }catch(error)
    {
        throw error;
    }
})

module.exports = {newOTPGenerator, verifyOTPGenerated, deleteOTP};