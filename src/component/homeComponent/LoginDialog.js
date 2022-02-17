import React, {useState} from "react"
import Button from "@mui/material/Button"
import axios from "axios"
import Swal from "sweetalert2"
import {Link} from "react-router-dom"
import Loader from '../configComponent/Loader'

export default function LoginDialog() {

    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [swap, setSwap] = useState('login');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmitSendEmail = async e => {
        e.preventDefault();

        setShowLoading(true)
        const params = JSON.stringify({
            service_id: 'service_ib76tes',
            template_id: 'template_zetwqgi',
            user_id: 'user_7FNeD7QT9PKSHkzE7SsF4',
            template_params: {
                to_name: user_email,
            }
        });

        axios.post('https://api.emailjs.com/api/v1.0/email/send', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'ดำเนินการสำเร็จ',
                    'โปรดตรวจสอบข้อมูลที่อีเมล์ของคุณ เพื่อทำการเปลี่ยนรหัสใหม่',
                    'success'
                ).then(function () {
                    setShowLoading(false)
                    window.location = '/'
                });
            }
        }).catch(err =>
            console.log(err)
        )
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setShowLoading(true)
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
                    'ยินดีต้อนรับสู่บริการสะสมคลังทักษะไอที',
                    'success'
                ).then(function () {
                    setShowLoading(false)
                    window.location = '/dashboard'
                });
            }
        }).catch(err => {
                if (err.response.status === 404) {
                    Swal.fire(
                        'เข้าสู่ระบบไม่สำเร็จ',
                        'โปรดยืนยันตัวตนที่อีเมล์ของคุณ',
                        'error'
                    ).then(function () {
                        setShowLoading(false)
                        window.location = '/'
                    });
                } else if (err.response.status === 401) {
                    Swal.fire(
                        'เข้าสู่ระบบไม่สำเร็จ',
                        'อีเมล์ผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                        'error'
                    ).then(function () {
                        setShowLoading(false)
                        window.location = '/'
                    });
                }
            }
        )
    }

    return (
        <>
            {swap === 'login' &&
                <Loader show={showLoading}>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className="col-md-12 mt-4">
                            <input type="email" className={'form-control'} placeholder={'Email'}
                                   onChange={e => setEmail(e.target.value)}/>
                            <input type="password" className={'form-control mt-4'} placeholder={'Password'}
                                   onChange={e => setPassword(e.target.value)}/>
                            <div className="mt-2" />
                        </div>
                        <div className="col-md-12 mt-4 d-grid gap-2">
                            <Button className="btn btn-primary" type="submit" variant="contained">เข้าสู่ระบบ</Button>
                        </div>
                    </form>
                    <div className="col-md-12 mt-3 d-flex justify-content-center">
                        <p style={{fontSize: '14px', cursor: 'pointer', color: '#3772FF'}}
                           onClick={() => setSwap('forgetPassword')}>ลืมรหัสผ่านใช่ไหม?</p>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <hr style={{width: '40%'}}/>
                        <p style={{fontSize: '12px'}}>หรือ</p>
                        <hr style={{width: '40%'}}/>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <p style={{fontSize: '14px'}}>ยังไม่มีบัญชีใช่ไหม? <Link style={{textDecoration: 'none'}}
                                                                                 to={'/register'}>ลงทะเบียน</Link></p>
                    </div>
                </Loader>
            }
            {swap === 'forgetPassword' &&
                <>
                    <form noValidate onSubmit={handleSubmitSendEmail}>
                        <div className="col-md-12 mt-4">
                            <input type="email" className={'form-control'} placeholder={'Email'}
                                   onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="col-md-12 mt-4 d-grid gap-2">
                            <Button className="btn btn-primary" type="submit" variant="contained">ส่ง</Button>
                        </div>
                    </form>
                    <div className="col-md-12 mt-3 d-flex justify-content-center">
                        <p style={{fontSize: '14px', cursor: 'pointer', color: '#3772FF'}}
                           onClick={() => setSwap('login')}>กลับเข้าสู่ระบบ</p>
                    </div>
                </>
            }
        </>
    )
}