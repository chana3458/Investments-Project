// import { useState } from "react";
// import { useDispatch } from "react-redux";
//  import { addInvesteeThunk } from "../../redux/Slices/investee/addInvesteeThunk";
// import { useNavigate } from "react-router-dom";

// export const Request=()=>{
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
import { addRequestThunk } from "../../redux/Slices/Customer/";
import { useNavigate } from "react-router-dom";
import "./request.css";

export const Request = () => {
  const [newReq, setNewReq] = useState({
    id: "",
    Budget: "",
    Risk_Level: "",
    Range: ""
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
    
    if (!newReq.id.trim()) {
      errors.id = "ID is required";
    }
    
    if (!newReq.Budget.trim()) {
      errors.Budget = "Budget is required";
    } else if (isNaN(newReq.Budget) || parseFloat(newReq.Budget) <= 0) {
      errors.Budget = "Please enter a valid budget amount";
    }
    
    if (!newReq.Risk_Level.trim()) {
      errors.Risk_Level = "Risk level is required";
    } else if (isNaN(newReq.Risk_Level) || parseInt(newReq.Risk_Level) < 0 || parseInt(newReq.Risk_Level) > 10) {
      errors.Risk_Level = "Risk level must be between 0 and 10";
    }
    
    if (!newReq.Range.trim()) {
      errors.Range = "Investment range is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await dispatch(addRequestThunk(newReq));
        alert("Investment request submitted successfully!");
        navigate('/investor');
      } catch (error) {
        console.error("Request submission failed:", error);
        alert("Request submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="request-container">
      <div className={`request-card ${isLoaded ? 'loaded' : ''}`}>
        <div className="request-header">
          <h2>Investment Request</h2>
          <p>Tell us about your investment preferences</p>
        </div>
        
        <div className="request-form">
          <div className="form-group">
            <label>Investor ID</label>
            <input 
              type="text" 
              value={newReq.id}
              onChange={e => setNewReq({...newReq, id: e.target.value})}
              placeholder="Enter your investor ID"
              className={formErrors.id ? "error" : ""}
            />
            {formErrors.id && <span className="error-message">{formErrors.id}</span>}
          </div>
          
          <div className="form-group">
            <label>Investment Budget</label>
            <div className="input-with-icon">
              <span className="currency-symbol">$</span>
              <input 
                type="text" 
                value={newReq.Budget}
                onChange={e => setNewReq({...newReq, Budget: e.target.value})}
                placeholder="Enter your investment budget"
                className={formErrors.Budget ? "error with-icon" : "with-icon"}
              />
            </div>
            {formErrors.Budget && <span className="error-message">{formErrors.Budget}</span>}
          </div>
          
          <div className="form-group">
            <label>Risk Tolerance Level (0-10)</label>
            <div className="range-container">
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={newReq.Risk_Level || "0"}
                onChange={e => setNewReq({...newReq, Risk_Level: e.target.value})}
                className="range-slider"
              />
              <div className="range-labels">
                <span>Low Risk</span>
                <span>Medium</span>
                <span>High Risk</span>
              </div>
              <div className="range-value">{newReq.Risk_Level || "0"}</div>
            </div>
            {formErrors.Risk_Level && <span className="error-message">{formErrors.Risk_Level}</span>}
          </div>
          
          <div className="form-group">
            <label>Investment Range</label>
            <select 
              value={newReq.Range}
              onChange={e => setNewReq({...newReq, Range: e.target.value})}
              className={formErrors.Range ? "error" : ""}
            >
              <option value="">Select investment range</option>
              <option value="short">Short-term (1-2 years)</option>
              <option value="medium">Medium-term (3-5 years)</option>
              <option value="long">Long-term (5+ years)</option>
            </select>
            {formErrors.Range && <span className="error-message">{formErrors.Range}</span>}
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit Request"}
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

