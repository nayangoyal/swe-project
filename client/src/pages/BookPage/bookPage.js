// import React from 'react'
// // import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from 'axios';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./bookPage.css";

// export const BookNow = () => {
//   const [guestName, setGuestName] = useState(null);
//   const [studentName, setStudentName] = useState(null);
//   const [studentEmail, setStudentEmail] = useState(null);
//   const [numberOfGuests, setNumberOfGuests] = useState(null);
//   const [numberOfRoomsRequired, setNumberOfRoomsRequired] = useState(null);
//   const [purpose, setPurpose] = useState(null);
//   const [arrivalTime, setArrivalTime] = useState(new Date());
//     const [departureTime, setDepartureTime] = useState(new Date());
//     const [singleRoom, setSingleRoom] = useState(null);
//     const [doubleRoom, setDoubleRoom] = useState(null);
//     // const [singleRoomAvail, setSingleRoomAvail] = useState(0);
//     // const [doubleRoomAvail, setDoubleRoomAvail] = useState(0);

//   // const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem('userToken');
//   console.log(token);
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   console.log(guestName);
//   console.log(numberOfGuests);
//   console.log(arrivalTime);
//   console.log(departureTime);
//   console.log(singleRoom);
//   console.log(doubleRoom);
//   console.log(purpose);

//   const handleSubmit = async(e) => {
    
//     axios.post('http://localhost:5000/roombook/bookRoom', {
//     studentName: studentName,
//     studentEmail: studentEmail,
//     guestName: guestName,
//     numberOfGuests: numberOfGuests,
//     roomsRequired: numberOfRoomsRequired,
//     purpose: purpose,
//     arrivalTime: arrivalTime,
//     departureTime: departureTime,
//     singleRoom: singleRoom,
//     doubleRoom: doubleRoom,
    
//     })
//     .then(response => {
//       console.log('Booking Done')
//       navigate('../')
//         toast.success('Booking done successfully!', { autoClose: 3000 });
//     })
//     .catch(err => {
//       console.log("success 11");
//       console.log(err)
//       toast.error(`${err}`, { autoClose: 3000 });
//     })

    
//   }

//   const handleArrivalTimeChange = (date) => {
//     setArrivalTime(date);
//   };

//   const handleDepartureTimeChange = (date) => {
//     setDepartureTime(date);
//   };

//   const handleSingleRoom = (e) => {
//     setSingleRoom(e.target.value);
//   };

//   const handleDoubleRoom = (e) => {
//     setDoubleRoom(e.target.value);
//   };

//   return(
//     <div className='book-page'>
//       <div className='filldetails'>
//         <h3>Fill in the details</h3>
//         <form className='form-book'>
//           <div className='form-body'>
//             <div className='studentname'>
//               <label className="form__label" for="studentName">Student Name</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="text" 
//                 value={studentName} 
//                 onChange = {(e) => setStudentName(e.target.value)}
//                 id="studentName" />
//             </div>
//             <div className='studentemail'>
//               <label className="form__label" for="studentEmail">Student College Email</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="text" 
//                 value={studentEmail} 
//                 onChange = {(e) => setStudentEmail(e.target.value)}
//                 id="studentEmail" />
//             </div>
//             <div className='guestname'>
//               <label className="form__label" for="guestName">Guest Name</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="text" 
//                 value={guestName} 
//                 onChange = {(e) => setGuestName(e.target.value)}
//                 id="guestName" />
//             </div>
//             <div className='numberofguests'>
//               <label className="form__label" for="numberOfGuests">Number of guests</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="number" 
//                 value={numberOfGuests} 
//                 onChange = {(e) => setNumberOfGuests(e.target.value)}
//                 id="numberOfGuests" />
//             </div>
//             <div className='roomsrequired'>
//               <label className="form__label" for="roomsRequired">Number of Rooms Required</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="number" 
//                 value={numberOfRoomsRequired} 
//                 onChange = {(e) => setNumberOfRoomsRequired(e.target.value)}
//                 id="numberOfGuests" />
//             </div>
//             <div className="arrivaldate dates">
//               <p className='date-text' style={{marginBottom: "10px"}}>Arrival Date</p>
//               <DatePicker
//                 className='date-input'
//                 required
//                 selected={arrivalTime}
//                 onChange={handleArrivalTimeChange}
//                 dateFormat='dd/MM/yyyy'
//               />
//             </div>
//             <div className="departuredate dates">
//               <p className='date-text' style={{marginBottom: "10px"}}>Departure Date</p>
//               <DatePicker
//                 className='date-input'
//                 required
//                 selected={departureTime}
//                 onChange={handleDepartureTimeChange}
//                 dateFormat='dd/MM/yyyy'
//               />
//             </div>
//             <div className='singleroom'>
//               <label className="form__label" for="singleRoom">Single Rooms</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="number" 
//                 value={singleRoom} 
//                 onChange = {handleSingleRoom}
//                 id="singleRoom" />
//             </div>
//             <div className='doubleroom'>
//               <label className="form__label" for="doubleRoom">Double Rooms</label>
//               <input 
//                 required
//                 className="form__input" 
//                 type="number" 
//                 value={doubleRoom} 
//                 onChange = {handleDoubleRoom} 
//                 id="doubleRoom" />
//             </div>
//             <div className='purpose'>
//               <label className="form__label" for="purpose">Purpose</label>
//               <textarea
//                 required
//                 value={purpose}
//                 onChange={(e) => setPurpose(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="form-submit">
//               <input type="button" value="Book the room" className="btn btn-primary" onClick={handleSubmit}/>
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className='book-detail-history'>
//           <h3>Booking History</h3>
//       </div>
//     </div>
//   )
// }

