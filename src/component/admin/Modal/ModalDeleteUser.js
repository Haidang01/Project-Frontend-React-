import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteUser } from '../../../service/apiService';
import { fetchListUser } from '../../../redux/slice/managerSlice';
const ModalDeleteUser = (props) => {
    const { showDeleteUser, setShowDeleteUser, currentLimit } = props;
    const role = useSelector(state => state.manager.role)
    const handleClose = () => setShowDeleteUser(false);
    const dataTable = useSelector(state => state.manager.user)
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.manager.currentPage);
    const handleClickDelete = async () => {
        let dataFetchList = { role, currentPage, currentLimit }
        let email = dataTable.email;
        let data = { role, email }
        let res = await DeleteUser(data);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setShowDeleteUser(false);
            dispatch(fetchListUser(dataFetchList))

        }
    }
    return (
        <>
            <Modal
                show={showDeleteUser}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, Are you sure to delete this user?<br />
                    <b className='mx-1 mt-4'>{dataTable.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleClickDelete()}
                    >Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;