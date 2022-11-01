import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../../service/apiService';
import './Register.scss'

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('Student')
    const defaultValidInput = {
        isValidEmail: true,
        isValidUserName: true,
        isValidPassword: true,
    }
    const [objCheckValid, setObjCheckValid] = useState(defaultValidInput)

    const isValidInput = () => {
        setObjCheckValid(defaultValidInput)
        if (!email) {
            toast.error('Email is required');
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        var regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            setObjCheckValid({ ...defaultValidInput, isValidEmail: false })
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!username) {
            toast.error('Username is required');
            setObjCheckValid({ ...defaultValidInput, isValidUserName: false })
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false })
            return false;
        }
        return true
    }

    const handleRegister = async () => {
        let data = { email, username, password, role }
        let checkInput = isValidInput();
        if (checkInput === true) {
            let res = await createUser(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                navigate('/login');
            } else {
                toast.error(res.EM);
            }
        }
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleRegister();
        }
    }
    return (
        <div className='Register-container'>
            <div className='container mt-sm-5 my-auto px-3 px-sm-0 "'>
                <div className='row '>
                    <div className='content-left  col-0 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            React JS
                        </div>
                        <div className='detail'>
                            React JS helps you connect and share with the people in your life.
                        </div>
                    </div>
                    <div className='content-right col-11 col-sm-5  d-flex flex-column gap-3 py-3 mx-sm-0 mx-3 '>
                        <div className='brand d-block d-sm-none'>
                            React JS
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='text'
                                placeholder='Email address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className={objCheckValid.isValidEmail ? 'px-2 form-control' : 'px-2 form-control is-invalid'}
                            />
                        </div>
                        <div className='form-group row '>
                            <div className='col-8'>
                                <label>Username</label>
                                <input type='text'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className={objCheckValid.isValidUserName ? 'px-2 form-control' : 'px-2 form-control is-invalid'}
                                />
                            </div>
                            <div className='col-4'>
                                <label>Role</label>
                                <select className="form-select"
                                    aria-label=".form-select-lg example"
                                    onChange={(event) => setRole(event.target.value)}
                                    value={role}
                                >
                                    <option value='Student'>Student</option>
                                    <option value="Teacher">Teacher</option>
                                </select>
                            </div>
                        </div>


                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className={objCheckValid.isValidPassword ? 'px-2 form-control' : 'px-2 form-control is-invalid'}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                        </div>

                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >
                            Register
                        </button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success mb-2'
                                onClick={() => navigate('/login')}
                            >Already've an account . Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Register