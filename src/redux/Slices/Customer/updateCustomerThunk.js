
//בס"ד
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateCustomerThunk = createAsyncThunk(
    'updateCustomerThunk',
    async (event) => {
        const response = await fetch('https://localhost:7110/api/Customer/UpdateCustomer',
            {
                method: 'PUT',
                body: JSON.stringify(event),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        const data = await response.json();
        return data;
    }
)