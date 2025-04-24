import { useState } from "react"
import { useDispatch } from "react-redux"

import { addCustomersThunk } from "../../redux/Slices/Customer/addCustomerThunk"
import { useNavigate } from "react-router-dom"

export const CustomerRegister=()=>{
    const dispatch=useDispatch()
const [newCustomer,setNewCustomer]=useState({id:"",name:"",phoneNumber:"",address:""})
const [requestDetails,setRequestDetails]=useState({id:"",Budget:"",Risk_Level:0,Range:""})
const [personalDetails,setPersonalDetails]=useState({kids:"",salary:"",age:"",oldestChild:"",youngestChild:"",points:0})
const navigate=useNavigate();
const calculate=()=>{


    if(personalDetails.salary/personalDetails.kids>2000)
        personalDetails.points++;
    if(personalDetails.oldestChild-personalDetails.youngestChild/personalDetails.kids>4)
        personalDetails.points++;
    setRequestDetails({...requestDetails,Risk_Level:personalDetails.points})


}
return <div className="a">
<button onClick={()=>navigate(`/home`)}>home</button>
    <div>insert id</div>
    <input type="text" onChange={(e)=>{
        setNewCustomer({...newCustomer,id:e.target.value});
        setRequestDetails({...requestDetails,id:e.target.value})}}/>
    <div>insert name</div>
    <input type="text" onChange={e=>setNewCustomer({...newCustomer,name:e.target.value})}/>
    <div>insert phone number</div>
    <input type="text" onChange={e=>setNewCustomer({...newCustomer,phoneNumber:e.target.value})}/>
    <div>insert Address</div>
    <input type="text" onChange={e=>setNewCustomer({...newCustomer,address:e.target.value})} />
    <br></br>

    <div>insert number of children</div>
    <input type="text" onChange={e=>setPersonalDetails({...personalDetails,kids:e.target.value})}/>
    <div>insert salary</div>
    <input type="text" onChange={e=>setPersonalDetails({...personalDetails,salary:e.target.value})}/>
    <div>insert age</div>
    <input type="text" onChange={e=>setPersonalDetails({...personalDetails,age:e.target.value})}/>
    <div>insert oldestChild</div>
    <input type="text" onChange={e=>setPersonalDetails({...personalDetails,oldestChild:e.target.value})} />
    <div>insert youngestChild</div>
    <input type="text" onChange={e=>setPersonalDetails({...personalDetails,youngestChild:e.target.value})} />
    <br></br>
    <button onClick={async()=>{dispatch(addCustomersThunk(newCustomer));calculate()}}>ok</button>
   
</div>

}