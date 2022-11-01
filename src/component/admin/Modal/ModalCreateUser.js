import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { createUser } from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUser } from '../../../redux/slice/managerSlice';
import { updateRole } from '../../../redux/slice/managerSlice';
const ModelCreateUser = (props) => {
    const { showCreateUser, setShowCreateUser, currentLimit } = props;
    const handleClose = () => {
        setEmail("")
        setPassword("")
        setUsername("")
        setImage("")
        setRole("Student")
        setPreviewImage("")
        setShowCreateUser(false);
    }
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.manager.currentPage);
    const handleShow = () => setShowCreateUser(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("Student")
    const [previewImage, setPreviewImage] = useState("")
    const handleUpLoadImage = (event) => {
        setImage((event.target.files[0]));
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
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
        if (!password) {
            toast.error('Password is required');
            setObjCheckValid({ ...defaultValidInput, isValidPassword: false })
            return false;
        }
        if (!username) {
            toast.error('Username is required');
            setObjCheckValid({ ...defaultValidInput, isValidUserName: false })
            return false;
        }

        return true
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        // validate
        let checkInput = isValidInput();
        if (checkInput == true) {
            let data = { email, password, username, role };
            let dataFetchList = { role, currentPage, currentLimit }
            let res = await createUser(data);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                handleClose();
                dispatch(updateRole(role))
                dispatch(fetchListUser(dataFetchList))
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        }

    }
    return (
        <>
            <Modal className="model-add-user" backdrop="static" show={showCreateUser} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email"
                                className={objCheckValid.isValidEmail ? ' form-control' : 'form-control is-invalid'}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className={objCheckValid.isValidPassword ? ' form-control' : 'form-control is-invalid'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text"
                                className={objCheckValid.isValidUserName ? ' form-control' : 'form-control is-invalid'}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select"
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelCreateUser;