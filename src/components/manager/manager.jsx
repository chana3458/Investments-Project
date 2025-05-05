// import { useDispatch, useSelector } from "react-redux";
// import { getAllCustomersThunk } from "../../redux/Slices/Customer/getAllCustomersThunk"
// import { useState } from "react";
// import { getAllInvesteesThunk } from "../../redux/Slices/investee/getAllInvesteesThunk";
// import { delCustomerThunk } from "../../redux/Slices/Customer/deleteCustomerThunk";
// import { useNavigate } from "react-router-dom";
// import "./manager.css"
// import { deleteInvesteeThunk } from "../../redux/Slices/investee/deleteInvesteeThunk";
// export const Manager=()=>{
//     const dispatch=useDispatch();
//  const allCustomers=useSelector(state=> state.customers.customers);
//  const allInvestees=useSelector(state=> state.investees.investees);

// let isManager=false;
// let not=false;
// const manager="1234";
// let id="50";
// const navigate=useNavigate();
// const [currentPassword,setCurrentPassword]=useState("");
// const [currentId,setCurrentId]=useState();
// const [currentId2,setCurrentId2]=useState();

// const [insure,setInsure]=useState(false);
// const [insure2,setInsure2]=useState(false);

// const checkManager=()=>{
//     if (currentPassword===manager)
//         isManager=true;
//     else
//         not=true;

// }

// return <div className='manager'>
//     <div>
//     <button onClick={()=>navigate(`/home`)}>home</button>

//     <input type="password" onChange={e=>setCurrentPassword(e.target.value)} />
//    <button onClick={checkManager()}>ok</button>
//    </div>
// { isManager&& <div>
// אופציות למנהל
// <br></br>
// <button onClick={async()=>{dispatch(getAllCustomersThunk())}}>all investers</button>
// <button onClick={async()=>{dispatch(getAllInvesteesThunk())}}>all investees</button>


// <div>{
//     <table>
//     <thead>
//         <th>ID</th>
//          <th>NAME</th>
//          <th>PHONENUMBER</th>
//         <th>ADDRESS</th>
//         <th>DELETE</th>
//     </thead>
//      {allCustomers.map(r =>
//      r.id!==""?
//         <tr>
//         <td>{r.id}</td>
//         <td>{r.name}</td>
//         <td>{r.phoneNumber}</td>
//         <td>{r.address}</td>
//         <td ><input type="checkbox" name="edit" id="5" onClick={()=> {setCurrentId(r.id);setInsure(true);}}/></td>
//         {/* <td> <button onClick={()=>setCurrentId(r.id)} > delete</button></td> */}
//     </tr>:<></>
     
//     )}
//  </table>


  
// }</div>

// {insure &&<div>
//     <div>are you sure you want to delete this custumer permanently ?</div>
//     <div  onClick={()=>{setInsure(false); dispatch(delCustomerThunk(currentId));dispatch(getAllCustomersThunk())}}>delete</div>
//     <div onClick={()=>setInsure(false)}>no</div>
// </div>
// }

// {insure2 &&<div>
//     <div>are you sure you want to delete this custumer permanently ?</div>
//     <div  onClick={()=>{setInsure2(false); dispatch(deleteInvesteeThunk(currentId2));dispatch(getAllInvesteesThunk())}}>delete</div>
//     <div onClick={()=>setInsure2(false)}>no</div>
// </div>
// }



// {/* <button onClick={async()=>{dispatch(delCustomerThunk(currentId))}}>delete investers</button>  */}

// <div>{
    
//     allInvestees.map(investee=> <div key={investee.id}>
//         <br />
//         <div>{investee.name}</div>
//         <div>{investee.phoneNumber}</div>
//         <div>{investee.address}</div>
//         <input type="checkbox" name="edit" id="5" onClick={()=> {setCurrentId2(investee.id);setInsure2(true);}}/>
//         </div>
//     )}
// </div>

// </div>



// }
// {not&&<span> insert password</span>}
// </div>
// }


import { useDispatch, useSelector } from "react-redux";
import { getAllCustomersThunk } from "../../redux/Slices/Customer/getAllCustomersThunk";
import { useState, useEffect } from "react";
import { getAllInvesteesThunk } from "../../redux/Slices/investee/getAllInvesteesThunk";
import { delCustomerThunk } from "../../redux/Slices/Customer/deleteCustomerThunk";
import { updateCustomerThunk } from "../../redux/Slices/Customer/updateCustomerThunk";

import { useNavigate } from "react-router-dom";
import "./manager.css";
import { deleteInvesteeThunk } from "../../redux/Slices/investee/deleteInvesteeThunk";

