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
                                                                                                                  const [idError, setidError] = useState(false);
                                                                                                                  const [viewReq, setViewReq] = useState(false);
                                                                                                                  const [showScheduleForm, setShowScheduleForm] = useState(false);
                                                                                                                  const [appointmentDate, setAppointmentDate] = useState("");
                                                                                                                  const [appointmentTime, setAppointmentTime] = useState("");
                                                                                                                  const [appointmentTopic, setAppointmentTopic] = useState("");
                                                                                                                  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

                                                                                                                  const dispatch = useDispatch();
                                                                                                                  const navigate = useNavigate();
                                                                                                                  const customer = useSelector(state => state.customers.customer);
                                                                                                                  const isCustomer = useSelector(state => state.customers.isCustomer);
                                                                                                                  const allCustomers = useSelector(state => state.customers.customers);
                                                                                                                  // Get customer requests from Redux store
                                                                                                                  // const customerRequests = useSelector(state => 
                                                                                                                  //   state.requests?.requests?.filter(req => req.customerId === customer?.id) || []
                                                                                                                  // );
                                                                                                                 const customerRequests = useSelector(state => state.customers.requests);

  
                                                                                                                  useEffect(() => {
                                                                                                                    setIsLoaded(true);
                                                                                                                  }, []);
  
                                                                                                                  const handleLogin = async () => {
                                                                                                                    if (!id.trim()) 
                                                                                                                      setLoginError(true);
     
                                                                                                                    setIsLoading(true);
                                                                                                                    setLoginError(false);
    
                                                                                                                    try {
                                                                                                                      await dispatch(getCustomerByIdThunk(id));
                                                                                                                      setIsLoading(false);
                                                                                                                    } catch (error) {
                                                                                                                      setLoginError(true);
                                                                                                                      setIsLoading(false);
                                                                                                                    }

                                                                                                                    if (!allCustomers.some(customer => customer.id === id)) 
                                                                                                                      setidError(true);
                                                                                                                    return;
                                                                                                                  };
  
                                                                                                                  const handleKeyPress = (e) => {
                                                                                                                    if (e.key === 'Enter') {
                                                                                                                      handleLogin();
                                                                                                                    }
                                                                                                                  };
                                                                                                                  //functoin to get customers requests
                                                                                                                  
                                                                                                                  const getReq = async () => {
                                                                                                                    setViewReq(true);
                                                                                                                    dispatch(getCustomerByIdThunk(customer.id));
                                                                                                                  };

                                                                                                                  const handleScheduleAppointment = () => {
                                                                                                                    // Here you would typically send this data to your backend
                                                                                                                    console.log("Appointment scheduled:", {
                                                                                                                      customerId: customer.id,
                                                                                                                      date: appointmentDate,
                                                                                                                      time: appointmentTime,
                                                                                                                      topic: appointmentTopic
                                                                                                                    });
    
                                                                                                                    // Show success message and reset form
                                                                                                                    setAppointmentSuccess(true);
                                                                                                                    setTimeout(() => {
                                                                                                                      setAppointmentSuccess(false);
                                                                                                                      setShowScheduleForm(false);
                                                                                                                      setAppointmentDate("");
                                                                                                                      setAppointmentTime("");
                                                                                                                      setAppointmentTopic("");
                                                                                                                    }, 3000);
                                                                                                                  };

                                                                                                                  // Function to get status class for styling
                                                                                                                  const getStatusClass = (status) => {
                                                                                                                    switch(status?.toLowerCase()) {
                                                                                                                      case 'approved': return 'status-approved';
                                                                                                                      case 'pending': return 'status-pending';
                                                                                                                      case 'rejected': return 'status-rejected';
                                                                                                                      default: return 'status-pending';
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
                                                                                                                              {idError && <div className="error-message">Please register before you try to log in</div>}
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
                                                                                                                            {viewReq ? (
                                                                                                                              <div className="requests-container">
                                                                                                                                <div className="requests-header">
                                                                                                                                  <h2>Your Investment Requests</h2>
                                                                                                                                  <button className="back-to-dashboard" onClick={() => setViewReq(false)}>
                                                                                                                                    Back to Dashboard
                                                                                                                                  </button>
                                                                                                                                </div>
                                                                                                                            
                
                                                                                                                                {customerRequests && customerRequests.length >= 0 ? (
                                                                                                                                  <div className="requests-list">
                                                                                                                                    <div className="requests-table-header">
                                                                                                                                      <div className="request-header-cell">Request ID</div>
                                                                                                                                      <div className="request-header-cell">Property</div>
                                                                                                                                      <div className="request-header-cell">Amount</div>
                                                                                                                                      <div className="request-header-cell">RiskLevel</div>
                                                                                                                                      <div className="request-header-cell">PhoneNumber</div>
                                                                                                                                    </div>
                    
                                                                                                                                    {customerRequests.map(request => (
                                                                                                                                      <div key={request.id} className="request-item">
                                                                                                                                        <div className="request-cell">{request.id}</div>
                                                                                                                                        <div className="request-cell">{request.name || request.property?.name || 'N/A'}</div>
                                                                                                                                        <div className="request-cell">{request.budget}</div>
                                                                                                                                        <div className="request-cell">{request.riskLevel}</div>
                                                                                                                                        {/* <div className="request-cell">{request.gotOffer}</div> */}
                                                                                                                                        <div className="request-cell">{request.phoneNumber}</div>
                                                                                                                                        
                                                                                                                                        
                                                                                                                                        
                                                                                                                                       {/* <div className={`request-cell request-status ${getStatusClass(request.status)}`}> 
                                                                                                                                          {request.status || 'Pending'}
                                                                                                                                        </div> */}
                                                                                                                                      </div>
                                                                                                                                    ))}
                                                                                                                                  </div>
                                                                                                                                ) : (
                                                                                                                                  <div className="no-requests">
                                                                                                                                    <div className="no-data-icon">📭</div>
                                                                                                                                    <h3>No Investment Requests Yet</h3>
                                                                                                                                    <p>You haven't made any investment requests. Start investing by creating a new request.</p>
                                                                                                                                    <button className="create-request-button" onClick={() => navigate('/request')}>
                                                                                                                                      Create New Request
                                                                                                                                    </button>
                                                                                                                                  </div>
                                                                                                                                )}
                                                                                                                              </div>
                                                                                                                            ) : (
                                                                                                                              <>
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
                    
                                                                                                                                    <div className="action-item" onClick={()=>getReq()}> 
                                                                                                                                      
                                                                                                                                      <div className="action-icon">📊</div>
                                                                                                                                      <h3>View My Requests</h3>
                                                                                                                                      <p>Check your current investment requests and their status</p>
                                                                                                                                    </div>
                
                                                                                                                                    <div className="action-item" onClick={() => setShowScheduleForm(true)}>
                                                                                                                                      <div className="action-icon">📅</div>
                                                                                                                                      <h3>Schedule Meeting</h3>
                                                                                                                                      <p>Book a consultation with our investment advisors</p>
                                                                                                                                    </div>
             
                                                                                                                                    <div className="action-item">
                                                                                                                                      <div className="action-icon">⚙️</div>
                                                                                                                                      <h3>Account Settings</h3>
                                                                                                                                      <p>Update your personal information and preferences</p>
                                                                                                                                    </div>
                                                                                                                                  </div>
                                                                                                                                </div>
                                                                                                                              </>
                                                                                                                            )}
                                                                                                                          </div>
          
                                                                                                                          {/* Schedule Appointment Modal */}
                                                                                                                          {showScheduleForm && (
                                                                                                                            <div className="modal-overlay">
                                                                                                                              <div className="schedule-modal">
                                                                                                                                <div className="modal-header">
                                                                                                                                  <h2>Schedule an Appointment</h2>
                                                                                                                                  <button className="close-button" onClick={() => setShowScheduleForm(false)}>×</button>
                                                                                                                                </div>
                
                                                                                                                                <div className="modal-body">
                                                                                                                                  {appointmentSuccess ? (
                                                                                                                                    <div className="success-message">
                                                                                                                                      <div className="success-icon">✓</div>
                                                                                                                                      <h3>Appointment Scheduled!</h3>
                                                                                                                                      <p>Your appointment has been successfully scheduled. We'll contact you to confirm.</p>
                                                                                                                                    </div>
                                                                                                                                  ) : (
                                                                                                                                    <form className="appointment-form">
                                                                                                                                      <div className="form-group">
                                                                                                                                        <label htmlFor="appointment-date">Date</label>
                                                                                                                                        <input 
                                                                                                                                          type="date" 
                                                                                                                                          id="appointment-date"
                                                                                                                                          value={appointmentDate}
                                                                                                                                          onChange={(e) => setAppointmentDate(e.target.value)}
                                                                                                                                          required
                                                                                                                                        />
                                                                                                                                      </div>
                      
                                                                                                                                      <div className="form-group">
                                                                                                                                        <label htmlFor="appointment-time">Time</label>
                                                                                                                                        <input 
                                                                                                                                          type="time" 
                                                                                                                                          id="appointment-time"
                                                                                                                                          value={appointmentTime}
                                                                                                                                          onChange={(e) => setAppointmentTime(e.target.value)}
                                                                                                                                          required
                                                                                                                                        />
                                                                                                                                      </div>
                      
                                                                                                                                      <div className="form-group">
                                                                                                                                        <label htmlFor="appointment-topic">Topic</label>
                                                                                                                                        <select 
                                                                                                                                          id="appointment-topic"
                                                                                                                                          value={appointmentTopic}
                                                                                                                                          onChange={(e) => setAppointmentTopic(e.target.value)}
                                                                                                                                          required
                                                                                                                                        >
                                                                                                                                          <option value="">Select a topic</option>
                                                                                                                                          <option value="new-investment">New Investment Opportunities</option>
                                                                                                                                          <option value="portfolio-review">Portfolio Review</option>
                                                                                                                                          <option value="financial-planning">Financial Planning</option>
                                                                                                                                          <option value="other">Other</option>
                                                                                                                                        </select>
                                                                                                                                      </div>
                      
                                                                                                                                      <div className="form-actions">
                                                                                                                                        <button 
                                                                                                                                          type="button" 
                                                                                                                                          className="cancel-button"
                                                                                                                                          onClick={() => setShowScheduleForm(false)}
                                                                                                                                        >
                                                                                                                                          Cancel
                                                                                                                                        </button>
                                                                                                                                        <button 
                                                                                                                                          type="button" 
                                                                                                                                          className="submit-button"
                                                                                                                                          onClick={handleScheduleAppointment}
                                                                                                                                        >
                                                                                                                                          Schedule Appointment
                                                                                                                                        </button>
                                                                                                                                      </div>
                                                                                                                                    </form>
                                                                                                                                  )}
                                                                                                                                </div>
                                                                                                                              </div>
                                                                                                                            </div>
                                                                                                                          )}
                                                                                                                        </div>
                                                                                                                      )}
                                                                                                                    </div>
                                                                                                                  );
                                                                                                                };
