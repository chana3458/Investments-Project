
// import { Navigate, useNavigate } from "react-router-dom"


// export const RealEstate=()=>{
//     const navigate=useNavigate();

// return <div>

// <div onClick={()=>navigate(`/customerRegister`)}>customers</div>
// <div>suppliers</div>
// <div>information</div>
// <button onClick={()=>navigate(`/home`)}>home</button>

// </div>


// }




import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./realEstate.css";

export const RealEstate = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="real-estate-container">
      <div className={`real-estate-header ${isLoaded ? 'loaded' : ''}`}>
        <h1>Real Estate Investment Portal</h1>
        <p>Choose your path to begin your real estate investment journey</p>
      </div>
      
      <div className="options-container">
        <div 
          className={`option-card customer-card ${isLoaded ? 'loaded' : ''}`}
          onClick={() => navigate(`/customerRegister`)}
        >
          <div className="option-icon">💼</div>
          <h2>Investors</h2>
          <p>Register as an investor to browse and invest in available properties</p>
          <ul className="option-features">
            <li>Access exclusive investment opportunities</li>
            <li>Track your investment portfolio</li>
            <li>Receive personalized investment recommendations</li>
            <li>Connect with property owners directly</li>
          </ul>
          <button className="option-button">Register as Investor</button>
        </div>
        
        <div 
          className={`option-card supplier-card ${isLoaded ? 'loaded' : ''}`}
          onClick={() => navigate(`/investeeRegister`)}
        >
          <div className="option-icon">🏠</div>
          <h2>Property Owners</h2>
          <p>List your properties and connect with potential investors</p>
          <ul className="option-features">
            <li>List multiple properties for investment</li>
            <li>Set your investment terms and conditions</li>
            <li>Review and approve investor applications</li>
            <li>Manage your property portfolio efficiently</li>
          </ul>
          <button
           className="option-button">Register as Property Owner</button>
        </div>
        
        <div 
          className={`option-card info-card ${isLoaded ? 'loaded' : ''}`}
          onClick={() => navigate(`/information`)}
        >
          <div className="option-icon">📊</div>
          <h2>Market Information</h2>
          <p>Access real estate market trends, analytics, and investment insights</p>
          <ul className="option-features">
            <li>View current market trends and forecasts</li>
            <li>Research property values in different locations</li>
            <li>Access investment guides and resources</li>
            <li>Learn about real estate investment strategies</li>
          </ul>
          <button className="option-button" onClick={() => navigate(`/information`)}>Explore Market Info</button>
        </div>
      </div>
      
      <div className={`back-section ${isLoaded ? 'loaded' : ''}`}>
        <button className="back-home-button" onClick={() => navigate(`/home`)}>
          Back to Home
        </button>
      </div>
    </div>
  );
};
