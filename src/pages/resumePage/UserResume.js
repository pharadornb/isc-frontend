import React from 'react';
import {useParams} from "react-router-dom";
import UserDashboard from "../../component/UserDashboard";
import Button from "@mui/material/Button";
import Sidebar from '../../component/configComponent/SidebarChild'

export default function UserResume() {
    const {userEmail} = useParams()

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    return(
        <Sidebar>
            {!userEmail &&
                <>
                    <p>UserResume</p>
                </>
            }
            {userEmail &&
                <>
                    <UserDashboard/>
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>UserResume : {userEmail}</p>
                </>
            }
        </Sidebar>
    )
}