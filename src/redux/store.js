import {  combineSlices, configureStore } from "@reduxjs/toolkit"

import { InvestmentProviderSlice } from "./Slices/investee/investmentProviderSlice";
import { customerSlice } from "./Slices/Customer/customersSlice";

 
const reducer=combineSlices(customerSlice,InvestmentProviderSlice);
 export const STORE=configureStore({
     reducer:reducer,
  
 }
);