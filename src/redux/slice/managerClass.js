import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../setup/axios"

export const fetchListClassAdmin = createAsyncThunk(
    'managerSlice/fetchlist',
    async (data) => {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/class?page=${data.currentPage}&limit=${data.currentLimit}`)
        return response.DT;
    }
)

const initialState = {
    pageCountClass: 1,
    listClass: {},
    currentPage: 1,
    students: {},
    dataStudent: {}
}
export const managerClassSlice = createSlice({
    name: 'managerClassSlice',
    initialState,
    reducers: {

        setCurrentPageClass: (state, action) => {
            state.currentPage = action.payload
        },
        setDataStudent: (state, action) => {
            state.dataStudent = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchListClassAdmin.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true;
                state.isError = false

            })
            .addCase(fetchListClassAdmin.fulfilled, (state, action) => {
                // Add user to the state array
                // state.role = action.payload.role;
                state.isLoading = false;
                state.isError = false
                state.listClass = action.payload.listClass
                state.pageCountClass = action.payload.totalPage
                state.students = action.payload.students


            })
            .addCase(fetchListClassAdmin.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false;
                state.isError = true
            })
    },
})
export const { setCurrentPageClass, setDataStudent } = managerClassSlice.actions
export default managerClassSlice.reducer