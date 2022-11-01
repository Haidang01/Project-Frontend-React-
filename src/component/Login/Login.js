import './Login.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginUser } from '../../service/apiService'
import { useDispatch } from 'react-redux';
import { userExits, } from '../../redux/slice/loginRegisterSlice'
function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true
    }
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput);
    const isValidInput = () => {
        setObjCheckValid(defaultValidInput);
        if (!email) {
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false });
            toast.error('Email is required')
            return false;
        }
        if (!password) {

            setObjCheckValid({ ...defaultValidInput, isValidPassword: false });
            toast.error('Password is required')

            return false;
        }
        return true;
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleClickLogin();
        }
    }
    const handleClickLogin = async () => {
        let data = { email, password }
        let checkInput = isValidInput();
        if (checkInput === true) {
            let res = await LoginUser(data);

            console.log(res);
            let token = res.DT.access_token;
            localStorage.setItem('jwt', token)
            let user = res.DT.others;
            console.log(user);
            dispatch(userExits(user))
            localStorage.setItem('user', JSON.stringify(user))

            if (res && res.EC === 0) {
                if (res.DT.role === 'Student' || res.DT.role === "Teacher") {
                    toast.success(res.EM);
                    navigate('/user/allclass');
                }
                if (res.DT.role === 'Admin') {
                    toast.success(res.EM);
                    navigate('/admin/users');
                }
            } else {
                toast.error(res.EM);
            }
        }
    }
    return (
        <div className='login-container'>
            <div className='container mt-sm-5 my-auto px-3 px-sm-0 py-4 '>
                <div className='row '>
                    <div className='content-left  col-0 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            React JS
                        </div>
                        <div className='detail'>
                            React JS helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='content-right col-11 col-sm-5  d-flex flex-column gap-3 py-4 mx-sm-0 mx-3 '>
                        <div className='brand d-block d-sm-none'>
                            React JS
                        </div>
                        <input
                            type='text'
                            value={email}
                            placeholder='Email address or phone number'
                            className={objCheckValid.isValidEmail ? 'px-2 form-control' : 'px-2 form-control is-invalid'}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            className={objCheckValid.isValidPassword ? 'px-2 form-control' : 'px-2 form-control is-invalid'}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />

                        <button
                            className='btn btn-primary'
                            onClick={() => handleClickLogin()}
                        >Login
                        </button>
                        <a className='text-center forgot-password' onClick={() => { navigate('/') }}>Go to home page</a>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'
                                onClick={() => navigate('/register')}
                            >Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;