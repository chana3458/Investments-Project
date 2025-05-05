  //bsd"ד
  import { createAsyncThunk } from "@reduxjs/toolkit";

  export const updateCustomerThunk = createAsyncThunk(
      'updateCustomerThunk',
      async (event) => {
          
          const response = await fetch('http://localhost:5213/api/Customer/UpdateCustomer',
              {
                  method: 'PUT',
                  body: JSON.stringify(event),
                  headers: {
                      'Content-type': 'application/json'
                  }
              }
          );
          const data = await response.json();
          if (!data || data.error) {
              throw new Error(data?.error || 'Invalid response from server');
          }
          return data;
      }
  )