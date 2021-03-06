import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
// import Wallet from "../../img/Wallet.png";
import axios from "axios";
import Loader from "../../component/configComponent/Loader";

export default function SidebarChild(props) {

    const [sideNavExpanded, setSideNavExpanded] = useState(true)
    // const [wallet, setProfileWallet] = useState('')
    const [role, setProfileRole] = useState('')
    const [profile, setProfile] = useState('')
    const [name, setName] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    function handleResize() {
        if (window.innerWidth <= 375) {
            setSideNavExpanded(false);
        }
    }

    useEffect(() => {

        setShowLoading(true)

        axios.post('profile/information', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            // setProfileWallet(res.data[0].user_wallet)
            setProfileRole(res.data[0].user_role)
            setName(res.data[0].name)
        }).catch(() => {
            sessionStorage.clear()
            window.location = '/'
        })

        axios.post('profile', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setProfile(res.data[0].user_profile)
            setShowLoading(false)
        }).catch(() => {
            sessionStorage.clear()
            window.location = '/'
        })

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const contentStyle = {
        marginLeft: sideNavExpanded ? "250px" : "70px",
        transition: "margin 0.2s ease"
    };

    return (
            <Loader show={showLoading}>
                <Sidebar setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} role={role}
                         name={name} profile={profile} mark={props.mark}/>
                <div style={contentStyle}>
                    {/*{role !== 'admin' &&*/}
                        <div align={'right'} style={{marginRight: '10px', marginBottom: '5px', paddingTop: '20px'}}>
                            {/*<img src={Wallet} alt="wallet"/>*/}
                            {/*<label className="txt1-1"><h5><b>{wallet}</b>&nbsp;</h5></label>*/}
                            {/*<i className="fas fa-plus-circle" style={{fontSize: "1em"}}/>*/}
                        </div>
                    {/*}*/}
                    {props.children}
                </div>
            </Loader>
    );
};