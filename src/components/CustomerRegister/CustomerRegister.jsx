import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomersThunk } from "../../redux/Slices/Customer/addCustomerThunk";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

export const CustomerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const allCustomers = useSelector(state => state.customers.customers);


  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    address: ""
  });
  
  const [requestDetails, setRequestDetails] = useState({
    id: "",
    Budget: "",
    Risk_Level: 0,
    Range: ""
  });
  
  const [personalDetails, setPersonalDetails] = useState({
    kids: "",
    salary: "",
    age: "",
    oldestChild: "",
    youngestChild: "",
    points: 0
  });

  const validateForm = () => {
    const newErrors = {};
    debugger;
    // Validate ID
   
    if (!newCustomer.id) {
      newErrors.id = "ID is required";
    }  else if (allCustomers.some(customer => customer.id === newCustomer.id)) {
      newErrors.id = "ID already exists";
    }
    else if (newCustomer.id.length !== 9) {
      newErrors.id = "ID must be exactly 9 digits";
    } else if (!/^\d+$/.test(newCustomer.id)) {
      newErrors.id = "ID must contain only digits";
    }
     
    
    
    // Validate name
    if (!newCustomer.name) {
      newErrors.name = "Name is required";
    } else if (newCustomer.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Validate phone number
    if (!newCustomer.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(newCustomer.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    
    // Validate address
    if (!newCustomer.address) {
      newErrors.address = "Address is required";
    } else if (newCustomer.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }
    
    // Validate kids
    if (!personalDetails.kids) {
      newErrors.kids = "Number of children is required";
    } else if (isNaN(personalDetails.kids) || personalDetails.kids < 0) {
      newErrors.kids = "Number of children must be a positive number";
    }
    
    // Validate salary
    if (!personalDetails.salary) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(personalDetails.salary) || personalDetails.salary <= 0) {
      newErrors.salary = "Salary must be a positive number";
    }
    
    // Validate age
    if (!personalDetails.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(personalDetails.age) || personalDetails.age < 18) {
      newErrors.age = "Age must be at least 18";
    }
    
    // Validate children ages if kids > 0
    if (personalDetails.kids > 0) {
      if (!personalDetails.oldestChild) {
        newErrors.oldestChild = "Oldest child's age is required";
      } else if (isNaN(personalDetails.oldestChild) || personalDetails.oldestChild <= 0) {
        newErrors.oldestChild = "Oldest child's age must be a positive number";
      }
      
      if (!personalDetails.youngestChild) {
        newErrors.youngestChild = "Youngest child's age is required";
      } else if (isNaN(personalDetails.youngestChild) || personalDetails.youngestChild < 0) {
        newErrors.youngestChild = "Youngest child's age must be a non-negative number";
      }
      
      // Check if oldest is actually older than youngest
      if (personalDetails.oldestChild && personalDetails.youngestChild && 
          Number(personalDetails.oldestChild) < Number(personalDetails.youngestChild)) {
        newErrors.youngestChild = "Youngest child cannot be older than the oldest child";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    let points = 0;
    if (Number(personalDetails.salary) / Number(personalDetails.kids) > 2000)
      points++;
    if ((Number(personalDetails.oldestChild) - Number(personalDetails.youngestChild)) / Number(personalDetails.kids) > 4)
      points++;
      
    setPersonalDetails({...personalDetails, points: points});
    setRequestDetails({...requestDetails, Risk_Level: points});
    
    return points;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        const riskLevel = calculate();
        const customerWithRisk = {
          ...newCustomer,
          riskLevel: riskLevel
        };
        
        await dispatch(addCustomersThunk(customerWithRisk));
        alert("Registration successful!");

        navigate('/home');
      } catch (error) {
        alert("Registration failed. Please try again.");
        console.error("Registration error:", error);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="customer-register-container">
      <div className="register-header">
        <button className="home-button" onClick={() => navigate(`/home`)}>
          <i className="fas fa-home"></i> Back to Home
        </button>
        <h2>Investor Registration</h2>
      </div>
      
      <div className="register-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>ID Number <span className="required">*</span></label>
            <input
              type="text"
              name="id"
              value={newCustomer.id}
              onChange={(e) => {
                setNewCustomer({...newCustomer, id: e.target.value});
                setRequestDetails({...requestDetails, id: e.target.value});
              }}
              placeholder="Enter your ID number"
              className={errors.id ? "input-error" : ""}
            />
            {errors.id && <div className="error-message">{errors.id}</div>}
          </div>
          
          <div className="form-group">
            <label>Full Name <span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
              placeholder="Enter your full name"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label>Phone Number <span className="required">*</span></label>
            <input
              type="text"
              name="phoneNumber"
              value={newCustomer.phoneNumber}
              onChange={e => setNewCustomer({...newCustomer, phoneNumber: e.target.value})}
              placeholder="Enter your phone number"
              className={errors.phoneNumber ? "input-error" : ""}
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
          </div>
          
          <div className="form-group">
            <label>Address <span className="required">*</span></label>
            <input
              type="text"
              name="address"
              value={newCustomer.address}
              onChange={e => setNewCustomer({...newCustomer, address: e.target.value})}
              placeholder="Enter your address"
              className={errors.address ? "input-error" : ""}
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>
        </div>
        
        <div className="form-section">
          <h3>Family Information</h3>
          <div className="form-group">
            <label>Number of Children <span className="required">*</span></label>
            <input
              type="number"
              name="kids"
              value={personalDetails.kids}
              onChange={e => setPersonalDetails({...personalDetails, kids: e.target.value})}
              placeholder="Enter number of children"
              className={errors.kids ? "input-error" : ""}
            />
            {errors.kids && <div className="error-message">{errors.kids}</div>}
          </div>
          
          <div className="form-group">
            <label>Monthly Salary <span className="required">*</span></label>
            <input
              type="number"
              name="salary"
              value={personalDetails.salary}
              onChange={e => setPersonalDetails({...personalDetails, salary: e.target.value})}
              placeholder="Enter your monthly salary"
              className={errors.salary ? "input-error" : ""}
            />
            {errors.salary && <div className="error-message">{errors.salary}</div>}
          </div>
          
          <div className="form-group">
            <label>Your Age <span className="required">*</span></label>
            <input
              type="number"
              name="age"
              value={personalDetails.age}
              onChange={e => setPersonalDetails({...personalDetails, age: e.target.value})}
              placeholder="Enter your age"
              className={errors.age ? "input-error" : ""}
            />
            {errors.age && <div className="error-message">{errors.age}</div>}
          </div>
          
          {personalDetails.kids > 0 && (
            <>
              <div className="form-group">
                <label>Age of Oldest Child <span className="required">*</span></label>
                <input
                  type="number"
                  name="oldestChild"
                  value={personalDetails.oldestChild}
                  onChange={e => setPersonalDetails({...personalDetails, oldestChild: e.target.value})}
                  placeholder="Enter age of oldest child"
                  className={errors.oldestChild ? "input-error" : ""}
                />
                {errors.oldestChild && <div className="error-message">{errors.oldestChild}</div>}
              </div>
              
              <div className="form-group">
                <label>Age of Youngest Child <span className="required">*</span></label>
                <input
                  type="number"
                  name="youngestChild"
                  value={personalDetails.youngestChild}
                  onChange={e => setPersonalDetails({...personalDetails, youngestChild: e.target.value})}
                  placeholder="Enter age of youngest child"
                  className={errors.youngestChild ? "input-error" : ""}
                />
                {errors.youngestChild && <div className="error-message">{errors.youngestChild}</div>}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="form-actions">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
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
  );
};