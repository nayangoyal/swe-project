const express = require('express');
const router = express.Router();

const { 
    verifyEmail, 
    verifyUserEmail 
} = require("../controllers/emailVerify.controllers");

router.route('/email_verify').post(async(req,res) =>{
    try{
        let { collegeEmailID } = req.body;
        
        const createdEmailVerificationOTP = await verifyEmail({collegeEmailID});

        res.status(200).json(createdEmailVerificationOTP);
    } catch(error)
    {
        res.status(400).send(error.message);
    }
});

router.route('/verify_email').post(async(req,res) => {
    try{
        console.log("success 11");
        let { collegeEmailID , otp } = req.body;
        console.log("success 21");
        if(!(collegeEmailID && otp))
        {
            throw Error("Empty otp details are not allowed");
            // res.json({ success: false, message: 'Empty otp details are not allowed' });
        }
        console.log("success 31");
        await verifyUserEmail({ collegeEmailID, otp });
        console.log("success 41");
        res.status(200).json({ success: true, collegeEmailID, verified: true});
    } catch(error)
    {
        res.status(400).send(error.message);
    }
})

module.exports = router;