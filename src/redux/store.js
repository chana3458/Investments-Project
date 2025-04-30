import {  combineSlices, configureStore } from "@reduxjs/toolkit"

import { InvestmentProviderSlice } from "./Slices/investee/investmentProviderSlice";
import { customerSlice } from "./Slices/Customer/customersSlice";

  import {requestSlice}from"./Slices/Request/requestSlice";
 
const reducer=combineSlices(requestSlice,customerSlice,InvestmentProviderSlice);
 export const STORE=configureStore({
     reducer:reducer,
  
 }
);