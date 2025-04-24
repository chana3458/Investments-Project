//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const delCustomerThunk = createAsyncThunk(
    'delCustomerThunk',
     async (customerId)=>{
        debugger
       
        const response = await fetch(` http://localhost:5213/api/Customer/DeleteCustomer/${customerId}`,{method: 'DELETE'},    {mode: 'no-cors'});
       
        const data = await response.json()
        console.log(data);
        return data;
        })
