
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllInvesteesThunk=createAsyncThunk(

    'getAllInvesteesThunk',
    async()=>{
const response=await fetch(`http://localhost:5213/api/InvestmentProvider/GetAllInvestmentProviders`);


if(response.ok){
  const  data=await response.json();
  return data;
}
else{
    throw new Error("failed to fetch");
}
    }
)