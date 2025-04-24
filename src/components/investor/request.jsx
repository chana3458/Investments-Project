import { useState } from "react";
import { useDispatch } from "react-redux";
 import { addInvesteeThunk } from "../../redux/Slices/investee/addInvesteeThunk";
import { useNavigate } from "react-router-dom";

export const Request=()=>{
    const [newInvestee,setNewInvestee]=useState({id:"",name:"",phoneNumber:"",address:""})
    const dispatch=useDispatch()
    const navigate=useNavigate();

return <div>
    <div className="aa">
<div>insert id</div>
    <input type="text" onChange={(e)=>{
        setNewInvestee({...newInvestee,id:e.target.value});
        }}/>
<button onClick={()=>navigate(`/home`)}>home</button>
    <div>insert name</div>
    <input type="text" onChange={e=>setNewInvestee({...newInvestee,name:e.target.value})}/>
    <div>insert phone number</div>
    <input type="text" onChange={e=>setNewInvestee({...newInvestee,phoneNumber:e.target.value})}/>
    <div>insert Address</div>
    <input type="text" onChange={e=>setNewInvestee({...newInvestee,address:e.target.value})} />
    <br></br>
    <button onClick={async()=>{dispatch(addInvesteeThunk(newInvestee))}}>ok</button>







    </div>
</div>


}