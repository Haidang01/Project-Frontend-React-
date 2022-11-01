import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchListClass } from '../../../redux/slice/classSlice';
import { createClass } from '../../../service/apiService';

const ModalCreateClass = (props) => {
    const { showClass, setShowClass } = props;
    const [className, setShowClassName] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () => {
        setPassword('')
        setShowClassName('')
        setShowClass(false);
    }
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const handleCreateClass = async () => {
        let data = { className, password, user }
        let res = await createClass(data);
        if (res && res.EC === 0) {
            dispatch(fetchListClass())
            toast.success(res.EM);
            handleClose()
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <Modal backdrop="static" show={showClass} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Class name</Form.Label>
                            <Form.Control
                                value={className}
                                type="text"
                                placeholder="Classname"
                                autoFocus
                                onChange={(event) => setShowClassName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pasword</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Pasword"
                                autoFocus
                                onChange={(event) => setPassword(event.target.value)}

                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateClass()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateClass;