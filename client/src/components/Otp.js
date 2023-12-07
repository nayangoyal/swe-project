import React, { useRef, useState, useEffect } from 'react';
import './Otp.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OTP = (props) => {
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();

    const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4];
  
    const [otp, setOtp] = useState('');
  
    const digitValidate = (ele) => {
      console.log(ele.value);
      ele.value = ele.value.replace(/[^0-9]/g,'');
    }
  
    const tabChange = (val) => {
      if(val < inputRefs.length && inputRefs[val-1].current.value !== ''){
        inputRefs[val].current.focus()
      }else if(val > 1 && inputRefs[val-1].current.value === ''){
        inputRefs[val-2].current.focus()
      }   
    }

    const handleOtpSubmit = async () => {
        // e.preventDefault();
    
        try{
          const response = await axios.post('http://localhost:5000/emailverify/verify_email', {
            collegeEmailID: props.collegeEmailID,
            otp: otp,
          });

          console.log(props.collegeEmailID);
          console.log(response);
          if (response.data.success) {
            if(response.data.verified === true)
            {
              props.handleModal();
              window.location.href = '/';
            }
          } else {
            toast.error(`${response.data.message}`, { autoClose: 3000 });
          }
    
          // For demonstration, simply hiding the OTP popup
          
        }catch(error)
        {
          console.error(error.response.data);
          toast.error(`${error.response.data}`, { autoClose: 3000 });
        //   window.location.href = '/Otp';
        }
      };
  
    const handleVerify = async() => {
      const otpValue = await inputRefs.map(ref => ref.current.value).join('');
      setOtp(otpValue);
      console.log('OTP:', otpValue);
      handleOtpSubmit();
    }
  
    useEffect(() => {
      const handlePageLoad = () => {
        const isReloaded = sessionStorage.getItem('isReloaded');
    
        if (isReloaded) {
          // Page reloaded
          console.log('Page reloaded');
          // Add your logic for page reload here
    
          // Clear the flag after processing
          sessionStorage.removeItem('isReloaded');
        } else {
          // Navigated back to the page
          console.log('Navigated back to the page');
          // Add your logic for navigating back here
        }
      };
    
      // Attach the handlePageLoad function to the load event
      window.addEventListener('load', handlePageLoad);
    
      return () => {
        // Remove the event listener when the component is unmounted
        window.removeEventListener('load', handlePageLoad);
      };
    }, []);
    
    return (
        <div className="main-otp">
        <ToastContainer />
      <div className="container-otp">
        <div className="row justify-content-md-center">
          <div className="col-md-4 text-center">
            <div className="row">
              <div className="col-sm-12 mt-5 bgWhite">
                <div className="title-otp">
                  Verify OTP
                </div>
                <form action="" className="mt-5">
                  {inputRefs.map((ref, index) => (
                    <input 
                      key={index}
                      ref={ref}
                      className="otp" 
                      type="text" 
                      onInput={() => digitValidate(ref.current)} 
                      onKeyUp={() => tabChange(index+1)} 
                      maxLength={1} 
                    />
                  ))}
                </form>
                <hr className="mt-4"/>
                <button 
                  className='btn btn-primary btn-block mt-4 mb-4 customBtn-otp'
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default OTP;
