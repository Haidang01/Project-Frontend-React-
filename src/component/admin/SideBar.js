import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from "react-router-dom";
import { VscAccount } from 'react-icons/vsc'
import { ImHome } from 'react-icons/im'
import { MdSettings } from 'react-icons/md'
import { SiFandango } from 'react-icons/si'
import { IoIosLogOut } from 'react-icons/io'
import { MdOutlineSettingsSuggest } from 'react-icons/md'

import './SideBar.scss'
import { logoutUser } from '../../service/apiService';
import { toast } from 'react-toastify';
function SideBar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        let res = await logoutUser();
        if (res && res.EC === 0) {
            window.localStorage.clear();
            toast.success(res.EM);
            navigate('/');
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3 p-3 fs-4 fw-bolder">
                    <Container >
                        <Navbar.Brand className='cursor' to={'/admin'} >React-Bootstrap</Navbar.Brand>
                        <div className='d-flex gap-4'>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <NavDropdown
                                title={<MdSettings className='fs-3 mb-2' />}
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                                className='mt-2 fs-5'
                            >
                                <NavDropdown.Item >
                                    <span ><VscAccount className='fs-5' /></span>
                                    <span className='mx-2'>Profile</span>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <span><MdOutlineSettingsSuggest className='fs-4' /></span>
                                    <span className='mx-1'>Setting</span>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogout()} >
                                    <span><IoIosLogOut className='fs-4' /></span>
                                    <span> Log out</span>
                                </NavDropdown.Item>

                            </NavDropdown>
                        </div>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className='fw-normal fs-5'
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='fs-3 mt-4 fw-bold mx-4'>
                                    Management
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 gap-4  ">
                                    <NavLink className='nav-link d-flex gap-3 hover px-5' to={'/admin/users'}>
                                        <span><VscAccount /></span>
                                        <span>Users</span>
                                    </NavLink>
                                    <NavLink className='nav-link d-flex gap-3 hover px-5' to={'/admin/classroom'}>

                                        <span><ImHome /></span>
                                        <span>ClassRoom</span>
                                    </NavLink>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default SideBar;