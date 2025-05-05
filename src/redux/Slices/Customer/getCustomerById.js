
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getCustomerByIdThunk=createAsyncThunk(

    'getCustomerByIdThunk',
    async(id , { rejectWithValue })=>{
         try{
const response=await fetch(`http://localhost:5213/api/Customer/GetCustomerById/${id}`);
if(response.ok){
    const  data=await response.json();
    return data;
  }else{
    const errorData = await response.json()
     return rejectWithValue(errorData || { message: `שגיאת שרת: ${response.status} ${response.statusText}` });
  }




} catch (error) {
  return rejectWithValue({ message: error.message || 'אירעה שגיאה בעת התקשורת עם השרת' });
}
  
  }
)