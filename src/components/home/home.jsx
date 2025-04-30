// //  import { Link } from "react-router-dom"
// import {  useNavigate } from "react-router-dom"
//  import {  useDispatch, useSelector } from "react-redux"
// //  import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// //  import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
// //  import ContactsIcon from '@mui/icons-material/Contacts';
// import "./home.css"
// // import Icon from '@mui/material/Icon';
// // import * as React from 'react';
// // import Tooltip from '@mui/material/Tooltip';
// // import IconButton from '@mui/material/IconButton';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// //  import {CORS} from flask_cors

 
 

// export const Home=()=>{
// const navigate=useNavigate();
// const dispatch=useDispatch();
// //state?.customer.customers

// //   function LoadingIconButton() {
// //     const [loading, setLoading] = React.useState(false);
// //     React.useEffect(() => {
// //       const timeout = setTimeout(() => {
// //         setLoading(false);
// //       }, 2000);
// //       return () => clearTimeout(timeout);
// //     });
// //     return (
// //       <Tooltip title="Click to see loading">
// //         <IconButton onClick={() => setLoading(true)} loading={loading}>
// //           <ShoppingCartIcon />
// //         </IconButton>
// //       </Tooltip>
// //     );
// //   }
  
// return <div>
// <div>logo</div>
// {/* <svg data-testid="ContactsIcon"></svg> */}
// {/* <Icon>star</Icon>; */}
// <div class="mis">
// <button  onClick={()=>navigate(`/investor`)}>investor</button>

// <button  onClick={()=>navigate(`/investee`)}>investee</button>

// <button  onClick={()=>navigate(`/information`)}>information</button>

// <button  onClick={()=>navigate(`/manager`)}> 🤵🏻 </button></div>
// {/* <button onClick={()=>navigate(`/customerRegister`)}>add</button> */}
// {/* <button  onClick={()=>navigate(`/menu`)}>go</button> */}


// </div>


// }

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./home.css";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation effect when component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className="real-estate-home">
      <div className="hero-section">
        <div className={`logo-container ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="logo">RealtyInvest<span>Hub</span></h1>
        </div>
        
        <div className="hero-content">
          <h2 className="hero-title">Your Gateway to Real Estate Investment Opportunities</h2>
          <p className="hero-subtitle">Discover, Invest, and Grow Your Real Estate Portfolio</p>
        </div>
      </div>

      <div className="investment-options">
        <div className={`option-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="card-icon investor-icon"></div>
          <h3>For Investors</h3>
          <p>Find premium real estate opportunities with high ROI potential</p>
          <button className="action-button" onClick={() => navigate(`/investor`)}>
            Explore Investments
          </button>
        </div>

        <div className={`option-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="card-icon investee-icon"></div>
          <h3>For Property Owners</h3>
          <p>List your properties and connect with potential investors</p>
          <button className="action-button" onClick={() => navigate(`/investee`)}>
            List Property
          </button>
        </div>

        <div className={`option-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="card-icon info-icon"></div>
          <h3>Market Insights</h3>
          <p>Access the latest real estate market trends and analysis</p>
          <button className="action-button" onClick={() => navigate(`/realEstate`)}>
            View Insights
          </button>
        </div>
      </div>

      <div className="admin-section">
        <button className="admin-button" onClick={() => navigate(`/manager`)}>
          <span className="admin-icon">🤵🏻</span>
          <span className="admin-text">Management Portal</span>
        </button>
      </div>
    </div>
  );
};
