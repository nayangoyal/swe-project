import React from 'react'
import './contactPage.css'

const ContactUs = () => {
    return (
        <div className="contact-part">
            <div className="gmap">
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe
                            title="Google Map"
                            src="https://maps.google.com/maps?q=lnmiit%20jaipur%20rajasthan&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                            frameBorder="0"
                            scrolling="no"
                            style={{ width: '664px', height: '795px' }}
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="contacts">
                <div className='contacts-inner'>
                    <p className='contacts-text'>Guest House Manager: Mr Virendra Sharma 
                    <br />Phone no: +91 8776543210 
                    <br />Email id: ghms@lnmiit.ac.in
                    </p>
                    <br />
                    <p className='contacts-text'>
                    Institute Manager: Mr Samar Singh 
                    <br />Phone no: +91 9283764510 
                    <br />Email id: samarsingh@lnmiit.ac.in 
                    </p>
                    <br />
                    <p className='contacts-text'>
                    Address: Rupa ki Nangal, Post-Sumel, 
                    <br />Via-Jamdoli Jaipur-302031,(Rajasthan) 
                    <br />INDIA 
                    </p>
                    <br />
                    <p className='contacts-text'>
                    Any other query drop a mail to: 
                    <br />
                        <p style={{textDecoration: "underline"}}>info.lnmiit@lnmiit.ac.in</p>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs