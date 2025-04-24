import { useDispatch, useSelector } from "react-redux";

import { getCustomerByIdThunk } from "../../redux/Slices/Customer/getCustomerById";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PersonalDetails=()=>{
    const [id,setId]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const customer=useSelector(state=> state.customers.customer);
    const isCustomer=useSelector(state=> state.customers.isCustomer)
return <div>
<input type="text" placeholder="inset id" onChange={e=>setId(e.target.value)}/>

<button onClick={async()=>{dispatch(getCustomerByIdThunk(id))}}>log in</button>

    
{isCustomer&&
<div>
        <br />
        <h1>hello</h1>
        <div>{customer.name}</div>
        <span>these are your details:</span>
        <div>{customer.phoneNumber}</div>
        <div>{customer.id}</div>

        <button onClick={()=>navigate(`/request`)}>add request</button>
        </div>
}
        </div>
       
 




















}