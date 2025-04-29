// import { useState } from "react"
// import { useDispatch } from "react-redux"

// import { addCustomersThunk } from "../../redux/Slices/Customer/addCustomerThunk"
// import { useNavigate } from "react-router-dom"

// export const CustomerRegister=()=>{
//     const dispatch=useDispatch()
// const [newCustomer,setNewCustomer]=useState({id:"",name:"",phoneNumber:"",address:""})
// const [requestDetails,setRequestDetails]=useState({id:"",Budget:"",Risk_Level:0,Range:""})
// const [personalDetails,setPersonalDetails]=useState({kids:"",salary:"",age:"",oldestChild:"",youngestChild:"",points:0})
// const navigate=useNavigate();
// const calculate=()=>{


//     if(personalDetails.salary/personalDetails.kids>2000)
//         personalDetails.points++;
//     if(personalDetails.oldestChild-personalDetails.youngestChild/personalDetails.kids>4)
//         personalDetails.points++;
//     setRequestDetails({...requestDetails,Risk_Level:personalDetails.points})


// }
// return <div className="a">
// <button onClick={()=>navigate(`/home`)}>home</button>
//     <div>insert id</div>
//     <input type="text" onChange={(e)=>{
//         setNewCustomer({...newCustomer,id:e.target.value});
//         setRequestDetails({...requestDetails,id:e.target.value})}}/>
//     <div>insert name</div>
//     <input type="text" onChange={e=>setNewCustomer({...newCustomer,name:e.target.value})}/>
//     <div>insert phone number</div>
//     <input type="text" onChange={e=>setNewCustomer({...newCustomer,phoneNumber:e.target.value})}/>
//     <div>insert Address</div>
//     <input type="text" onChange={e=>setNewCustomer({...newCustomer,address:e.target.value})} />
//     <br></br>

//     <div>insert number of children</div>
//     <input type="text" onChange={e=>setPersonalDetails({...personalDetails,kids:e.target.value})}/>
//     <div>insert salary</div>
//     <input type="text" onChange={e=>setPersonalDetails({...personalDetails,salary:e.target.value})}/>
//     <div>insert age</div>
//     <input type="text" onChange={e=>setPersonalDetails({...personalDetails,age:e.target.value})}/>
//     <div>insert oldestChild</div>
//     <input type="text" onChange={e=>setPersonalDetails({...personalDetails,oldestChild:e.target.value})} />
//     <div>insert youngestChild</div>
//     <input type="text" onChange={e=>setPersonalDetails({...personalDetails,youngestChild:e.target.value})} />
//     <br></br>
//     <button onClick={async()=>{dispatch(addCustomersThunk(newCustomer));calculate()}}>ok</button>
   
// </div>

// }



import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomersThunk } from "../../redux/Slices/Customer/addCustomerThunk";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

export const CustomerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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

  const calculate = () => {
    let points = 0;
    if (personalDetails.salary / personalDetails.kids > 2000)
      points++;
    if ((personalDetails.oldestChild - personalDetails.youngestChild) / personalDetails.kids > 4)
      points++;
    
    setPersonalDetails({...personalDetails, points: points});
    setRequestDetails({...requestDetails, Risk_Level: points});
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
            <label>ID Number</label>
            <input 
              type="text" 
              onChange={(e) => {
                setNewCustomer({...newCustomer, id: e.target.value});
                setRequestDetails({...requestDetails, id: e.target.value});
              }}
              placeholder="Enter your ID number"
            />
          </div>
          
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              onChange={e => setNewCustomer({...newCustomer, phoneNumber: e.target.value})}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              onChange={e => setNewCustomer({...newCustomer, address: e.target.value})}
              placeholder="Enter your address"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Family Information</h3>
          <div className="form-group">
            <label>Number of Children</label>
            <input 
              type="number" 
              onChange={e => setPersonalDetails({...personalDetails, kids: e.target.value})}
              placeholder="Enter number of children"
            />
          </div>
          
          <div className="form-group">
            <label>Monthly Salary</label>
            <input 
              type="number" 
              onChange={e => setPersonalDetails({...personalDetails, salary: e.target.value})}
              placeholder="Enter your monthly salary"
            />
          </div>
          
          <div className="form-group">
            <label>Your Age</label>
            <input 
              type="number" 
              onChange={e => setPersonalDetails({...personalDetails, age: e.target.value})}
              placeholder="Enter your age"
            />
          </div>
          
          <div className="form-group">
            <label>Age of Oldest Child</label>
            <input 
              type="number" 
              onChange={e => setPersonalDetails({...personalDetails, oldestChild: e.target.value})}
              placeholder="Enter age of oldest child"
            />
          </div>
          
          <div className="form-group">
            <label>Age of Youngest Child</label>
            <input 
              type="number" 
              onChange={e => setPersonalDetails({...personalDetails, youngestChild: e.target.value})}
              placeholder="Enter age of youngest child"
            />
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          className="submit-button" 
          onClick={async() => {
            calculate();
            dispatch(addCustomersThunk(newCustomer));
          }}
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
};
