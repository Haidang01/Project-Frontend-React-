import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchListClass } from '../../../redux/slice/classSlice';
import { UserJoinClass } from '../../../service/apiService';

const ModalJoinClass = (props) => {
    const { joinClass, setJoinClass } = props;
    const [className, setShowClassName] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () => {
        setPassword('')
        setShowClassName('')
        setJoinClass(false);
    }
    // const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const handleJoinClass = async () => {
        let data = { className, password }
        let res = await UserJoinClass(data);
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
            <Modal backdrop="static" show={joinClass} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join class</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleJoinClass()}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalJoinClass;