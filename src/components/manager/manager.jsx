import { useDispatch, useSelector } from "react-redux";
import { getAllCustomersThunk } from "../../redux/Slices/Customer/getAllCustomersThunk"
import { useState } from "react";
import { getAllInvesteesThunk } from "../../redux/Slices/investee/getAllInvesteesThunk";
import { delCustomerThunk } from "../../redux/Slices/Customer/deleteCustomerThunk";
import { useNavigate } from "react-router-dom";
import "./manager.css"
import { deleteInvesteeThunk } from "../../redux/Slices/investee/deleteInvesteeThunk";
export const Manager=()=>{
    const dispatch=useDispatch();
 const allCustomers=useSelector(state=> state.customers.customers);
 const allInvestees=useSelector(state=> state.investees.investees);

let isManager=false;
let not=false;
const manager="1234";
let id="50";
const navigate=useNavigate();
const [currentPassword,setCurrentPassword]=useState("");
const [currentId,setCurrentId]=useState();
const [currentId2,setCurrentId2]=useState();

const [insure,setInsure]=useState(false);
const [insure2,setInsure2]=useState(false);

const checkManager=()=>{
    if (currentPassword===manager)
        isManager=true;
    else
        not=true;

}

return <div className='manager'>
    <div>
    <button onClick={()=>navigate(`/home`)}>home</button>

    <input type="password" onChange={e=>setCurrentPassword(e.target.value)} />
   <button onClick={checkManager()}>ok</button>
   </div>
{ isManager&& <div>
אופציות למנהל
<br></br>
<button onClick={async()=>{dispatch(getAllCustomersThunk())}}>all investers</button>
<button onClick={async()=>{dispatch(getAllInvesteesThunk())}}>all investees</button>


<div>{
    <table>
    <thead>
        <th>ID</th>
         <th>NAME</th>
         <th>PHONENUMBER</th>
        <th>ADDRESS</th>
        <th>DELETE</th>
    </thead>
     {allCustomers.map(r =>
     r.id!==""?
        <tr>
        <td>{r.id}</td>
        <td>{r.name}</td>
        <td>{r.phoneNumber}</td>
        <td>{r.address}</td>
        <td ><input type="checkbox" name="edit" id="5" onClick={()=> {setCurrentId(r.id);setInsure(true);}}/></td>
        {/* <td> <button onClick={()=>setCurrentId(r.id)} > delete</button></td> */}
    </tr>:<></>
     
    )}
 </table>


  
}</div>

{insure &&<div>
    <div>are you sure you want to delete this custumer permanently ?</div>
    <div  onClick={()=>{setInsure(false); dispatch(delCustomerThunk(currentId));dispatch(getAllCustomersThunk())}}>delete</div>
    <div onClick={()=>setInsure(false)}>no</div>
</div>
}

{insure2 &&<div>
    <div>are you sure you want to delete this custumer permanently ?</div>
    <div  onClick={()=>{setInsure2(false); dispatch(deleteInvesteeThunk(currentId2));dispatch(getAllInvesteesThunk())}}>delete</div>
    <div onClick={()=>setInsure2(false)}>no</div>
</div>
}



{/* <button onClick={async()=>{dispatch(delCustomerThunk(currentId))}}>delete investers</button>  */}

<div>{
    
    allInvestees.map(investee=> <div key={investee.id}>
        <br />
        <div>{investee.name}</div>
        <div>{investee.phoneNumber}</div>
        <div>{investee.address}</div>
        <input type="checkbox" name="edit" id="5" onClick={()=> {setCurrentId2(investee.id);setInsure2(true);}}/>
        </div>
    )}
</div>

</div>



}
{not&&<span> insert password</span>}
</div>
}