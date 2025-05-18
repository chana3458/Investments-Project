import { createSlice } from "@reduxjs/toolkit";
import { addRequestThunk } from "./addRequestThunk";
import { getAllRequestThunk } from "./getAllRequestThunk";



const INITIAL_STATE_INVESTEE={

requests:[{
    id:"",
    babeludget:"",
    requestId:"",
    gotOffer:"",
    range :"",
    risk_Level:"",
    name:"",
    phoneNumber:"", 
}]

}
export  const requestSlice=createSlice({
    name:'request',
    initialState:INITIAL_STATE_INVESTEE,
    reducers:{
    },

    extraReducers:(builder)=>{

builder.addCase(addRequestThunk.fulfilled,(state,action)=>{

    state.request=action.payload;
})
builder.addCase(getAllRequestThunk.fulfilled,(state,action)=>{
console.log(action.payload);    
    state.requests=action.payload;
})



    }

})
