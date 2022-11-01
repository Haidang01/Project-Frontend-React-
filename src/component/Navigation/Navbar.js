import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.scss'
import { VscListFlat } from 'react-icons/vsc'
import SideBarUser from "../user/SideBarUser";
import { useState } from "react";
import { logoutUser } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userExits } from "../../redux/slice/loginRegisterSlice";
import logo from '../../assets/logo.svg'
const Navbars = (props) => {
    const [show, setShow] = useState(false);
    const [showChange, setShowChange] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const dataClass = useSelector(state => state.managerClass.dataClass);
    const user = JSON.parse(localStorage.getItem('user'));
    let auth = localStorage.getItem('jwt')
    const handleLogout = async () => {
        let res = await logoutUser();
        if (res && res.EC === 0) {
            toast.success(res.EM);
            window.localStorage.clear();
            navigate('/')
        } else {
            toast.success(res.EM);
        }

    }
    return (
        < div className='nav-header' >
            <Navbar bg="header" expand="lg">
                <Container>
                    {auth &&
                        <Navbar.Brand href="#home">
                            <button className="btn btn-outline-light"
                                onClick={() => setShow(true)}
                            >
                                <span><VscListFlat className="fs-4" color='white' /></span>
                            </button>
                        </Navbar.Brand>
                    }
                    <Navbar.Brand className='d-flex navbar-brand text-white  align-items-center'>
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />
                        <span className='brand-name'>React</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to={'/home'} className='nav-link' exact>Home</NavLink>
                            <NavLink to={'/user/doc'} className='nav-link' >Document</NavLink>
                            <NavLink to={'/user/about'} className='nav-link' >About</NavLink>
                        </Nav>
                        <Nav>
                            <Navbar.Brand className="text-white fs-5" >
                                {user ? ` Welcome ${user.username} !` : <></>}
                            </Navbar.Brand>

                            {auth === null ? <>
                                <NavLink className='nav-link boder ' to={'/login'}>Login</NavLink>
                                <NavLink className='nav-link  boder' to={'/register'}>
                                    Register
                                </NavLink>
                            </>
                                :
                                <>

                                    <NavDropdown className="boder" title="Setting" id="collasible-nav-dropdown">
                                        <NavDropdown.Item><NavLink to='/user/profile'> Profile</NavLink></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => handleLogout()} >
                                            <span >
                                                Log out
                                            </span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SideBarUser show={show} setShow={setShow} />
        </div>
    );
}

export default Navbars;