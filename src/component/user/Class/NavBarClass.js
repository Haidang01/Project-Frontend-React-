import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutUser } from '../../../service/apiService';
import SideBarUser from '../SideBarUser';
import { VscListFlat } from 'react-icons/vsc'
import { useState } from 'react';
import { useSelector } from 'react-redux';

function NavbarClass() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    let auth = localStorage.getItem('jwt')
    const dataClass = useSelector(state => state.managerClass.dataClass);
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
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <Navbar.Brand className="mx-3 font-bold" > <h2>

                        {dataClass.className}
                    </h2>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto mx-3">
                            <NavLink className='nav-link boder' to={'/user/currentClass/stream'} >Stream</NavLink>
                            <NavLink className='nav-link boder mx-3' to={'/user/currentClass/classword'} >Classword</NavLink>
                            <NavLink className='nav-link boder' to={'/user/currentClass/people'} >People</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown className="boder" title="Setting" id="collasible-nav-dropdown">
                                <NavDropdown.Item >Change password</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => handleLogout()} >
                                    <span >
                                        Log out
                                    </span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SideBarUser show={show} setShow={setShow} />
        </>

    );
}

export default NavbarClass;