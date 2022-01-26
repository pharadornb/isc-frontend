import React, {useCallback} from "react";
import SideNav, {NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import Avatar from '@mui/material/Avatar';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import imgProfile from "../../img/isc-logo.png";
import imgProfileShort from "../../img/isc-logo-2.png";
import './SidebarStyle.css'
import {useNavigate} from 'react-router-dom';

export default function Sidebar({sideNavExpanded, setSideNavExpanded, role, name, profile}) {

    const logout = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/resume_user', {replace: true}), [navigate]);
    const dashboardOnClick = useCallback(() => navigate('/dashboard', {replace: true}), [navigate]);

    return (
        <>
            <SideNav onToggle={() => {
                setSideNavExpanded(!sideNavExpanded);
            }} expanded={sideNavExpanded} style={{backgroundColor: '#2E2E48', color: '#FFFFF'}}>
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="logo" className={'mb-3'} style={{pointerEvents: 'none', textAlign: 'center'}}>
                        {sideNavExpanded &&
                            <img src={imgProfile} alt="" style={{width: '120px'}}/>
                        }
                        {!sideNavExpanded &&
                            <NavIcon>
                                <img src={imgProfileShort} alt="" style={{width: '30px'}}/>
                            </NavIcon>
                        }
                    </NavItem>
                    <NavItem eventKey="profile"
                             style={{pointerEvents: 'none', justifyContent: "center", display: "flex"}}>
                        {sideNavExpanded &&
                            <>
                                <Avatar alt="iT" src={`data:image/jpeg;base64,${profile}`}
                                        sx={{width: 90, height: 90}}/>
                            </>
                        }
                        {!sideNavExpanded &&
                            <NavIcon style={{pointerEvents: 'none', justifyContent: "center", display: "flex"}}>
                                <Avatar alt="iT" src={`data:image/jpeg;base64,${profile}`}
                                        sx={{width: 50, height: 50}}/>
                            </NavIcon>
                        }
                    </NavItem>
                    {sideNavExpanded &&
                        <NavItem eventKey="profile"
                                 style={{pointerEvents: 'none', textAlign: 'center'}} className={'mt-5'}>
                            <h6 style={{fontSize: '18px'}}><b>{name}</b></h6>
                            {role === 'admin' &&
                                <h6 style={{fontSize: '14px'}}>ผู้ดูแลระบบ</h6>
                            }
                            {role === 'user' &&
                                <h6 style={{fontSize: '14px'}}>ผู้รับบริการ</h6>
                            }
                            {role === 'company' &&
                                <h6 style={{fontSize: '14px'}}>บริษัท</h6>
                            }

                        </NavItem>
                    }
                    {sideNavExpanded &&
                        <NavItem eventKey="dashboard" className={'mt-3'} onClick={dashboardOnClick}>
                            <NavIcon>
                                <i className="fas fa-th-large" style={{fontSize: "1.75em"}}/>
                            </NavIcon>
                            <NavText>หน้าหลัก</NavText>
                        </NavItem>
                    }
                    {!sideNavExpanded &&
                        <NavItem eventKey="dashboard" className={'mt-3'} onClick={dashboardOnClick}>
                            <NavIcon>
                                <i className="fas fa-th-large" style={{fontSize: "1.75em"}}/>
                            </NavIcon>
                            <NavText>หน้าหลัก</NavText>
                        </NavItem>
                    }
                    {role === 'user' &&
                        <NavItem eventKey="resume" onClick={handleOnClick}>
                            <NavIcon>
                                <i className="fas fa-file-alt" style={{fontSize: "1.75em"}}/>
                            </NavIcon>
                            <NavText>Resume</NavText>
                        </NavItem>
                    }
                    <NavItem eventKey="logout" onClick={() => logout()}>
                        <NavIcon>
                            <i className="fas fa-sign-out-alt" style={{fontSize: "1.75em"}}/>
                        </NavIcon>
                        <NavText>ออกจากระบบ</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    );
};