
import './AdminPage.scss';
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import SideBar from './SideBar';
import AdminHome from './AdminHome';

const AdminPage = (props) => {

    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="admin-container" >
            <SideBar />
            <Outlet />
        </div>
    )
}
export default AdminPage;