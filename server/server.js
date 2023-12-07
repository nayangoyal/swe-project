// mongodb
require("./config/db");
// require('./utils/cron');
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const { PORT } = process.env;

// create server app
const app = express();

app.use(cors());
app.use(bodyParser());

app.use('/authentication', require('./routes/user.routes'));
app.use('/otp', require("./routes/userOTP.routes"));
app.use('/emailverify', require("./routes/emailVerify.routes"));
app.use('/roombook', require("./routes/room.routes"));

const startApp = () =>{
    app.listen(PORT, ()=>{
        console.log(`GHMS Backend running on port ${PORT}`);
    });
};

startApp();
// module.exports = app;