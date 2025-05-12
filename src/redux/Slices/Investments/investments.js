import { createSlice } from "@reduxjs/toolkit";




const INITIAL_STATE_INVESTEE={

investments:[{
    id:"",
    Budget:"",
    RequestId:"",
    GotOffer:"",
    Range :"",
    Risk_Level:""

}]

}
export  const investmentSlice=createSlice({
    name:'investments',
    initialState:INITIAL_STATE_INVESTEE,
    reducers:{
    },

    extraReducers:(builder)=>{



    }

})
