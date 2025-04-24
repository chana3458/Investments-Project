//בס"ד

import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteInvesteeThunk = createAsyncThunk(
    'deleteInvesteeThunk',
     async (investeeId)=>{
       
       
        const response = await fetch(` http://localhost:5213/api/InvestmentProvider/DeleteInvestmentProvider/${investeeId}`,{method: 'DELETE'},    {mode: 'no-cors'});
       
        const data = await response.json()
        console.log(data);
        return data;
        })
