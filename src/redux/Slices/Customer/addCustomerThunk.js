
// import {createAsyncThunk} from "@reduxjs/toolkit";

// export const addCustomersThunk=createAsyncThunk(

//     'addCustomersThunk',
//     async(newCustomer)=>{
// const response=await fetch(`http://localhost:5213/api/Customer/AddCustomer`,
// {
// method:'POST',
// body:JSON.stringify(newCustomer),
// headers:{

// 'Content-Type':'application/json'
// }
// }
// );


// if(response.ok){
//   const  data=await response.json();
//   return data;
// }
// else{
//     throw new Error("failed to fetch");
// }
//     }
// )
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCustomersThunk = createAsyncThunk(
    'addCustomersThunk',
    async (newCustomer, { rejectWithValue }) => {
        debugger;
        try {
            const response = await fetch(`http://localhost:5213/api/Customer/AddCustomer`, {
                method: 'POST',
                body: JSON.stringify(newCustomer),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert("Customer added successfully!");  
                const data = await response.json();
                return data;
            } else {
                // נסה לקבל את הודעת השגיאה מהשרת
                const errorData = await response.json()
                return rejectWithValue(errorData || { message: `שגיאת שרת: ${response.status} ${response.statusText}` });
            }
        } catch (error) {
            alert(error.message+"ohohoh");
            return rejectWithValue({ message: error.message || 'אירעה שגיאה בעת התקשורת עם השרת' });
        }
    }
)