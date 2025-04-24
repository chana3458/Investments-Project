import { useNavigate } from "react-router-dom"

export const Investor=()=>{
    const navigate=useNavigate();
return <div>
<div>info</div>
<div>heighst</div>
<div>lowest</div>

    <button onClick={()=>navigate(`/customerRegister`)}>to register</button>
    <button onClick={()=>navigate(`/home`)}>home</button>
    <button onClick={()=>navigate(`/personalDetails`)}>אזור אישי</button>


</div> }


