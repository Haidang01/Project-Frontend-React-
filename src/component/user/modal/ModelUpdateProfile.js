import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { UpdateUser } from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
const ModelEditProfile = (props) => {
    const { showEditUser, setShowEditUser, dataUser } = props;
    let user = JSON.parse(localStorage.getItem('user'));
    const handleClose = () => {
        setEmail(dataUser.email)
        setUsername(dataUser.username)
        setAddress(dataUser.address)
        setPhone(dataUser.phone)
        setRole(dataUser.role)
        setShowEditUser(false);
    }
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.manager.currentPage);
    const handleShow = () => setShowEditUser(true);
    const [email, setEmail] = useState(dataUser.email)
    const [username, setUsername] = useState(dataUser.username)
    const [sex, setSex] = useState(dataUser.sex ? dataUser.sex : 'Male');
    const [phone, setPhone] = useState(dataUser.phone ? dataUser.phone : '');
    const [address, setAddress] = useState(dataUser.address ? dataUser.address : '')
    const [role, setRole] = useState(dataUser.role)
    useEffect(() => {
        setEmail(dataUser.email)
        setUsername(dataUser.username)
        setAddress(dataUser.address)
        setPhone(dataUser.phone)
        setRole(dataUser.role)
    }, [dataUser])
    const handleSubmitEditUser = async () => {
        let token = localStorage.getItem('jwt');
        let data = { email, username, phone, address, role, sex, token };
        console.log(data);
        let dataFetchList = { role, currentPage, }
        let res = await UpdateUser(data);
        console.log(dataFetchList);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            localStorage.setItem('user', JSON.stringify(data));
            window.location.reload()
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
export default ModelEditProfile;