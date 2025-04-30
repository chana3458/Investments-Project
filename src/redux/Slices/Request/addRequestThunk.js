
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addRequestThunk=createAsyncThunk(

    'addRequestThunk',
    async(newReq)=>{
        debugger
const response=await fetch(`http://localhost:5213/api/Reqeusts/AddRequest`,
{
method:'POST',
body:JSON.stringify(newReq),
headers:{

'Content-Type':'application/json'
}
}
);


if(response.ok){
  const  data=await response.json();
  return data;
}
else{
    
    throw new Error("failed to fetch");
}
    }
)