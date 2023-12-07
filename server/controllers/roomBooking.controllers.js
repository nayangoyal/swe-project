const expressAsyncHandler = require("express-async-handler");
const {User} = require("../models/user.models");
const {Room} = require("../models/room.models");
const {Booking} = require("../models/booking.models");

const compareDates = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  if (date1.getTime() <= date2.getTime()) return true;
  return false;
};

const checkRoom = (room, arrivalTime, departureTime) => {
  let flag = true;
  room.bookedSlots.forEach((slot) => {
    if (
      compareDates(departureTime, slot.arrivalTime) == false &&
      compareDates(slot.departureTime, arrivalTime) == false
    ) {
      flag = false;
    }
  });
  return flag;
};

const addSlotsInRoom = async (roomId, arrivalTime, departureTime) => {
  const room = await Room.findOne({ roomId });
  room.bookedSlots.push({ arrivalTime, departureTime });
  await room.save();
};

// Checking For Room Availability
const checkAvailability = expressAsyncHandler(async (req, res) => {
  console.log(req.query);
  let { arrivalTime, departureTime } = req.query;
  console.log(arrivalTime);
  console.log(departureTime);

  const ArrivalDate = new Date(arrivalTime);
  const DeparturedDate = new Date(departureTime);
  console.log(ArrivalDate);
  console.log(DeparturedDate);
  if(ArrivalDate > DeparturedDate)
  {
    // res.status(600);
    res.json({ success: false, message: 'Arrival Date is more than Departure Date' });
    throw Error(200);
  }
  const PresentDate = new Date();
  const dateDifference = DeparturedDate - ArrivalDate;
  const checkDayDifference = ArrivalDate - PresentDate; 
  const daysDifference = dateDifference / (1000 * 60 * 60 * 24);
  const newCheckDayDifference = checkDayDifference / (1000 * 60 * 60 * 24);
  const isWithin7Days = daysDifference < 8 && daysDifference > 0;
  const isWithin = newCheckDayDifference < 8 && newCheckDayDifference >0;

  
  if(ArrivalDate < PresentDate || !isWithin)
  {
    res.json({ success: false, message: 'You have submitted wrong Arrival Date which is less Than Present Date or Within 7 days!' });
    throw Error(200);
    
  }

  

  if(!isWithin7Days)
  {
    res.json({ success: false, message: `You are not able to book Room for these ${isWithin7Days} Days!` });
    throw Error(200);
  }

  const rooms = await Room.find({});
  availableDoubleRoom = 0;
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    
    if (checkRoom(room, arrivalTime, departureTime)) {
      ++availableDoubleRoom;
    }
    
  }
  const data = {};
  data.doubleRoom = availableDoubleRoom;
  console.log(data);
  res.status(201).json({success: true, message:`The available Rooms is ${availableDoubleRoom}`, data});
});

