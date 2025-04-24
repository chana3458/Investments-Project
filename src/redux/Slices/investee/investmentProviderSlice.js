// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllInvesteesThunk } from "./getAllInvesteesThunk";
import { deleteInvesteeThunk } from "./deleteInvesteeThunk";


const INITIAL_STATE_INVESTEE={

investees:[{

id:"",
name:"",
phoneNumber:"",
address:""
}]

}
export  const InvestmentProviderSlice=createSlice({
    name:'investees',
    initialState:INITIAL_STATE_INVESTEE,
    reducers:{
    },

    extraReducers:(builder)=>{

builder.addCase(getAllInvesteesThunk.fulfilled,(state,action)=>{

    state.investees=action.payload;
})
builder.addCase(deleteInvesteeThunk.fulfilled,(state,action)=>{

    state.investees=action.payload;
})
    }

})
