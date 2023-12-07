import React, { useState, useEffect } from 'react';
import './ThankYou.css';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a delay (e.g., 500 milliseconds)
    const delayToShowContent = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(delayToShowContent);
  }, []);

  return (
    <div className={`thank-you-container ${showContent ? 'show-content' : ''}`}>
      {showContent && (
        <>
          <div className="tick-image" />
          <h1>Thank You!</h1>
          <p>Your booking has been confirmed.</p>
          <p>We look forward to hosting you. Have a great day!</p>

          <p className='required'>You can view your booking history for any further updates.</p>
          <Link to='../'>Go To Home Page</Link>
        </>
      )}
    </div>
  );
};

export default ThankYou;
