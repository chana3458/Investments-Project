import { createSlice } from "@reduxjs/toolkit";
import { getAllCustomersThunk } from "./getAllCustomersThunk";
import { delCustomerThunk } from "./deleteCustomerThunk";
import { getCustomerByIdThunk } from "./getCustomerById";


const INITIAL_STATE_CUSTOMER={
  
    isCustomer:false,
customer:{

    id:"",
    name:"",
    phoneNumber:"",
    address:""
    },
customers:[{

id:"",
name:"",
phoneNumber:"",
address:""
}]
}


export const customerSlice=createSlice({
    name:'customers',
    initialState:INITIAL_STATE_CUSTOMER,
    reducers:{
        addCustomer:(state,action)=>{
        state.customers.push(action.payload)
        },
       
    },

    extraReducers:(builder)=>{

builder.addCase(getAllCustomersThunk.fulfilled,(state,action)=>{

    state.customers=action.payload;
});
builder.addCase(getCustomerByIdThunk.fulfilled,(state,action)=>{

    state.customer=action.payload;
    state.isCustomer=true;
});
// builder.addCase(addCustomersThunk.fulfilled,(state,action)=>{

//     state.customers=action.payload;
// });
builder.addCase(delCustomerThunk.fulfilled,(state,action)=>{

    //  state.customers=action.payload;
    //  state.addCustomer(state,action);
});

    }

})


export const{addCustomer}=customerSlice.actions;








