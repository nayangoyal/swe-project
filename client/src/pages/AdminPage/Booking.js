// import React,{useEffect, useState} from 'react'
// import axios from "axios";
// import "./Booking.css"

// const Booking = () => {

//     const [data, setData] = useState();

//     const getAvailableRequest = async () => {
//         const response = await axios.get(
//             "http://localhost:5000/roombook/availableRequest",
//         );
//         setData(response.data);
//         console.log(response.data);
//     };

//     useEffect(() => {
//         getAvailableRequest();
//     }, []);

//     console.log(data);
//     useEffect(() => {
//         if (data !== null && data !== undefined) {
//             console.log(data.toString());
//         }
//     }, [data]);

//     // if (!token) {
//     //     return <div>No user info available</div>;
//     // }

    

//     return(
//         <div className='row'>
//             <div className='col-md-10'>
//                     <h1>Bookings</h1>
//                     <div className="data-container">
//       {data.map((item, index) => (
//         <div key={index} className="data-item">
//           <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
//           <p><strong>Departure Time:</strong> {item.departureTime}</p>
//           <p><strong>Guest Name:</strong> {item.guestName}</p>
//           <p><strong>Number of Guests:</strong> {item.numberOfGuests}</p>
//           <p><strong>Purpose:</strong> {item.purpose}</p>
//           <p><strong>Rooms Booked:</strong> {item.roomsBooked.join(', ')}</p>
//           <p><strong>Rooms Required:</strong> {item.roomsRequired}</p>
//           <p><strong>Status:</strong> {item.status}</p>
//           <p><strong>Student Email:</strong> {item.studentEmail}</p>
//           <p><strong>Student Name:</strong> {item.studentName}</p>
//           {item.status === 'requested' && (
//             <div className="button-container">
//               <button className="accept-button" onClick={() => {/* handle accept */}}>Accept</button>
//               <button className="cancel-button" onClick={() => {/* handle cancel */}}>Cancel</button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//             </div>
//         </div>
//     )
// }

// export default Booking;


import React,{useEffect, useState} from 'react'
import axios from "axios";
import "./Booking.css"

const Booking = () => {

    const [data, setData] = useState([]);

    const token = localStorage.getItem('userToken');
    console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const getAvailableRequest = async () => {
        const response = await axios.get(
            "http://localhost:5000/roombook/availableRequest",
        );
        setData(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getAvailableRequest();
    }, []);

    console.log(data);
    useEffect(() => {
        if (data !== null && data !== undefined) {
            console.log(data.toString());
        }
    }, [data]);

    const handleAcceptClick = async(id) => {
        console.log("DATAAAAAAA1");
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
      console.log("DATAAAAAAA2");
      console.log(id);
        const { dataUser } = await axios.post(
            "http://localhost:5000/roombook/acceptRequest",
        JSON.stringify({ _id: id }),
        config,
      );
      console.log("DATAAAAAAA3");
      console.log(dataUser);
    }
    const handleCancelClick = async(id) => {
        console.log("DATAAAAAAA1");
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
      console.log("DATAAAAAAA2");
        const { dataUser } = await axios.post(
            "http://localhost:5000/roombook/cancelBooking",
        JSON.stringify({ _id: id }),
        config,
      );
      console.log("DATAAAAAAA3");
      console.log(dataUser);
    }

    return(
        <div className='row'>
            <div className='col-md-10'>
                    <h1>Bookings</h1>
                    <div className="data-container">
      {data && data.map((item, index) => (
        <div key={index} className="data-item">
          <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
          <p><strong>Departure Time:</strong> {item.departureTime}</p>
          <p><strong>Guest Name:</strong> {item.guestName}</p>
          <p><strong>Number of Guests:</strong> {item.numberOfGuests}</p>
          <p><strong>Purpose:</strong> {item.purpose}</p>
          <p><strong>Rooms Booked:</strong> {item.roomsBooked.join(', ')}</p>
          <p><strong>Rooms Required:</strong> {item.roomsRequired}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Student Email:</strong> {item.studentEmail}</p>
          <p><strong>Student Name:</strong> {item.studentName}</p>
          {item.status === 'requested' && (
            <div className="button-container">
              <div className="accept-button" onClick={() => handleAcceptClick(item._id)}>Accept</div>
              <div className="cancel-button" onClick={() => handleCancelClick(item._id)}>Cancel</div>
            </div>
          )}
        </div>
      ))}
    </div>
            </div>
        </div>
    )
}

export default Booking;

