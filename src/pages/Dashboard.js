import React, {useEffect, useState} from 'react'
import axios from "axios"
import Button from "@mui/material/Button"
import UserDashboard from "../../src/component/UserDashboard"
import AdminDashboard from "../../src/component/AdminDashboard"
import CompanyDashboard from "../../src/component/CompanyDashboard"

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
            window.location = '/login'
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
                    <UserDashboard />
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                </>
            }
            {role === 'company' &&
                <>
                    <CompanyDashboard />
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                </>
            }
            {role === 'admin' &&
                <>
                    <AdminDashboard />
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                </>
            }
        </>
    )
}