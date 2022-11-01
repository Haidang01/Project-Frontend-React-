import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteStudent, getListCurrentUser } from '../../../service/apiService';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AiOutlineEye } from 'react-icons/ai';
import ModelViewStudent from '../modal/ModelViewStudent';
import { setDataStudent } from '../../../redux/slice/managerClass';

const People = (props) => {
    const dataClass = useSelector(state => state.managerClass.dataClass);
    const [listStudent, setListStudent] = useState(dataClass.id)
    const [showViewUser, setShowViewUser] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    useEffect(() => {
        fetchListCurrentUser();
    }, [])
    const fetchListCurrentUser = async () => {
        let res = await getListCurrentUser(dataClass.id);
        let data = res.DT.map(item => {
            return {
                id: item.ClassRooms.id,
                className: item.ClassRooms.className,
                teacherName: item.ClassRooms.teacherName,
                student: {
                    id: item.id,
                    email: item.email,
                    username: item.username,
                    address: item.address,
                    sex: item.sex,
                    phone: item.phone,
                    role: item.role
                }
            }
        })
        setListStudent(data)
    }
    const handleDeleteUser = async (dataUser) => {
        let buildData = {
            studentId: dataUser.student.id,
            classId: dataUser.id
        }
        let res = await DeleteStudent(buildData);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchListCurrentUser()
        } else {
            toast.error(res.EM)
        }

    }
    const handleViewStudent = async (dataUser) => {
        setShowViewUser(true)
        dispatch(setDataStudent(dataUser.student))
    }
    return (
        <>
            <div className='my-5'>
                <h2 className='text-primary'>Teacher</h2>
                <hr />
                <p className='fs-4'>{dataClass.teacherName}</p>
            </div>
            <div className='my-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='text-primary'>Classmates</h2>
                    <p>{listStudent.length} students</p>
                </div>
                <hr />
            </div>
            {listStudent && listStudent.length > 0
                ?
                listStudent.map((item, index) => {
                    return (
                        <>
                            <div className='d-flex justify-content-between my-3 mx-5'>
                                <p className='fs-5 mx-5'>{item.student.email}</p>

                                {user.role === 'Teacher' &&
                                    <div>
                                        <span className='fs-5 cursor mx-5'
                                            style={{ color: 'dimgrey' }}
                                            onClick={() => handleViewStudent(item)}
                                        ><AiOutlineEye /></span>
                                        <span className='fs-5 cursor '
                                            style={{ color: 'dimgrey' }}
                                            onClick={() => handleDeleteUser(item)}
                                        ><FaTrash /></span>

                                    </div>

                                }
                            </div>
                            <hr />
                        </>

                    )
                })
                :
                <>No students</>
            }
            {user.role === 'Teacher' &&
                <ModelViewStudent
                    showViewUser={showViewUser}
                    setShowViewUser={setShowViewUser}
                />}
        </>
    )
}

export default People