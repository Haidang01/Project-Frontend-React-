import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './SideBarUser.scss'
import { ImHome3 } from 'react-icons/im'
import { NavLink } from 'react-router-dom';
const SideBarUser = (props) => {
    const { show, setShow } = props

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='p-3 d-flex hover mx-4 justify-content-between gap-2'>
                        <ImHome3 className='fs-2 mt-1 '
                        />
                        <span className='mt-2 font-bold wet'>
                            Menu
                        </span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className=''>
                    <div>
                        <NavLink className='link' to='/user/allclass'>
                            <div className='p-4 classroom my-3'>
                                Class Room
                            </div>
                        </NavLink>
                        <NavLink to='/user/profile' className='link'>
                            <div className='p-4 classroom my-3'>
                                Profile
                            </div>
                        </NavLink>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default SideBarUser;