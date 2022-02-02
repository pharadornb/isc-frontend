import React from 'react';
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Sidebar from "../../component/configComponent/SidebarChild";

export default function CompanyResume() {
    const {userEmail} = useParams()

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    return (
        <Sidebar mark={'company_resume'}>
            {!userEmail &&
                <>
                    <p>555</p>
                    {/*<UserDashboard/>*/}
                    {/*<Button variant="contained" onClick={() => handleClick()}>Logout</Button>*/}
                    {/*<p>CompanyResume : {userEmail}</p>*/}
                </>
            }
            {userEmail &&
                <>
                    {/*<UserDashboard/>*/}
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>CompanyResume : {userEmail}</p>
                </>
            }
        </Sidebar>
    )
}