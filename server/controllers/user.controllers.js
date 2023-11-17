const expressAsyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
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
            throw Error("Empty input fields!");
        }else if(domain !== "lnmiit.ac.in")
        {
            throw Error("Only people belonging to LNMIIT Jaipur can register");
        }else if(password.length<8)
        {
            throw Error("Password is too short!");
        }else{

            console.log("success 1");
            // good credentials, create new user
            const existingUser = await User.findOne({collegeEmailID});
            console.log("sucess 2");
            //Checking if user already exists
            if(existingUser){
                throw Error("User with the provided email already exists");
            }

            // hash password
            const hasedPassword = await hashData(password);
            const newUser = new User({
                fullName,
                collegeEmailID,
                password: hasedPassword,
            });

            //save user
            const newusers = await newUser.save();
            console.log("SignUp Success");
            
            await verifyEmail(collegeEmailID);
            res.status(200).json(newusers);
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
            throw Error("Empty credentials supplied!");
        }

        const fetchUser = await User.findOne({ collegeEmailID });

        if(!fetchUser)
        {
            throw Error("Invalid collegeEmailID enerted!");
        }

        if(!fetchUser.verified)
        {
            throw Error("Email hasn't been verified yet. Check your inbox.");
        }
        const hashedPassword = fetchUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if(!passwordMatch)
        {
            throw Error("Invalid password entered!");
        }

        // create user token
        const tokenData = {userID: fetchUser._id, collegeEmailID};
        const token = await createToken(tokenData);

        //assign user token
        fetchUser.token = token;
        console.log("Login Sucess");
        res.status(200).json(fetchUser);
    }catch(error)
    {
        res.status(400).send(error.message);
    }
})

const checkingForUser = expressAsyncHandler(async (req, res) => {
    res.status(200).send(`You're in the private territory of ${req.currentUser.collegeEmailID}`);
})

module.exports = {newRegisterUser, authUser, checkingForUser};