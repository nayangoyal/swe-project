require("dotenv").config();
const mongoose = require("mongoose");

const { GHMS_URI } = process.env;

const connectToDB = async() => {
    try{
        await mongoose.connect(GHMS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    }catch(error)
    {
        console.log(error);
    }
}

connectToDB();