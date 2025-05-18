
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllRequestThunk=createAsyncThunk(

    'getAllRequestThunk',
    async()=>{
const response=await fetch(`http://localhost:5213/api/Reqeusts/GetAllRequests`);


if(response.ok){
    
    

  const  data=await response.json();
  
  console.log(data)
  return data;
}
else{
    
    throw new Error("failed to fetch");
}
    }
)