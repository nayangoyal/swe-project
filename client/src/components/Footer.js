import React from 'react'
import map from '../images/map.jpg'
import twitter from '../images/twitter.jpg'
import linkedin from '../images/linkedin.jpg'
import instragram from '../images/instagram.jpg'
import './Footer.css'


const Footer = () => {
    <style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400&display=swap');
</style>

    let footerStyle = {
        position: "relative",
        top: "0vh",
        bottom: "0%",
        width: "100%",
        // margin: "20px 0px 0px 0px"
        background: "linear-gradient(rgb(247 179 126) 31%, rgb(246 233 212) 60%)",
        paddingBottom: "0",
        paddingTop: "1px"
    }

    let contactStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "30px",
        marginLeft: "53px",
        marginRight: "65px",
        color: "black",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "15px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
    }

    let iconStyle = {
        background: "url(<path-to-image>), lightgray 50% / cover no-repeat",
        mixBlendMode: "darken",
    }

    return (
        <footer className='bg-dark text-light' style={footerStyle}>
            <div className='footer-contact' style={contactStyle}>
                <div className='contacts' style={{width: "450px"}}>
                    <p className='phoneNo' style={{textDecoration: "underline"}}>Phone: 1800 180 6566</p>
                    <p className='address' style={{marginTop: "35px"}}>Address: Rupa ki Nangal, Post-Sumel,
                        Via-Jamdoli  Jaipur-302031,(Rajasthan) INDIA
                    </p>
                </div>
                <div className='social-media' style={{width: "420px"}}>
                    <p className='contact-title' style={{display: "flex",justifyContent: "center"}}>
                        Connect with us
                    </p>
                <div className='social-icon' style={{marginTop: "21px", display: "flex", justifyContent: "space-between"}}>
                    <span>
                        <a className='icons' style={{iconStyle}} href='https://www.google.com/maps/place/The+LNM+Institute+of+Information+Technology/@26.9362934,75.9209142,17z/data=!3m1!4b1!4m6!3m5!1s0x396dba21e8a1d1c9:0x5ab565cce4d44c2b!8m2!3d26.9362886!4d75.9234891!16s%2Fm%2F04cql40?entry=ttu' target='__blank' rel='noopener noreferrer'><img src={map} style={{width: "50px", height: "40px"}} alt='map'/></a>
                    </span>
                    <span>
                        <a className='icons' style={{iconStyle}} href='https://twitter.com/LNMIIT_official' target='__blank' rel='noopener noreferrer'><img src={twitter} style={{width:"40px"}} alt='map'/></a>
                    </span>
                    <span>
                        <a className='icons' style={{iconStyle}} href='https://www.linkedin.com/school/lnmiitofficial/?originalSubdomain=in' target='__blank' rel='noopener noreferrer'><img src={linkedin} style={{width:"45px"}} alt='map'/></a>
                    </span>
                    <span>
                        <a className='icons' style={{iconStyle}} href='https://www.instagram.com/lnmiit_official/' target='__blank'><img src={instragram} style={{width:"45px"}} alt='map'/></a>
                    </span>
                </div>
                </div>
            </div>
            <div className='footer-copyright'>
                <p className='text-center' style={{color: "black", fontFamily: "Inter"}}>
                    &copy; Copyright 2023 GHMS All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer


// import React from 'react';
// import map from '../images/map.jpg';
// import twitter from '../images/twitter.jpg';
// import linkedin from '../images/linkedin.jpg';
// import instragram from '../images/instagram.jpg';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className='footer'>
//       <div className='footer-contact'>
//         <div className='contacts'>
//           <p className='phoneNo' style={{ textDecoration: 'underline' }}>
//             Phone: 1800 180 6566
//           </p>
//           <p className='address' style={{ marginTop: '35px' }}>
//             Address: Rupa ki Nangal, Post-Sumel, Via-Jamdoli Jaipur-302031,
//             (Rajasthan) INDIA
//           </p>
//         </div>
//         <div className='social-media'>
//           <p className='contact-title'>Connect with us</p>
//           <div className='social-icon'>
//             <span>
//               <a className='icons' href='./'>
//                 <img src={map} alt='map' />
//               </a>
//             </span>
//             <span>
//               <a className='icons' href='./'>
//                 <img src={twitter} alt='map' />
//               </a>
//             </span>
//             <span>
//               <a className='icons' href='./'>
//                 <img src={linkedin} alt='map' />
//               </a>
//             </span>
//             <span>
//               <a className='icons' href='./'>
//                 <img src={instragram} alt='map' />
//               </a>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className='footer-copyright'>
//         <p style={{ color: 'black', fontFamily: 'Inter' }}>
//           &copy; Copyright 2023 GHMS All rights reserved
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
