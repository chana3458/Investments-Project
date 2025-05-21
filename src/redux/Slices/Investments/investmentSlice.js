import { createSlice } from "@reduxjs/toolkit";
import { getAllInvestmentsThunk } from "./getAllInvestmentsThunk";
import { addInvestmentThunk } from "./addInvestmentThunk";




const INITIAL_STATE_INVESTEE={

investments:[{
    id: " ",
        title: " ",
        location: " ",
        type: " ",
        price: 0,
        roi: 0.0,
        term: 0, 
        minInvestment: 0,
        description: "",
        features: "",
        images: "",
        investorCount: 0,
        expectedCompletion: " "

}]

}
export  const investmentSlice=createSlice({
    name:'investments',
    initialState:INITIAL_STATE_INVESTEE,
    reducers:{
    },

    extraReducers:(builder)=>{


        builder.addCase(getAllInvestmentsThunk.fulfilled, (state, action) => {

            state.investments = action.payload;
        });

        builder.addCase(addInvestmentThunk.fulfilled, (state, action) => {

            state.investments = action.payload;
        });


    }

})
