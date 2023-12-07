import React from 'react'
import './Card.css'
import { Link } from "react-router-dom";

function Card({ title, imageUrl, body, redirect, success }) {
    // const targetAttribute = success ? '_blank' : '_self';
    return (
        <div className='card-container' style={{backgroundColor: "#C28F5436"}}>
            <div className='image-container'>
                <img src={imageUrl} alt="" />
            </div>
            <div className="card-content">
                <center>
                    <div className='card-title'>
                        <h3>{title}</h3>
                    </div>
                    <div className="cardBody">
                        <p>{body}</p>
                    </div>
                    <div className="btn" >
                        <button >
                            <Link to={redirect}>View More</Link>
                        </button>
                    </div>
                </center>
            </div>

        </div>
    )
}
export default Card