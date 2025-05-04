import { createSlice } from "@reduxjs/toolkit";
import { getAllCustomersThunk } from "./getAllCustomersThunk";
import { delCustomerThunk } from "./deleteCustomerThunk";
import { getCustomerByIdThunk } from "./getCustomerById";
import { addCustomersThunk } from "./addCustomerThunk";


const INITIAL_STATE_CUSTOMER={
  error:"",
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
address:"",
requests:[]
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
builder.addCase(getCustomerByIdThunk.rejected,(state,action)=>{

   console.log("slice");
    state.isCustomer=false;
});

builder.addCase(delCustomerThunk.fulfilled,(state,action)=>{

    //  state.customers=action.payload;
    //  state.addCustomer(state,action);
});
builder.addCase(addCustomersThunk.rejected,(state,action)=>{
debugger
alert("failed to add customer");
alert(action.payload.message); 

});

    }

})


export const{addCustomer}=customerSlice.actions;








