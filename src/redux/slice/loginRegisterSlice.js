import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const initialState = {
    user: `${JSON.parse(localStorage.getItem('user'))}`,
}


export const loginRegisterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        userExits: (state, action) => {
            state.user = action.payload;
        },


    },

})
export const { updateRole, userExits, } = loginRegisterSlice.actions
export default loginRegisterSlice.reducer