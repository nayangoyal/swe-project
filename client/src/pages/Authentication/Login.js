import React, {useState} from "react";
import './Login.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useToast } from "@chakra-ui/react";

const Login = () => {
  // const toast = useToast();
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleLoginButton = async() =>{
    try {

      console.log("DATAAAAAAA1");
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("DATAAAAAAA2");
      const response = await axios.post(
        "http://swe-project-mauve.vercel.app/authentication/login",
        JSON.stringify({ collegeEmailID: email, password: password }),
        config,
      );
      console.log("DATAAAAAAA3");
      console.log(response.data);
      console.log(response.data.success);
      if (response.data.success) {
        console.log("success 1");
        toast.success('Booking done successfully!', { autoClose: 3000 });
        localStorage.setItem("userEmail", JSON.stringify(response.data.user.collegeEmailID));
        localStorage.setItem("userToken", JSON.stringify(response.data.user.token));
        localStorage.setItem("userName", JSON.stringify(response.data.user.fullName));
        localStorage.setItem("userID", JSON.stringify(response.data.user._id));
        localStorage.setItem("fullData", JSON.stringify(response.data));
        if(response.data.role==='Admin')
        {
        
          window.location.href = '/admin';
        }else{
          window.location.href = '/';
        }
      } else {
        toast.error(`${response.data.message}`, { autoClose: 3000 });
      }
      
      // if(data.role==='Admin')
      // {
        
      //   window.location.href = '/admin';
      // }else{
      //   window.location.href = '/';
      // }

    } catch (error) {
      console.error("Login Failed", error.response ? error.response.data : error.message);
  
    }

  }

  return (
    <div className="login-page-own">
    <ToastContainer />
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <h5 className="heading">LOGIN</h5>
            <p className="title">Email Address</p>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <p className="title-email">We’ll never share your email.</p>
            <p className="title">Password</p>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <div className = "login-btn" onClick={handleLoginButton}>Login</div>
            <p className="message">Not registered? <Link to="/Signup">Create an account</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
