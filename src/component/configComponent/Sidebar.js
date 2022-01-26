import React from "react";
import SideNav, {NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import Avatar from '@mui/material/Avatar';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import imgProfile from "../../img/isc-logo.png";
import imgProfileShort from "../../img/isc-logo-2.png";
import './SidebarStyle.css'

export default function Sidebar({sideNavExpanded, setSideNavExpanded, role, name, profile}) {

    const logout = () => {
        sessionStorage.clear()
        window.location = '/'
    }

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
                            <Avatar alt="iT" src={`data:image/jpeg;base64,${profile}`} sx={{width: 90, height: 90}}/>
                        }
                        {!sideNavExpanded &&
                            <NavIcon>
                                <img src={imgProfileShort} alt="" style={{width: '30px'}}/>
                            </NavIcon>
                        }
                    </NavItem>
                    {sideNavExpanded &&
                        <NavItem eventKey="dashboard" className={'mt-5'}>
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{fontSize: "1.75em"}}/>
                            </NavIcon>
                            <NavText>Home</NavText>
                        </NavItem>
                    }
                    {!sideNavExpanded &&
                        <NavItem eventKey="dashboard" className={'mt-2'}>
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{fontSize: "1.75em"}}/>
                            </NavIcon>
                            <NavText>Home</NavText>
                        </NavItem>
                    }
                    <NavItem eventKey="logout" onClick={() => logout()}>
                        <NavIcon>
                            <i className="fas fa-sign-out-alt" style={{fontSize: "1.75em"}}/>
                        </NavIcon>
                        <NavText>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </>
    );
};