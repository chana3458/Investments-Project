import { createSlice } from "@reduxjs/toolkit";
import { addRequestThunk } from "./addRequestThunk";



const INITIAL_STATE_INVESTEE={

request:[{
    id:"",
    Budget:"",
    RequestId:"",
    GotOffer:"",
    Range :"",
    Risk_Level:""

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


    }

})
