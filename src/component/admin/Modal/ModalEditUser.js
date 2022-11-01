import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { createUser, UpdateUser } from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUser } from '../../../redux/slice/managerSlice';
import { updateRole } from '../../../redux/slice/managerSlice';
const ModelEditUser = (props) => {
    const { showEditUser, setShowEditUser, currentLimit } = props;
    const handleClose = () => {
        setEmail(User.email)
        setUsername(User.username)
        setImage(User.image)
        setAddress(User.address)
        setPhone(User.phone)
        setRole(User.role)
        setPreviewImage(User.previewImage)
        setShowEditUser(false);
    }
    const dispatch = useDispatch();
    const User = useSelector(state => state.manager.user);
    const currentPage = useSelector(state => state.manager.currentPage);
    const handleShow = () => setShowEditUser(true);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [sex, setSex] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('')
    const [role, setRole] = useState(User.role)
    const [previewImage, setPreviewImage] = useState('')
    useEffect(() => {
        setEmail(User.email);
        setUsername(User.username);
        setImage(User.img ? User.img : '');
        setRole(User.role);
        setAddress(User.address ? User.address : '')
        setPhone(User.phone ? User.phone : '')
        setSex(User.sex ? User.sex : 'Male')
        setPreviewImage(User.previewImage)
    }, [User])
    const handleUpLoadImage = (event) => {
        setImage((event.target.files[0]));
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
    const handleSubmitEditUser = async () => {
        let token = localStorage.getItem('jwt');
        let data = { email, username, phone, address, role, sex, image, token };
        console.log(data);
        let dataFetchList = { role, currentPage, currentLimit }
        let res = await UpdateUser(data);
        console.log(dataFetchList);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            dispatch(fetchListUser(dataFetchList))
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    return (
        <>
            <Modal className="model-add-user" backdrop="static" show={showEditUser} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" disabled className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone number</label>
                            <input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Sex</label>
                            <select className="form-select"
                                value={sex}
                                onChange={(event) => {
                                    setSex(event.target.value)
                                }
                                }
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                disabled
                                value={role}
                                onChange={(event) => {
                                    setRole(event.target.value)
                                }
                                }
                            >
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload' >
                                <FcPlus />
                                Uploand File Image
                                <input type="file" hidden id='labelUpload' onChange={(event) => handleUpLoadImage(event)} />
                            </label>
                        </div>

                        <div className="col-md-12 img-preview d-flex justify-content-center border border-3 py-2" >
                            {previewImage ?
                                <img src={previewImage} width="150" height="150" />
                                :
                                <span>preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelEditUser;