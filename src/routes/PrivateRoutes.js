import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { userExits } from '../redux/slice/loginRegisterSlice'


const PrivateRoutes = (props) => {
    const userLogin = useSelector(state => state.loginRegister.userLogin)
    const dispatch = useDispatch()
    let jwt = localStorage.getItem('jwt');
    return (
        jwt ? <Outlet /> : <Navigate to={'/login'} />
    )
}

export default PrivateRoutes