export const Manager = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector(state => state.customers.customers);
  const allInvestees = useSelector(state => state.investees.investees);
  
  const [isManager, setIsManager] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('investors');
  
  const manager = "1234";
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentId, setCurrentId] = useState();
  const [currentId2, setCurrentId2] = useState();
  const [insure, setInsure] = useState(false);
  const [insure2, setInsure2] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCustomer, setEditCustomer] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    address: ""
  });
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Pre-fetch data
    if (isManager) {
      dispatch(getAllCustomersThunk());
      dispatch(getAllInvesteesThunk());
    }
  }, [isManager, dispatch]);  
  const checkManager = () => {
    if (currentPassword === manager) {
      setIsManager(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkManager();
    }
  };
  
  return (
    <div className="manager-container">
      {!isManager ? (
        <div className={`login-panel ${isLoaded ? 'loaded' : ''}`}>
          <div className="login-header">
            <div className="manager-icon">🤵🏻</div>
            <h1>Manager Portal</h1>
            <p>Enter your password to access the management dashboard</p>
          </div>
          
          <div className="login-form">
            <div className="form-group">
              <label htmlFor="password">Manager Password</label>
              <input 
                type="password" 
                id="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className={loginError ? 'error' : ''}
                placeholder="Enter password"
              />
              {loginError && <div className="error-message">Invalid password. Please try again.</div>}
            </div>
            
            <div className="login-actions">
              <button className="login-button" onClick={checkManager}>Login</button>
              <button className="back-button" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`dashboard-container ${isLoaded ? 'loaded' : ''}`}>
          <div className="dashboard-header">
            <h1>Management Dashboard</h1>
            <div className="header-actions">
              <button className="refresh-button" onClick={() => {
                dispatch(getAllCustomersThunk());
                dispatch(getAllInvesteesThunk());
              }}>
                🔄 Refresh Data
              </button>
              <button className="logout-button" onClick={() => navigate('/home')}>
                Exit Dashboard
              </button>
            </div>
          </div>
          
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'investors' ? 'active' : ''}`}
                onClick={() => setActiveTab('investors')}
              >
                Investors
              </button>
              <button 
                className={`tab ${activeTab === 'investees' ? 'active' : ''}`}
                onClick={() => setActiveTab('investees')}
              >
                Property Owners
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'investors' && (
                <div className="investors-panel">
                  <div className="panel-header">
                    <h2>Registered Investors</h2>
                    <button 
                      className="action-button" 
                      onClick={() => dispatch(getAllCustomersThunk())}
                    >
                      Load All Investors
                    </button>
                  </div>
                  
                  {allCustomers && allCustomers.length > 1 ? (
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allCustomers.map(customer => 
                            customer.id !== "" ? (
                              <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.address}</td>
                                <td className="actions-cell">
                                  <button 
                                    className="edit-button"
                                    onClick={() => {
                                      setCurrentId(customer.id);
                                      setEditCustomer(customer);
                                      setIsEdit(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="delete-button"
                                    onClick={() => {
                                      setCurrentId(customer.id);
                                      setInsure(true);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No investors found. Click "Load All Investors" to fetch data.</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'investees' && (
                <div className="investees-panel">
                  <div className="panel-header">
                    <h2>Registered Property Owners</h2>
                    <button 
                      className="action-button" 
                      onClick={() => dispatch(getAllInvesteesThunk())}
                    >
                      Load All Property Owners
                    </button>
                  </div>
                  
                  {allInvestees && allInvestees.length > 0 ? (
                    <div className="investees-grid">
                      {allInvestees.map(investee => (
                        <div key={investee.id} className="investee-card">
                          <div className="investee-details">
                            <h3>{investee.name}</h3>
                            <div className="detail-item">
                              <span className="label">Phone:</span>
                              <span>{investee.phoneNumber}</span>
                            </div>
                            <div className="detail-item">
                              <span className="label">Address:</span>
                              <span>{investee.address}</span>
                            </div>
                          </div>
                          <div className="investee-actions">
                            <button 
                              className="delete-button"
                              onClick={() => {
                                setCurrentId2(investee.id);
                                setInsure2(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No property owners found. Click "Load All Property Owners" to fetch data.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {isEdit && (
            <div className="modal-overlay">
              <div className="modal edit-modal">
                <div className="modal-header">
                  <h2>Edit Investor</h2>
                  <button className="close-button" onClick={() => setIsEdit(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      value={editCustomer.name}
                      onChange={e => setEditCustomer({...editCustomer, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      value={editCustomer.phoneNumber}
                      onChange={e => setEditCustomer({...editCustomer, phoneNumber: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input 
                      type="text" 
                      value={editCustomer.address}
                      onChange={e => setEditCustomer({...editCustomer, address: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="save-button"
                    onClick={() => {
                      dispatch(updateCustomerThunk(editCustomer));
                      // dispatch(getAllCustomersThunk());
                      setIsEdit(false);
                    }}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {insure && (
            <div className="modal-overlay">
              <div className="modal confirm-modal">
                <div className="modal-header">
                  <h2>Confirm Deletion</h2>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this investor permanently?</p>
                  <p className="warning">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button 
                    className="delete-button"
                    onClick={() => {
                      setInsure(false);
                      dispatch(delCustomerThunk(currentId));
                      dispatch(getAllCustomersThunk());
                    }}
                  >
                    Delete
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => setInsure(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {insure2 && (
            <div className="modal-overlay">
              <div className="modal confirm-modal">
                <div className="modal-header">
                  <h2>Confirm Deletion</h2>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this property owner permanently?</p>
                  <p className="warning">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button 
                    className="delete-button"
                    onClick={() => {
                      setInsure2(false);
                      dispatch(deleteInvesteeThunk(currentId2));
                      dispatch(getAllInvesteesThunk());
                    }}
                  >
                    Delete
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => setInsure2(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
