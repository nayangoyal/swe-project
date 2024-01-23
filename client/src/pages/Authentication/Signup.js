import React,{useState} from "react";
import './Signup.css'
// import {Link} from 'react-router-dom'
import axios from 'axios';
// import OtpInput from 'react-otp-input';
import OTP from "../../components/Otp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  
  const [fullName, setFullName] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal,setShowModal] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    try {
      // Validate other form data here if needed

      const response = await axios.post('http://https://swe-project-m48k.onrender.com/authentication/signup', {
        fullName,
        collegeEmailID: collegeEmail,
        password,
      });

      // Handle successful signup response here
      console.log(response.data);
      
      if (response.data.success) {
        toast.success('SignUp Almost Successfully Please Verify OTP!', { autoClose: 3000 });
        console.log("success 1");
        setShowModal(true);
      } else {
        toast.error(`${response.data.message}`, { autoClose: 3000 });
      }
      

    } catch (error) {
      // Handle error response here
      console.error(error.response.data);
      window.location.href = '/Signup';
    }
  };

  const handleModal =  ()=>{
    setShowModal(false);
  }


  return (
    <div className="signup-page-own">
    <ToastContainer />
      <div class="signup-page">
        <div class="form">
          <form class="signup-form">
            <h5 className="heading">SIGNUP</h5>
            <p className="title">Full Name</p>
            <input type="text" placeholder="Full Name" value={fullName}
              onChange={(e) => setFullName(e.target.value)}/>
            <p className="title">College Email Address</p>
            <input type="email" placeholder="Email" value={collegeEmail}
              onChange={(e) => setCollegeEmail(e.target.value)}/>
            <p className="title-email">We’ll never share your email.</p>
            <p className="title">Password</p>
            <input type="password" placeholder="password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <p className="title">Confirm Password</p>
            <input type="password" placeholder="Confirm password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={handleSignup}>signup</button>
          </form>
        </div>
      </div>

      {showModal?<OTP collegeEmailID={collegeEmail} handleModal={handleModal}/>:null}

    </div>


  );
};

export default Signup;
