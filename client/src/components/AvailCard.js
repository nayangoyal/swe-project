import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import './AvailCard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailCard = () => {

    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [departureTime, setDepartureTime] = useState(new Date());
    // const [singleRoom, setSingleRoom] = useState(null);
    const [doubleRoom, setDoubleRoom] = useState(null);
    // const [singleRoomAvail, setSingleRoomAvail] = useState(0);
    const [doubleRoomAvail, setDoubleRoomAvail] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}` ;
    
    
    
      const handleArrivalTimeChange = (date) => {
        setArrivalTime(date);
      };
    
      const handleDepartureTimeChange = (date) => {
        setDepartureTime(date);
      };
    
      const handleDoubleRoom = (e) => {
        setDoubleRoom(e.target.value);
      };
    


      const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.get('http://swe-project-mauve.vercel.app/roombook/checkRoom', {
          params: {
            arrivalTime: arrivalTime.toISOString(), // Convert to ISO string format
            departureTime: departureTime.toISOString(),
          }
        })
        .then(response => { 
          console.log('hello');
          console.log(response);
          // console.log(response.data.data.doubleRoom);
          if (response.data.success && (response.data.data.doubleRoom >= doubleRoom) && (doubleRoom>0)) {
            // toast.success('Booking done successfully!', { autoClose: 3000 });
            console.log("success 1");
            // setDoubleRoomAvail(response.data.doubleRoom);
            toast.success(`${response.data.message}`, { autoClose: 3000 });
            setIsSubmit(true);
            console.log(doubleRoomAvail);
            setIsAvailable(true);
          
            // navigate('/Book',{state:{arrivalTime: arrivalTime, departureTime: departureTime, doubleRoom: doubleRoom }});
          } else {
            console.log(response.data.message);
            if(response.data.success===true&&response.data.data.doubleRoom < doubleRoom)
            {
              toast.error('The number of Room you Required is more than We have!', { autoClose: 3000 });
              setIsSubmit(true);
            }else{
              toast.error(`${response.data.message}`, { autoClose: 3000 });
            }
            setIsAvailable(false);
          }
        })
        .catch(err => toast.error(`${err}`, { autoClose: 3000 }));



        console.log('hi');
        
        // if (doubleRoomAvail >= doubleRoom ) {
        //   console.log('hi');
        //   // console.log(singleRoomAvail)
        //   console.log(doubleRoomAvail)
        //   // console.log(singleRoom)
        //   console.log(doubleRoom)
        //   console.log(arrivalTime)
        //   console.log(departureTime)
          
        // }
        // else {
        //   setIsAvailable(false);
        // }
      }

    return(
        <div className='avail'>
        <ToastContainer />
      <h3>Check Availability Of Rooms</h3>
      <form onSubmit={handleSubmit} className='form-avail'>
        <div className='form-body-avail'>
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
          <div className="form-submit" style={{marginTop: "10px"}}>
            <input type="submit" value="Continue" className="btn btn-primary" />
          </div>
        </div>
      </form>
      { isSubmit && !isAvailable && <p style={{color:'red'}}>Sufficient rooms not available</p> }
    </div>
    )
};

export default AvailCard;
