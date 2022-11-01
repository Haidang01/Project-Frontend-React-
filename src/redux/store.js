import { configureStore } from '@reduxjs/toolkit'
import loginRegisterReducer from './slice/loginRegisterSlice'
import managerReducer from './slice/managerSlice';
import fetchListClass from './slice/classSlice'
import managerClassSlice from './slice/managerClass';
export const store = configureStore({
    reducer: {
        loginRegister: loginRegisterReducer,
        manager: managerReducer,
        managerClass: fetchListClass,
        classAdmin: managerClassSlice
    },
})
