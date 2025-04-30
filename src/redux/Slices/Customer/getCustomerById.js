
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getCustomerByIdThunk=createAsyncThunk(

    'getCustomerByIdThunk',
    async(id)=>{
        // try{
const response=await fetch(`http://localhost:5213/api/Customer/GetCustomerById/${id}`);
if(response.ok){
    const  data=await response.json();
    return data;
  }
// }
// catch(error){

    // console.log(error.message);
     console.log(response.body.getReader());


    alert("oh no klkl")
    // alert(response);
    // console.log(response);
    throw new Error("failed to fetch");
    // }
  }
)