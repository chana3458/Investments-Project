
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllInvestmentsThunk=createAsyncThunk(

    'getAllInvestmentsThunk',
    async()=>{
        debugger
const response=await fetch(`http://localhost:5213/api/Invstment/GetAllInvstment`);


if(response.ok){
  const  data=await response.json();
  return data;
}
else{
    throw new Error("failed to fetch");
}
    }
)