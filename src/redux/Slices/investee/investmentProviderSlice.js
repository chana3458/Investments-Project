// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getAllInvesteesThunk } from "./getAllInvesteesThunk";
import { deleteInvesteeThunk } from "./deleteInvesteeThunk";
import { updateInvesteerThunk } from "./updateInvesteeThunk";
import { act } from "react";


const INITIAL_STATE_INVESTEE = {

    investees: [{

        id: "",
        name: "",
        phoneNumber: "",
        address: ""
    }],
    investee: {

        id: "",
        name: "",
        phoneNumber: "",
        address: ""
    }

}
export const InvestmentProviderSlice = createSlice({
    name: 'investees',
    initialState: INITIAL_STATE_INVESTEE,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(updateInvesteerThunk.fulfilled, (state, action) => {
alert("investee updated");
            state.investees = action.payload;
        })
        builder.addCase(updateInvesteerThunk.rejected, (state, action) => {
            alert(action.error.message);
                        state.investees = action.payload;
                    })
        builder.addCase(getAllInvesteesThunk.fulfilled, (state, action) => {

            state.investees = action.payload;
        })
        builder.addCase(deleteInvesteeThunk.fulfilled, (state, action) => {

            state.investees = action.payload;
        })
    }

})
