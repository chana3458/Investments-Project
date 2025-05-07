//בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateInvesteerThunk = createAsyncThunk(
  'updateInvestee', 
  async (event, thunkAPI) => {
    debugger
    try {
      console.log("Sending data to server:", event); // לוג הנתונים שנשלחים
      
      const response = await fetch('http://localhost:5213/api/InvestmentProvider/UpdateInvestmentProvider',
        {
          method: 'PUT',
          body: JSON.stringify(event),
          headers: {
            'Content-type': 'application/json'
          }
        }
      );
      
      // בדיקה אם התשובה תקינה
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // בדיקה אם יש תוכן בתשובה
      const text = await response.text();
      if (!text) {
        console.log("Empty response from server");
        return event; // החזר את הנתונים המקוריים במקרה של תשובה ריקה
      }
      
      // המרה ל-JSON רק אם יש תוכן
      const data = JSON.parse(text);
      
      console.log("Response from server:", data); // לוג התשובה מהשרת
      
      return data;
    } catch (error) {
      console.error("Error updating customer:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);