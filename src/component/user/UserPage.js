import React from 'react'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navbars from '../Navigation/Navbar';
import './UserPage.scss'
const UserPage = () => {
    return (
        <div className="app-container">
            <div className='app-header'>
                <Navbars />
            </div>
            <div className='app-content  '>
                <Container>
                    <Outlet />
                </Container>
            </div>

        </div>
    )
}

export default UserPage;