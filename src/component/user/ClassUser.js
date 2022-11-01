import React, { useEffect, useState } from 'react'
import './SideBarUser.scss'
import { FcPlus } from 'react-icons/fc'
import ModalCreateClass from './modal/ModalCreateClass';
import { toast } from 'react-toastify';
import { getListClass } from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListClass, setDataClass } from '../../redux/slice/classSlice';
import ModalJoinClass from './modal/ModalJoinClass';
import { useNavigate } from 'react-router-dom';
const ClassUser = () => {
    const [showClass, setShowClass] = useState(false);
    const [joinClass, setJoinClass] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listClass = useSelector(state => state.managerClass.listClass)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    console.log('user', user.role);
    useEffect(() => {
        dispatch(fetchListClass())

    }, [])
    const handleCreateClass = () => {
        setShowClass(true)
    }
    const handleJoinClass = () => {
        setJoinClass(true)
    }
    const handleCurrentClass = (dataClass) => {
        navigate('/user/currentClass/stream');
        dispatch(setDataClass(dataClass))
    }
    return (
        <>
            <div>
                <div className='d-flex justify-content-between '>
                    <h2 className='mx-4 title mt-3'> All classes</h2>
                    <div className=''>
                        {user.role === 'Student'
                            ?
                            <>
                                <button
                                    onClick={() => handleJoinClass()}
                                    className='btn px-3 py-2 mt-3 btn-primary d-flex gap-2 align-items-center'>
                                    <FcPlus className='fs-4' />
                                    <span className=' mb-1.5 button'>
                                        Join class
                                    </span>
                                </button></>
                            :
                            <>
                                <button
                                    onClick={() => handleCreateClass()}
                                    className='btn px-3 py-2 mt-3 btn-primary d-flex gap-2 align-items-center'>
                                    <FcPlus className='fs-4' />
                                    <span className=' mb-1.5 button'>
                                        Create class
                                    </span>
                                </button>
                            </>
                        }

                    </div>
                </div>
                <hr />
                <div className='class-all gap-4 my-5'>
                    {listClass && listClass.length > 0 ? listClass.map((item, index) => {
                        return (
                            <div className='class' key={`class-${index}`}
                                onClick={() => handleCurrentClass(item)} >
                                <h4>{item.className}</h4>
                                <hr />
                                <span>{item.teacherName}</span>
                            </div>
                        )
                    })


                        :
                        <>
                            <span>Thêm một lớp học để bắt đầu</span>
                        </>
                    }
                </div>
                <ModalCreateClass
                    showClass={showClass}
                    setShowClass={setShowClass}
                />
                <ModalJoinClass
                    joinClass={joinClass}
                    setJoinClass={setJoinClass}
                />

            </div>
        </>
    )
}

export default ClassUser