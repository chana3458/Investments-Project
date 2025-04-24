
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addCustomersThunk=createAsyncThunk(

    'addCustomersThunk',
    async(newCustomer)=>{
const response=await fetch(`http://localhost:5213/api/Customer/AddCustomer`,
{
method:'POST',
body:JSON.stringify(newCustomer),
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