// import {  useNavigate } from "react-router-dom"

// export const Investee=()=>{
//     const navigate=useNavigate();
// return <div>
// <div>info</div>

// <button onClick={()=>navigate(`/investeeRegister`)}>to register</button>
// <button onClick={()=>navigate(`/home`)}>home</button>
// </div>
// }


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./investee.css";

export const Investee = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="investee-container">
      <div className="investee-hero">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1>Property Owner Portal</h1>
          <p>List your properties and connect with potential investors to maximize your real estate value</p>
        </div>
      </div>
      
      <div className="investee-content">
        <div className={`info-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="card-header">
            <div className="icon-container">
              <i className="fas fa-building"></i>
            </div>
            <h2>Why List Your Property?</h2>
          </div>
          <div className="card-body">
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">✓</span>
                <span className="benefit-text">Access to a network of qualified investors</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span className="benefit-text">Professional property valuation</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span className="benefit-text">Streamlined investment process</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span className="benefit-text">Dedicated support throughout the transaction</span>
              </li>
            </ul>
          </div>
          <div className="card-footer">
            {/* <button 
              className="primary-button" 
              onClick={() => navigate(`/investeeRegister`)}
            >
              Register Property
            </button> */}
            <button 
              className="primary-button" 
              onClick={() => navigate(`/investeePersonalInfo`)} 
            >
              Register As Property Owner
            </button>
            <button 
              className="secondary-button" 
              onClick={() => navigate(`/home`)}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
