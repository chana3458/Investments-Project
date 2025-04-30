// import { useState } from "react";
// import { useDispatch } from "react-redux";
//  import { addInvesteeThunk } from "../../redux/Slices/investee/addInvesteeThunk";
// import { useNavigate } from "react-router-dom";

// export const InvesteeRegister=()=>{
//     const [newInvestee,setNewInvestee]=useState({id:"",name:"",phoneNumber:"",address:""})
//     const dispatch=useDispatch()
//     const navigate=useNavigate();

// return <div>
//     <div className="aa">
// <div>insert id</div>
//     <input type="text" onChange={(e)=>{
//         setNewInvestee({...newInvestee,id:e.target.value});
//         }}/>
// <button onClick={()=>navigate(`/home`)}>home</button>
//     <div>insert name</div>
//     <input type="text" onChange={e=>setNewInvestee({...newInvestee,name:e.target.value})}/>
//     <div>insert phone number</div>
//     <input type="text" onChange={e=>setNewInvestee({...newInvestee,phoneNumber:e.target.value})}/>
//     <div>insert Address</div>
//     <input type="text" onChange={e=>setNewInvestee({...newInvestee,address:e.target.value})} />
//     <br></br>
//     <button onClick={async()=>{dispatch(addInvesteeThunk(newInvestee))}}>ok</button>







//     </div>
// </div>


// }


import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addInvesteeThunk } from "../../redux/Slices/investee/addInvesteeThunk";
import { useNavigate } from "react-router-dom";
import "./investeeRegister.css";

export const InvesteeRegister = () => {
  const [newInvestee, setNewInvestee] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    address: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const validateForm = () => {
    let errors = {};
    
    if (!newInvestee.id.trim()) {
      errors.id = "ID is required";
    }
    
    if (!newInvestee.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!newInvestee.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(newInvestee.phoneNumber.trim())) {
      errors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (!newInvestee.address.trim()) {
      errors.address = "Address is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await dispatch(addInvesteeThunk(newInvestee));
        // Show success message
        alert("Property registration successful!");
        navigate('/investee');
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="investee-register-container">
      <div className={`register-card ${isLoaded ? 'loaded' : ''}`}>
        <div className="register-header">
          <h2>Property Registration</h2>
          <p>List your property and connect with potential investors</p>
        </div>
        
        <div className="register-form">
          {/* <div className="form-group">
            <label>Property ID</label>
            <input 
              type="text" 
              value={newInvestee.id}
              onChange={(e) => setNewInvestee({...newInvestee, id: e.target.value})}
              placeholder="Enter property ID"
              className={formErrors.id ? "error" : ""}
            />
            {formErrors.id && <span className="error-message">{formErrors.id}</span>}
          </div>
           */}
          <div className="form-group">
            <label>Property Name/Title</label>
            <input 
              type="text" 
              value={newInvestee.name}
              onChange={e => setNewInvestee({...newInvestee, name: e.target.value})}
              placeholder="Enter property name or title"
              className={formErrors.name ? "error" : ""}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Contact Phone Number</label>
            <input 
              type="text" 
              value={newInvestee.phoneNumber}
              onChange={e => setNewInvestee({...newInvestee, phoneNumber: e.target.value})}
              placeholder="Enter contact phone number"
              className={formErrors.phoneNumber ? "error" : ""}
            />
            {formErrors.phoneNumber && <span className="error-message">{formErrors.phoneNumber}</span>}
          </div>
          
          <div className="form-group">
            <label>Property Address</label>
            <input 
              type="text" 
              value={newInvestee.address}
              onChange={e => setNewInvestee({...newInvestee, address: e.target.value})}
              placeholder="Enter property address"
              className={formErrors.address ? "error" : ""}
            />
            {formErrors.address && <span className="error-message">{formErrors.address}</span>}
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Register Property"}
          </button>
          
          <button 
            className="cancel-button" 
            onClick={() => navigate(`/home`)}
            disabled={isSubmitting}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
