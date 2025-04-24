
import { Navigate, useNavigate } from "react-router-dom"


export const RealEstate=()=>{
    const navigate=useNavigate();

return <div>

<div onClick={()=>navigate(`/customerRegister`)}>customers</div>
<div>suppliers</div>
<div>information</div>
<button onClick={()=>navigate(`/home`)}>home</button>

</div>


}