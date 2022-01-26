import React, {useEffect, useState} from 'react'
import axios from "axios"
import UserDashboard from "../../src/component/UserDashboard"
import AdminDashboardContent from "../../src/component/AdminDashboard/AdminDashboardContent"
import CompanyDashboardContent from "../component/CompanyDashboard/CompanyDashboardContent"
import UserDashboardContent from "../component/UserDashboard/UserDashboardContent"
import '../css/Dashboard.css';
import Sidebar from '../component/configComponent/SidebarChild'

export default function Dashboard() {

    const [role, setRole] = useState('');

    useEffect(() => {
        axios.post('auth/check', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setRole(res.data.decoded.user_role)
        }).catch(() => {
            window.location = '/'
        })
    }, []);

    return (
        <Sidebar>
            {role === 'user' &&
                <>
                    <div>
                        <UserDashboard/>
                    </div>
                    <div>
                        <UserDashboardContent/>
                    </div>
                </>
            }
            {role === 'company' &&
                <>
                    <CompanyDashboardContent/>
                </>
            }
            {role === 'admin' &&
                <div className="box_Dashboard">
                    <div className="b_right">
                        <AdminDashboardContent/>
                    </div>
                </div>
            }
        </Sidebar>
    )
}