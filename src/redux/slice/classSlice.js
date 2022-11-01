import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../setup/axios"

export const fetchListClass = createAsyncThunk(
    'classSlice/fetchlist',
    async () => {
        const response = await axios.get(`/api/v1/listClass`)
        console.log(response.DT);
        return response.DT;
    }
)

const initialState = {
    dataClass: {},
    role: 'Student',
    listClass: {},
    isLoading: false,
    isError: false,
}
export const classSlice = createSlice({
    name: 'classSlide',
    initialState,
    reducers: {
        setDataClass: (state, action) => {
            state.dataClass = action.payload
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchListClass.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true;
                state.isError = false

            })
            .addCase(fetchListClass.fulfilled, (state, action) => {
                // Add user to the state array
                // state.role = action.payload.role;
                state.isLoading = false;
                state.isError = false
                state.listClass = action.payload
            })
            .addCase(fetchListClass.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false;
                state.isError = true
            })
    },
})
export const { setDataClass } = classSlice.actions
export default classSlice.reducer