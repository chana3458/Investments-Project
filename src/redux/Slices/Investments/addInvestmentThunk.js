
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addInvestmentThunk=createAsyncThunk(

    'addInvestmentThunk',
    async(newInvestment)=>{
const response=await fetch(`http://localhost:5213/api/Invstment/AddInvstment`,
{
method:'POST',
body:JSON.stringify(newInvestment),
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