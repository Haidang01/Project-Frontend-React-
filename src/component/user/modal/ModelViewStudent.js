import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { UpdateUser } from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
const ModelViewStudent = (props) => {
    const { showViewUser, setShowViewUser } = props;
    const dataStudent = useSelector(state => state.classAdmin.dataStudent)
    console.log('sdsdsf', dataStudent);
    // const dataStudent = dataViewUser.student;
    const handleClose = () => setShowViewUser(false)
    return (
        <>
            <Modal className="model-add-user" backdrop="static" show={showViewUser} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" disabled className="form-control" value={dataStudent.email ? dataStudent.email : ''} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" disabled className="form-control" value={dataStudent.username} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input type="text" disabled className="form-control" value={dataStudent.address} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <input type="text" disabled className="form-control" value={dataStudent.phone} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Sex</label>
                            <input type="text" disabled className="form-control" value={dataStudent.phone} />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    )
}
export default ModelViewStudent;