// For Booking Room
const bookRoom = expressAsyncHandler(async (req, res) => {
  let user = req.user;
  console.log('user1', user);
  const userId = user._id;
  console.log('user2',user);
  let {
    studentName,
    studentEmail,
    guestName,
    numberOfGuests,
    roomsRequired,
    purpose,
    arrivalTime,
    departureTime,
    doubleRoom,
  } = req.body;
  console.log(req.body);

  if(!studentName || !studentEmail || !guestName || !numberOfGuests || !roomsRequired || !purpose || !doubleRoom || doubleRoom<= 0  || roomsRequired !== doubleRoom || numberOfGuests <= 0 || Math.floor(roomsRequired) !== Math.ceil(roomsRequired) || Math.floor(numberOfGuests) !== Math.ceil(numberOfGuests) || Math.floor(doubleRoom) !== Math.ceil(doubleRoom))
  {
    res.json({ success: false, message: 'You have submitted Incomplete/Invalid details!' });
    throw Error(200);
  }


  const ArrivalDate = new Date(arrivalTime);
  const DeparturedDate = new Date(departureTime);
  if(ArrivalDate > DeparturedDate)
  {
    // res.status(600);
    res.json({ success: false, message: 'You have submitted wrong Arrival Date!' });
    throw Error(200);
  }
  const PresentDate = new Date();
  const dateDifference = DeparturedDate - ArrivalDate;
  const checkDayDifference = ArrivalDate - PresentDate; 
  const daysDifference = dateDifference / (1000 * 60 * 60 * 24);
  const newCheckDayDifference = checkDayDifference / (1000 * 60 * 60 * 24);
  const isWithin7Days = daysDifference < 8 && daysDifference > 0;
  const isWithin = newCheckDayDifference < 8 && newCheckDayDifference >0;

  
  if(ArrivalDate < PresentDate || !isWithin)
  {
    res.json({ success: false, message: 'You have submitted wrong Arrival Date!' });
    throw Error(200);
    
  }

  

  if(!isWithin7Days)
  {
    res.json({ success: false, message: `You are not able to book Room for these ${isWithin7Days} Days!` });
    throw Error(200);
  }

  if(roomsRequired > 2 && roomsRequired <= 0)
  {
    res.json({ success: false, message: `You cannot Book ${roomsRequired} Rooms`})
    throw Error(200);
  }

  console.log("success 1");
  const rooms = await Room.find({});
  const doubleRooms = [];
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    
    if (doubleRoom > 0 && checkRoom(room, arrivalTime, departureTime)) {
      doubleRooms.push(room.roomId);
      doubleRoom--;
    }
    
  }
  console.log("success 2");
  if (doubleRoom > 0) {
    res.json({ success: false, message: 'We have insufficient rooms'})
    throw Error(200);
  }

  console.log("success 3");
  const booking = await Booking.create({
    studentName,
    studentEmail,
    guestName,
    numberOfGuests,
    roomsRequired,
    purpose,
    arrivalTime,
    departureTime
  });

  console.log("success 4");

  console.log("success 5");
  doubleRooms.forEach((roomId) => {
    booking.roomsBooked.push(roomId);
  });

  console.log("success 6");
  await booking.save();
  user = await User.findById(userId);
  user.history.push(booking._id);
  await user.save();

  console.log("success 7");

  console.log("success 8");
  for (const roomId of doubleRooms) {
    await addSlotsInRoom(roomId, arrivalTime, departureTime);
  }
  
  console.log("success 9");
  const data = {};

  console.log("success 10");
  data.bookingId = booking._id;
  data.doubleRooms = doubleRooms;

  console.log("success 11");
  res.status(201).json({success: true, data});
});

const removeSlotsFromRoom = async (roomId, arrivalTime, departureTime) => {
  const room = await Room.findOne({ roomId });
  // console.log(room);
  // console.log("Hii");
  for (let i = 0; i < room.bookedSlots.length; i++) {
    const slot = room.bookedSlots[i];
    console.log(slot);
    if (
      Date(slot.arrivalTime) === Date(arrivalTime) &&
      Date(slot.departureTime) === Date(departureTime)
    ) {
      console.log(slot);

      const show = room.bookedSlots.splice(i, 1);
      console.log(show);
    }
  }
  await room.save();
};

//below checked
const availableRequest = expressAsyncHandler(async (req, res) => {
  const bookings = await Booking.find({});
  const request = [];
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];

    // if (booking.status === "requested") {
      request.push(booking);
    // }
  }
  res.status(201).json(request);
});

// below checked
const acceptRequest = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  const booking = await Booking.findOne({ _id });
  console.log('Booking', booking);
  if (!booking) {
    throw new Error("No such booking found");
  }
  booking.status = "accepted";
  // add logic for booking the room
  await booking.save();
  res.status(200).json({ message: "Successfully booked" });
});

const cancelBooking = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;
  // console.log(_id);
  const booking = await Booking.findOne({ _id });
  console.log("success 1");
  // console.log(booking);
  if (booking.status === "cancelled") {
    throw new Error("Booking is alredy cancelled");
  }
  console.log("success 2");
  if (!booking) {
    throw new Error("No such booking found");
  }
  console.log("success 3");
  booking.status = "cancelled";
  booking.cancel = true;

  console.log("success 4");
  booking.cancelled = true;
  await booking.save();

  console.log("success 5");
  booking.roomsBooked.forEach(async (roomId) => {
    await removeSlotsFromRoom(
      roomId,
      booking.arrivalTime,
      booking.departureTime,
    );
  });

  console.log("success 6");
  res.status(200).json({ message: "Successfully cancelled" });
});

// below checked
const createRoom = expressAsyncHandler(async (req, res) => {
  let { roomId, type } = req.body;
  type = type.toLowerCase();
  console.log("success 1");
  if (!roomId || !type) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  console.log("success 2");
  let flag = type == "double";
  console.log("success 3");
  if (flag == 0) {
    res.status(400);
    throw new Error("Please only select double");
  }
  console.log("success 4");
  const room = await Room.create({ roomId, type });
  await room.save();
  console.log("success 5");
  // const roomExist=await Room.find
  res.status(201).json({ message: "sucess Room Created" });
});
module.exports = {
  bookRoom,
  checkAvailability,
  createRoom,
  cancelBooking,
  acceptRequest,
  availableRequest,
};