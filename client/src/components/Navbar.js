// import React from 'react'
// import { Link } from "react-router-dom";
// import lnmiitLogo from "../images/logo.png"
// // import { useState } from 'react'
// import "./Navbar.css";


// const Navbar = () => {
    
//   const handleLogout = () => {
//     if (localStorage.getItem("userToken")) {
//         localStorage.removeItem("userToken");
//         localStorage.removeItem("userName");
//         localStorage.removeItem("userEmail");
//         window.location = './login';
//     }
//     // localStorage.removeItem('userData');
//     // setAuthenticated(false);
//     // window.location = './Login';
//   }

//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{paddingTop: "0rem", paddingBottom: "0rem"}}>
//           <div className="container-fluid" style={{background: "linear-gradient(180deg, rgb(227 161 81 / 71%)36%, rgb(227 153 10)76%)"}}>
//             <Link className="navbar-brand" to="/">
//               <img src={lnmiitLogo} alt="iit" width="169" height="56" style={{color: "black", margin:"9px 13px 14px 21px", background: "url(<path-to-image>), #d3d3d300 50% / cover no-repeat"}} className="d-inline-block align-text-top" />
//             </Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-       target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginRight: "40px", marginTop: "15px"}}>
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "268px"}}>
//                 <li className="nav-item">
//                   <Link className="nav-link" aria-current="page" style={{fontFamilt: "Inter",
//     fontSize: "26px",
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: "normal",
//     marginRight: "20px",
//     color: "black"}} to="/">Home</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" style={{fontFamilt: "Inter",
//     fontSize: "26px",
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: "normal",
//     marginRight: "20px",
//     color: "black"}} to={localStorage.getItem('userToken') ? "./Book" : './login'}>Book Now</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" style={{fontFamilt: "Inter",
//     fontSize: "26px",
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: "normal",
//     marginRight: "20px",
//     color: "black"}} to={localStorage.getItem('userToken') ? "https://docs.google.com/forms/d/e/1FAIpQLSciRLj-tFMT_V2YzAxXGvD02PjYnTKG0YyijEollMeM0GUgJQ/formrestricted" : './login'} target='__blank'>FeedBack</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" style={{fontFamilt: "Inter",
//     fontSize: "26px",
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: "normal",
//     marginRight: "20px",
//     color: "black"}}  to={localStorage.getItem('userToken') ? "./Contact" : './login'}>Contact Us</Link>
//                 </li>
//               </ul>
//               {

// localStorage.getItem("userToken") ?

//     <span span class="navbar-text">
//         Hello &nbsp; {localStorage.getItem("userName").slice(1, -1)} &nbsp;
//     </span>
//     :
//     <span class="navbar-text">

//     </span>
// }
//               <form className="form-inline my-2 my-lg-0">
//                 <Link className="nav-link" to="./login">
//                   <button type="button" className="btn btn-info  btn-lg" style={{backgroundColor: "black", color:"white", borderRadius: "20px", borderColor: "black", padding: "5px 23px 5px 23px"}} onClick={handleLogout}>                     
//                   {localStorage.getItem('userToken') ? 'Log Out' : 'Log In'}</button>
//                 </Link>
//               </form>
//             </div>
//           </div>
//         </nav>


        
//       </div>
//     )
// }

// export default Navbar



import React from 'react';
import { Link } from 'react-router-dom';
import lnmiitLogo from '../images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    if (localStorage.getItem('userToken')) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      window.location = './login';
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ paddingTop: '0rem', paddingBottom: '0rem' }}>
        <div className="container-fluid" style={{ background: 'linear-gradient(180deg, rgb(227 161 81 / 71%)36%, rgb(227 153 10)76%)' }}>
          <Link className="navbar-brand" to="/">
            <img
              src={lnmiitLogo}
              alt="iit"
              width="169"
              height="56"
              style={{
                color: 'black',
                margin: '9px 13px 14px 21px',
              }}
              className="d-inline-block align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler square-border"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{paddingTop: "3px"}}>&#9776;</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={localStorage.getItem('userToken') ? './Book' : './login'}>
                  Book Now
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={localStorage.getItem('userToken') ? 'https://docs.google.com/forms/d/e/1FAIpQLSciRLj-tFMT_V2YzAxXGvD02PjYnTKG0YyijEollMeM0GUgJQ/formrestricted' : './login'}
                  target="__blank"
                >
                  FeedBack
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={localStorage.getItem('userToken') ? './Contact' : './login'}>
                  Contact Us
                </Link>
              </li>
            </ul>
            {localStorage.getItem('userToken') ? (
              <span className="navbar-text">Hello &nbsp; {localStorage.getItem('userName').slice(1, -1)} &nbsp;</span>
            ) : (
              <span className="navbar-text"></span>
            )}
            <form className="form-inline my-2 my-lg-0">
              <Link className="nav-link" to="./login">
                <button
                  type="button"
                  className="btn btn-info btn-lg"
                  onClick={handleLogout}
                >
                  {localStorage.getItem('userToken') ? 'Log Out' : 'Log In'}
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
