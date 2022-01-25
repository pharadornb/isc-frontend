import React from 'react';
import {useParams} from "react-router-dom";
import UserDashboard from "../../component/UserDashboard";
import Button from "@mui/material/Button";

export default function CompanyResume() {
    const {userEmail} = useParams()

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    return (
        <>
            {!userEmail &&
                <>
                    <UserDashboard/>
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>CompanyResume</p>
                </>
            }
            {userEmail &&
                <>
                    <UserDashboard/>
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>CompanyResume : {userEmail}</p>
                </>
            }
        </>
    )
}