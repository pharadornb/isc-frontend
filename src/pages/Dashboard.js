import React, {useEffect, useState} from 'react'
import axios from "axios"
import Button from "@mui/material/Button"
import UserDashboard from "../../src/component/UserDashboard"
import AdminDashboard from "../../src/component/AdminDashboard"
import CompanyDashboard from "../../src/component/CompanyDashboard"

import AdminDashboardContent from "../../src/component/AdminDashboard/AdminDashboardContent"
import CompanyDashboardContent from "../component/CompanyDashboard/CompanyDashboardContent"
import UserDashboardContent from "../component/UserDashboard/UserDashboardContent"

import '../css/Dashboard.css';

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

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    return (
        <>
            {role === 'user' &&
                <>
                    <div>
                        <UserDashboard />
                        <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    </div>
                    <div>
                        <UserDashboardContent />
                    </div>
                </>
            }
            {role === 'company' &&
                <>
                    <div>
                        <CompanyDashboard />
                        <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    </div>
                    <div>
                        <CompanyDashboardContent/>
                    </div>

                </>
            }
            {role === 'admin' &&
                <>
                    <div class="box_Dashboard">
                        <div class="b_left">
                            <AdminDashboard />
                            <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                        </div>
                        <div class="b_right"> 
                            <AdminDashboardContent />
                        </div>
                    </div>
                </>
            }
        </>
    )
}