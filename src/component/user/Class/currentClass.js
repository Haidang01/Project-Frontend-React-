import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import NavbarClass from './NavBarClass'

const CurrentClass = () => {
    return (
        <>
            <div>
                <NavbarClass />
            </div>
            <Container>
                <div className='mt-5'>
                    <Outlet />
                </div>
            </Container>
        </>
    )
}

export default CurrentClass