// export default BookNow;




///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bookPage.css';

export const BookNow = () => {
  const [guestName, setGuestName] = useState(null);
  const [studentName, setStudentName] = useState(null);
  const [studentEmail, setStudentEmail] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [numberOfRoomsRequired, setNumberOfRoomsRequired] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());
  const [doubleRoom, setDoubleRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [displayedBookings, setDisplayedBookings] = useState(7);

  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    const storedStudentEmail = localStorage.getItem('userEmail');
    const storedStudentName = localStorage.getItem('userName');

    if (storedStudentEmail) {
      setStudentEmail(storedStudentEmail);
    }
    if (storedStudentName) {
      setStudentName(storedStudentName);
    }
    fetchBookingDetails();
  }, []);

  const handleSeeMore = () => {
    // Update the number of displayed bookings when "See More" is clicked
    setDisplayedBookings(displayedBookings + 7);
  };

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/authentication/profile');
      setBookingDetails(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const getCardStatusColor = (booking) => {
    if (booking){
      if (booking.status === 'cancelled') {
        return 'cancelled';
      } else if (booking.status === 'accepted') {
        return 'accepted';
      } else if (booking.status === 'requested') {
        return 'requested';
      }
    // Default color for other cases
      return 'default-color';
    }
  };
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/roombook/bookRoom', {
        studentName: studentName,
        studentEmail: studentEmail,
        guestName: guestName,
        numberOfGuests: numberOfGuests,
        roomsRequired: numberOfRoomsRequired,
        purpose: purpose,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        doubleRoom: doubleRoom,
      });

      console.log("success 11");

      if (response.data.success) {
        toast.success('Booking done successfully!', { autoClose: 3000 });
        console.log("success 1");
        navigate('/thankyou');
      } else {
        toast.error(`${response.data.message}`, { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      console.log("not Possible");
      toast.error(`${error}`, { autoClose: 3000 });
    }
  };

  const handleArrivalTimeChange = (date) => {
    setArrivalTime(date);
  };

  const handleDepartureTimeChange = (date) => {
    setDepartureTime(date);
  };

  const handleDoubleRoom = (e) => {
    setDoubleRoom(e.target.value);
  };
  const showBookings = () =>{
    if ( bookingDetails.length > 0 ){
    return(
      bookingDetails.slice(0, displayedBookings).map((booking, index) => (
          <div
            key={index}
            className={`booking-card ${getCardStatusColor(booking)}`}
          >
            <p>Guest Name: {booking.guestName}</p>
            <p>Rooms Booked: {booking.roomsBooked.join(', ')}</p>
            <p>Arrival Time: {booking.arrivalTime}</p>
            <p>Departure Time: {booking.departureTime}</p>
            <p>Status: {booking.status}</p>
          </div>
          )
        ))}
       return <></>; 
  }

  return (
    <div className='book-page'>
      <ToastContainer />

      <div className='filldetails'>
        <h3>Fill in the details</h3>
        <form className='form-book'>
          {/* ... (rest of your form) */}
          <div className='form-body'>
              <div className='studentname'>
               <label className="form__label" for="studentName">Student Name</label>
                <input 
                  required
                  className="form__input" 
                  type="text" 
                  value={JSON.parse(studentName)} 
                  onChange = {(e) => setStudentName(e.target.value)}
                  id="studentName"
                  disabled={Boolean(studentName)} />
              </div>
              <div className='studentemail'>
                <label className="form__label" for="studentEmail">Student College Email</label>
                <input 
                  required
                  className="form__input" 
                  type="text" 
                  value={JSON.parse(studentEmail)} 
                  onChange = {(e) => setStudentEmail(e.target.value)}
                  id="studentEmail"
                  disabled={Boolean(studentEmail)}
                  />
              </div>
              <div className='guestname'>
                <label className="form__label" for="guestName">Guest Name</label>
                <input 
                  required
                  className="form__input" 
                  type="text" 
                  value={guestName} 
                  onChange = {(e) => setGuestName(e.target.value)}
                  id="guestName" />
              </div>
              <div className='numberofguests'>
                <label className="form__label" for="numberOfGuests">Number of guests</label>
                <input 
                  required
                  className="form__input" 
                  type="number" 
                  value={numberOfGuests} 
                  onChange = {(e) => setNumberOfGuests(e.target.value)}
                  id="numberOfGuests" />
              </div>
              <div className='roomsrequired'>
                <label className="form__label" for="roomsRequired">Number of Rooms Required</label>
                <input 
                  required
                  className="form__input" 
                  type="number" 
                  value={numberOfRoomsRequired} 
                  onChange = {(e) => setNumberOfRoomsRequired(e.target.value)}
                  id="numberOfGuests" />
              </div>
              <div className="arrivaldate dates">
                <p className='date-text' style={{marginBottom: "10px"}}>Arrival Date</p>
                <DatePicker
                className='date-input'
                required
                selected={arrivalTime}
                onChange={handleArrivalTimeChange}
                dateFormat='dd/MM/yyyy'
                />
              </div>
              <div className="departuredate dates">
                <p className='date-text' style={{marginBottom: "10px"}}>Departure Date</p>
                <DatePicker
                className='date-input'
                required
                selected={departureTime}
                onChange={handleDepartureTimeChange}
                dateFormat='dd/MM/yyyy'
                />
              </div>
                <div className='doubleroom'>
                  <label className="form__label" for="doubleRoom">Double Rooms</label>
                  <input 
                  required
                  className="form__input" 
                  type="number" 
                  value={doubleRoom} 
                  onChange = {handleDoubleRoom} 
                  id="doubleRoom" />
              </div>
              <div className='purpose' style={{display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px"
              }}>
                <label className="form__label" for="purpose">Purpose</label>
                <textarea
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                ></textarea>
              </div>
            <div className='form-submit'>
              <input
              type='button'
              value='Book the room'
              className='btn btn-primary'
              onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>

      <div className='book-detail-history'>
        <h3>Booking History</h3>
        <div className='booking-cards'>
          {bookingDetails.slice(0, displayedBookings).map((booking, index) => (
            <div
              key={index}
              className={`booking-card ${getCardStatusColor(booking)}`}
            >
              <p>Guest Name: {booking.guestName}</p>
              <p>Rooms Booked: {booking.roomsBooked.join(', ')}</p>
              <p>Arrival Time: {booking.arrivalTime}</p>
              <p>Departure Time: {booking.departureTime}</p>
              <p>Status: {booking.status}</p>
            </div>
          ))}
          {/* {showBookings} */}
        </div>
        {bookingDetails.length > displayedBookings && (
          <button className="see-more-btn" onClick={handleSeeMore}>
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default BookNow;
