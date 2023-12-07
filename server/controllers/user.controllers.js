const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const {ADMIN_EMAIL, ADMIN_PASSWORD} = process.env;
const {
    User,
    Faculty
} = require("../models/user.models")
const {
    hashData,
    verifyHashedData    
} = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const auth = require("../middleware/auth");
const { verifyEmail } = require("../controllers/emailVerify.controllers");
const {Booking} = require("../models/booking.models")
const verificationExpiresAt = new Date();
// verificationExpiresAt.setHours(verificationExpiresAt.getHours());


//Signup
const newRegisterUser = expressAsyncHandler(async (req, res) => {
    try{
        let {fullName, collegeEmailID, password} = req.body;
        fullName = fullName.trim();
        collegeEmailID = collegeEmailID.trim();
        password = password.trim();

        const domain = collegeEmailID.substring(collegeEmailID.length - 12);
      console.log(domain);


        if(!(fullName && collegeEmailID && password))
        {
            // throw Error("Empty input fields!");
            res.json({ success: false, message: 'Empty input fields!' });
        }else if(domain !== "lnmiit.ac.in")
        {
            // throw Error("Only people belonging to LNMIIT Jaipur can register");
            res.json({ success: false, message: 'Only people belonging to LNMIIT Jaipur can register' });
        }else if(password.length<8)
        {
            // throw Error("Password is too short!");
            res.json({ success: false, message: 'Password is too short!' });
        }else{

            console.log("success 1");
            // good credentials, create new user
            const existingUser = await User.findOne({collegeEmailID});
            console.log("sucess 2");
            //Checking if user already exists
            if(existingUser){
                // throw Error("User with the provided email already exists");
                res.json({ success: false, message: 'User with the provided email already exists' });
            }

            // hash password
            console.log(verificationExpiresAt);
            const hasedPassword = await hashData(password);
            const newUser = new User({
                fullName,
                collegeEmailID,
                password: hasedPassword,
                verificationExpiresAt,
            });

            //save user
            const newusers = await newUser.save();
            console.log("SignUp Success");
            
            await verifyEmail(collegeEmailID);
            res.status(200).json({success: true, newusers});
        }
    }catch (error)
    {
        res.status(400).send(error.message);
    }
});


// Signin or Login
const authUser = expressAsyncHandler(async (req,res) => {
    try{
        let {collegeEmailID, password} = req.body;
        collegeEmailID = collegeEmailID.trim();
        password = password.trim();

        if(!(collegeEmailID && password))
        {
            // throw Error("Empty credentials supplied!");
            res.json({ success: false, message: 'Empty credentials supplied!' });
        }


        const fetchUser = await User.findOne({ collegeEmailID });

        if(!fetchUser)
        {
            // throw Error("Invalid collegeEmailID enerted!");
            res.json({ success: false, message: 'Invalid collegeEmailID enerted!' });
        }

        if(!fetchUser.verified)
        {
            // throw Error("Email hasn't been verified yet. Check your inbox.");
            res.json({ success: false, message: "Email hasn't been verified yet. Check your inbox." });
        }
        const hashedPassword = fetchUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if(!passwordMatch)
        {
            // throw Error("Invalid password entered!");
            res.json({ success: false, message: "Invalid password entered!" });
        }

        // create user token
        const tokenData = {userID: fetchUser._id, collegeEmailID};
        const token = await createToken(tokenData);

        //assign user token
        fetchUser.token = token;
        console.log("Login Sucess1");
        if(collegeEmailID===ADMIN_EMAIL)
        {
            // const passwordMatch = await verifyHashedData(password, ADMIN_PASSWORD);
            // if(passwordMatch)
            // {
                res.status(200).json({success: true, role: 'Admin', user: fetchUser});
                console.log(fetchUser);
            // }
            
        }else
        {
            res.status(200).json({success: true, role: 'user', user: fetchUser});
            console.log(fetchUser);
        }
        
    }catch(error)
    {
        res.status(400).send(error.message);
    }
})

const checkingForUser = expressAsyncHandler(async (req, res) => {
    res.status(200).send(`You're in the private territory of ${req.currentUser.collegeEmailID}`);
});

const profile = expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const { history } = user;
    let bookings = [];
    //guestName roomsBooked arrivalTime departureTime cancel
    for (let bookingId of history) {
      let booking = await Booking.findById(bookingId, {
        guestName: 1,
        roomsBooked: 1,
        arrivalTime: 1,
        departureTime: 1,
        status: 1,
        cancel: 1,
        _id: 0,
      });
      bookings.push(booking);
    }
    res.status(201).json(bookings);
  });

module.exports = {newRegisterUser, authUser, checkingForUser, profile};