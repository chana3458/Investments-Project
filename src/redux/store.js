import {  combineSlices, configureStore } from "@reduxjs/toolkit"

import { InvestmentProviderSlice } from "./Slices/investee/investmentProviderSlice";
import { customerSlice } from "./Slices/Customer/customersSlice";

  import {requestSlice}from"./Slices/Request/requestSlice";
import { investmentSlice } from "./Slices/Investments/investmentSlice";
 
const reducer=combineSlices(requestSlice,customerSlice,InvestmentProviderSlice,investmentSlice);
 export const STORE=configureStore({
     reducer:reducer,
  
 }
);