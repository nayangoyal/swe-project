const express = require("express");
const router = express.Router();
const {
  bookRoom,
  checkAvailability,
  createRoom,
  cancelBooking,
  acceptRequest,
  availableRequest,
} = require("../controllers/roomBooking.controllers");

const verifyToken = require("../middleware/auth");



// checked
router.route("/bookRoom").post(verifyToken, bookRoom);
// check room api checked
router.route("/checkRoom").get(verifyToken, checkAvailability);
// create rom api checked
router.route("/createRoom").post(verifyToken, createRoom);
router.route("/cancelBooking").post(verifyToken, cancelBooking);

// This below route is checked
router.route("/acceptRequest").post(verifyToken, acceptRequest);
// This below route is checked
router.route("/availableRequest").get(availableRequest);


module.exports = router;