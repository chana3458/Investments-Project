//  import { Link } from "react-router-dom"
import {  useNavigate } from "react-router-dom"
 import {  useDispatch, useSelector } from "react-redux"
//  import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
//  import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
//  import ContactsIcon from '@mui/icons-material/Contacts';
import "./home.css"
// import Icon from '@mui/material/Icon';
// import * as React from 'react';
// import Tooltip from '@mui/material/Tooltip';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//  import {CORS} from flask_cors

 
 

export const Home=()=>{
const navigate=useNavigate();
const dispatch=useDispatch();
//state?.customer.customers

//   function LoadingIconButton() {
//     const [loading, setLoading] = React.useState(false);
//     React.useEffect(() => {
//       const timeout = setTimeout(() => {
//         setLoading(false);
//       }, 2000);
//       return () => clearTimeout(timeout);
//     });
//     return (
//       <Tooltip title="Click to see loading">
//         <IconButton onClick={() => setLoading(true)} loading={loading}>
//           <ShoppingCartIcon />
//         </IconButton>
//       </Tooltip>
//     );
//   }
  
return <div>
<div>logo</div>
{/* <svg data-testid="ContactsIcon"></svg> */}
{/* <Icon>star</Icon>; */}
<div class="mis">
<button  onClick={()=>navigate(`/investor`)}>investor</button>

<button  onClick={()=>navigate(`/investee`)}>investee</button>

<button  onClick={()=>navigate(`/information`)}>information</button>

<button  onClick={()=>navigate(`/manager`)}> 🤵🏻 </button></div>
{/* <button onClick={()=>navigate(`/customerRegister`)}>add</button> */}
{/* <button  onClick={()=>navigate(`/menu`)}>go</button> */}


</div>


}