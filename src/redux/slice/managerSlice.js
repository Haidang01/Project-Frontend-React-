import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../setup/axios"

export const fetchListUser = createAsyncThunk(
    'managerSlice/fetchlist',
    async (data) => {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/read?role=${data.role}&page=${data.currentPage}&limit=${data.currentLimit}`)
        return response.DT;
    }
)

const initialState = {
    pageCount: 1,
    role: 'Student',
    listUser: {},
    isLoading: false,
    isError: false,
    currentPage: 1,
    user: {},
    EM: ''
}
export const managerSlice = createSlice({
    name: 'managerSlice',
    initialState,
    reducers: {
        updateRole: (state, action) => {
            state.role = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCurrentPage1: (state, action) => {
            state.currentPage = action.payload
        },
        hanldeDataTable: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchListUser.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true;
                state.isError = false

            })
            .addCase(fetchListUser.fulfilled, (state, action) => {
                // Add user to the state array
                // state.role = action.payload.role;
                state.isLoading = false;
                state.isError = false
                state.listUser = action.payload.users
                state.pageCount = action.payload.totalPage
            })
            .addCase(fetchListUser.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false;
                state.isError = true
            })
    },
})
export const { updateRole, setCurrentPage, hanldeDataTable, setCurrentPage1 } = managerSlice.actions
export default managerSlice.reducer