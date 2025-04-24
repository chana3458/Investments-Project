import {  useNavigate } from "react-router-dom"

export const Investee=()=>{
    const navigate=useNavigate();
return <div>
<div>info</div>

<button onClick={()=>navigate(`/investeeRegister`)}>to register</button>
<button onClick={()=>navigate(`/home`)}>home</button>
</div>
}