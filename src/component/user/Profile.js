import React from 'react'
import { useState, useEffect } from 'react';
import './Profile.scss'
import ModelEditProfile from './modal/ModelUpdateProfile'
const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [showEditUser, setShowEditUser] = useState(false);
    const [dataUser, setDataUser] = useState(user)
    return (
        <div className='profile-container'>
            <h2 className='text-center title mt-2'>Profile</h2>
            <div className='mt-3 content mx-5 d-flex flex-column gap-3 text-center'>
                <p><span className='span'>User Name</span> :<span className='mx-3'>{dataUser.username}</span></p>
                <p><span className='span'>Sex</span> :<span className='mx-3'>{dataUser.sex ? user.sex : 'null'}</span> </p>
                <p><span className='span'>Email</span> : <span className='mx-3'>{dataUser.email}</span></p>
                <p><span className='span'>Address</span> :<span className='mx-3'>{user.address ? user.address : 'null'}</span></p>
                <p><span className='span'>Phone number</span> :<span className='mx-3'>{dataUser.phone ? dataUser.phone : 'null'}</span></p>
                <p><span className='span'>Role</span> :<span className='mx-3'>{dataUser.role}</span></p>
            </div>
            <div className='d-flex justify-content-center '>
                <button className='btn btn-primary'
                    onClick={() => setShowEditUser(true)}
                >Update profile</button>
            </div>
            <ModelEditProfile
                showEditUser={showEditUser}
                setShowEditUser={setShowEditUser}
                dataUser={dataUser}
            />
        </div>
    )
}

export default Profile