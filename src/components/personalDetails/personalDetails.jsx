// import { useDispatch, useSelector } from "react-redux";

// import { getCustomerByIdThunk } from "../../redux/Slices/Customer/getCustomerById";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const PersonalDetails=()=>{
//     const [id,setId]=useState();
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const customer=useSelector(state=> state.customers.customer);
//     const isCustomer=useSelector(state=> state.customers.isCustomer)
// return <div>
// <input type="text" placeholder="inset id" onChange={e=>setId(e.target.value)}/>

// <button onClick={async()=>{dispatch(getCustomerByIdThunk(id))}}>log in</button>

    
// {isCustomer&&
// <div>
//         <br />
//         <h1>hello</h1>
//         <div>{customer.name}</div>
//         <span>these are your details:</span>
//         <div>{customer.phoneNumber}</div>
//         <div>{customer.id}</div>

//         <button onClick={()=>navigate(`/request`)}>add request</button>
//         </div>
// }
//         </div>
       
 




















// }


import { useDispatch, useSelector } from "react-redux";
import { getCustomerByIdThunk } from "../../redux/Slices/Customer/getCustomerById";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./personalDetails.css";

export const PersonalDetails = () => {
  const [id, setId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector(state => state.customers.customer);
  const isCustomer = useSelector(state => state.customers.isCustomer);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleLogin = async () => {
    if (!id.trim()) {
      setLoginError(true);
      return;
    }
    
    setIsLoading(true);
    setLoginError(false);
    
    try {
      await dispatch(getCustomerByIdThunk(id));
      setIsLoading(false);
    } catch (error) {
      setLoginError(true);
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  return (
    <div className="personal-details-container">
      {!isCustomer ? (
        <div className={`login-panel ${isLoaded ? 'loaded' : ''}`}>
          <div className="login-header">
            <div className="user-icon">👤</div>
            <h1>Investor Login</h1>
            <p>Enter your ID to access your investment dashboard</p>
          </div>
          
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="investor-id">Investor ID</label>
              <input 
                type="text" 
                id="investor-id"
                value={id}
                onChange={e => {
                  setId(e.target.value);
                  setLoginError(false);
                }}
                onKeyPress={handleKeyPress}
                className={loginError ? 'error' : ''}
                placeholder="Enter your ID"
              />
              {loginError && <div className="error-message">Invalid ID. Please try again.</div>}
            </div>
            
            <div className="login-actions">
              <button 
                className={`login-button ${isLoading ? 'loading' : ''}`} 
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
              <button className="back-button" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`dashboard-container ${isLoaded ? 'loaded' : ''}`}>
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome, {customer.name}!</h1>
              <p>Your personal investment dashboard</p>
            </div>
            <button className="logout-button" onClick={() => navigate('/home')}>
              Exit Dashboard
            </button>
          </div>
          
          <div className="dashboard-content">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-icon">👤</div>
                <h2>Your Profile</h2>
              </div>
              
              <div className="profile-details">
                <div className="detail-item">
                  <span className="label">Investor ID:</span>
                  <span className="value">{customer.id}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Name:</span>
                  <span className="value">{customer.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Phone:</span>
                  <span className="value">{customer.phoneNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Phone:</span>
                  <span className="value">{customer.phoneNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Address:</span>
                  <span className="value">{customer.address}</span>
                </div>
              </div>
            </div>
            
            <div className="actions-card">
              <h2>Investment Actions</h2>
              <div className="actions-grid">
                <div className="action-item" onClick={() => navigate('/request')}>
                  <div className="action-icon">📝</div>
                  <h3>New Investment Request</h3>
                  <p>Submit a new investment request for available properties</p>
                </div>
                
                <div className="action-item">
                  <div className="action-icon">📊</div>
                  <h3>View Portfolio</h3>
                  <p>Check your current investments and performance</p>
                </div>
            

                <div className="action-item" onClick={() => navigate('/request')}>
                  <div className="action-icon">📅</div>
                  <h3>Schedule Meeting</h3>
                  <p >Book a consultation with our investment advisors</p>
                </div>
         

                <div className="action-item">
                  <div className="action-icon">⚙️</div>
                  <h3>Account Settings</h3>
                  <p>Update your personal information and preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
