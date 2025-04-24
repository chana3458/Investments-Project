
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addInvesteeThunk=createAsyncThunk(

    'addInvesteeThunk',
    async(newInvestee)=>{
const response=await fetch(`http://localhost:5213/api/InvestmentProvider/AddInvestmentProvider`,
{
method:'POST',
body:JSON.stringify(newInvestee),
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