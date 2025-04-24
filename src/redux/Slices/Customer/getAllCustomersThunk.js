
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllCustomersThunk=createAsyncThunk(

    'getAllCustomersThunk',
    async()=>{
const response=await fetch(`http://localhost:5213/api/Customer/GetAllCustomers`);


if(response.ok){
  const  data=await response.json();
  return data;
}
else{
    throw new Error("failed to fetch");
}
    }
)