// import { useNavigate } from "react-router-dom"

// export const Investor=()=>{
//     const navigate=useNavigate();
// return <div>
// <div>info</div>
// <div>heighst</div>
// <div>lowest</div>

//     <button onClick={()=>navigate(`/customerRegister`)}>to register</button>
//     <button onClick={()=>navigate(`/home`)}>home</button>
//     <button onClick={()=>navigate(`/personalDetails`)}>אזור אישי</button>


// </div> }


/////////////////////////
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./investor.css";
import { useSelector } from "react-redux";

export const Investor = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const allInvestments = useSelector(state => state.investments.investments);
  // Sample investment data - in a real app, this would come from an API
  const investmentData = {
    
    highestReturn: allInvestments.reduce((max, investment) => {
      return investment.roi > max.roi ? investment : max;
    }, allInvestments[0]),
    lowestRisk: {
      name: "Suburban Residential Development",
      return: "8.2%",
      type: "Residential",
      risk: "Low"
    },
    trending: [
      { id: 1, name: "Urban Apartment Building", return: "12.4%", type: "Residential" },
      { id: 2, name: "Industrial Warehouse", return: "14.8%", type: "Industrial" },
      { id: 3, name: "Mixed-Use Development", return: "11.9%", type: "Mixed" }
    ]
  };
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="investor-container">
      <div className="investor-hero">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1>Investor Dashboard</h1>
          <p>Discover premium real estate investment opportunities tailored to your preferences</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Investment Highlights</h2>
          <div className="action-buttons">
            <button 
              className="primary-button" 
              onClick={() => navigate(`/customerRegister`)}
            >
              Register as Investor
            </button>
            <button 
              className="secondary-button" 
              onClick={() => navigate(`/personalDetails`)}
            >
              My Portfolio
            </button>
            <button 
              className="outline-button" 
              onClick={() => navigate(`/home`)}
            >
              Back to Home
            </button>
          </div>
        </div>
        
        <div className="investment-highlights">
          <div className={`highlight-card highest-return ${isLoaded ? 'loaded' : ''}`}>
            <div className="card-badge">Highest Return</div>
            <h3>{investmentData.highestReturn.title}</h3>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-label">Return</span>
                <span className="stat-value">{investmentData.highestReturn.roi}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Type</span>
                <span className="stat-value">{investmentData.highestReturn.type}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Risk</span>
                {/* <span className="stat-value risk-high">{investmentData.highestReturn.ris}</span> */}
              </div>
            </div>
            <button className="view-button">View Details</button>
          </div>
          
          <div className={`highlight-card lowest-risk ${isLoaded ? 'loaded' : ''}`}>
            <div className="card-badge">Lowest Risk</div>



            <h3>{investmentData.lowestRisk.name}</h3>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-label">Return</span>
                <span className="stat-value">{investmentData.lowestRisk.return}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Type</span>
                <span className="stat-value">{investmentData.lowestRisk.type}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Risk</span>
                <span className="stat-value risk-low">{investmentData.lowestRisk.risk}</span>
              </div>
            </div>
            <button className="view-button">View Details</button>
          </div>
        </div>
        
        <div className="trending-investments">
          <h2>Trending Investments</h2>
          <div className="trending-list">
            {investmentData.trending.map((investment, index) => (
              <div 
                key={investment.id} 
                className={`trending-item ${isLoaded ? 'loaded' : ''}`}
                style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
              >
                <h3>{investment.name}</h3>
                <div className="trending-stats">
                  <div className="stat">
                    <span className="stat-label">Return</span>
                    <span className="stat-value">{investment.return}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Type</span>
                    <span className="stat-value">{investment.type}</span>
                  </div>
                </div>
                <button className="view-button small">View</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cta-section">
          <div className={`cta-card ${isLoaded ? 'loaded' : ''}`}>
            <h3>Ready to start investing?</h3>
            <p>Complete your investment preferences to get personalized recommendations</p>
            <button 
              className="cta-button" 
              onClick={() => navigate(`/request`)}
            >
              Set Investment Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};
