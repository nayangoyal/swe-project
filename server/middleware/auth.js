const jwt = require("jsonwebtoken");
const {User} = require("../models/user.models");
const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    // const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            console.log("success 1");
          token = req.headers.authorization.split(" ")[1];
          console.log("success 1");
          console.log(JSON.parse(token));
          console.log(token);
          console.log(TOKEN_KEY);
          const decoded = jwt.verify(JSON.parse(token), TOKEN_KEY);

          console.log(decoded)
          req.user = await User.findById(decoded.userID).select("-password");
        //   req.user = decoded.user;
          console.log(req.user);
          next();
        } catch (error) {
          console.log(error);
          res.status(401);
          throw new Error("not authorized token failed");
        }
    }
    // // verify token
    // try{
    //     const decodedToken = await jwt.verify(token, TOKEN_KEY);
    //     req.currentUser = decodedToken;
    // }catch(error)
    // {
    //     return res.status(401).send("Invalid Token provided");
    // }

    // // proceed with request
    // req.user = await User.findById(decoded.id).select("-password");
    // return next();
}

module.exports = verifyToken;