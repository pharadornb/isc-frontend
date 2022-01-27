import React, {useState} from 'react';
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import Loader from "../component/configComponent/Loader";
// import SidebarChild from "../component/configComponent/SidebarChild";

export default function Login() {

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [systems, setSystems] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        const params = JSON.stringify({
            user_email,
            user_password
        });

        axios.post('auth/login', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token)
                Swal.fire(
                    'เข้าสู่ระบบสำเร็จ',
                    'ยินดีต้อนรับสู่บริการสะสมคลังทักษะIT',
                    'success'
                ).then(function () {
                    window.location = '/dashboard'
                });
            }
            if (res.status === 404) {
                Swal.fire(
                    'เข้าสู่ระบบไม่สำเร็จ',
                    'อีเมล์ผู้ใช้นี้ยังไม่ได้ทำการยืนยันตัวตน',
                    'error'
                ).then(function () {
                    window.location = '/'
                });
            }
        }).catch(err =>
            console.log(err)
        )
    }

    const handleSubmit2 = async () => {
        setShowLoading(true)
        axios.get('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                setSystems(res.data)
                setShowLoading(false)
            }
        }).catch(err =>
            console.log(err)
        )
    }

    const handleClick = (a) => {
        alert(a)
    }

    const [showLoading, setShowLoading] = useState(false)

    return (
        <Loader show={showLoading}>
            {/* <SidebarChild> */}
                <div className="col-lg-6 col-md-6 form-container">
                    <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                        <div className="mb-3">
                            <Link to="/">home</Link>
                            <p><b>admin role </b>username: a, password: a <br/>
                                <b>user role </b>username: u, password: u <br/>
                                <b>company role </b>username: c, password: c</p>
                            <button onClick={() => handleSubmit2()}>55555555</button>
                        </div>
                        <div className="row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <form noValidate onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="email" className={'form-control'}
                                                   onChange={e => setEmail(e.target.value)} placeholder={'Username'}
                                            />
                                            <input type="password" className={'form-control mt-3'}
                                                   onChange={e => setPassword(e.target.value)}
                                                   placeholder={'Password'}
                                            />
                                        </div>
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <div className="text-left mb-3 mt-4">
                                                <Button type="submit" variant="contained">
                                                    Login
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-2"/>
                            {systems.map((sys) => (
                                <div className="mb-4 col-xl-4 col-md-6 col-12 text-center" key={sys.id}>
                                    {sys.id}
                                    <button key={sys.title}
                                            onClick={() => handleClick(sys.title)}>{sys.body}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            {/* </SidebarChild> */}
        </Loader>
    );
}

