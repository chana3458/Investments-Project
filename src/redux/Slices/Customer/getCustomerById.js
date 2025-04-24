
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getCustomerByIdThunk=createAsyncThunk(

    'getCustomerByIdThunk',
    async(id)=>{
const response=await fetch(`http://localhost:5213/api/Customer/GetCustomerById/${id}`);


if(response.ok){
  const  data=await response.json();
  return data;
}
else{
    throw new Error("failed to fetch");
}
    }
)