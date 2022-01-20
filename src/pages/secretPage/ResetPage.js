// import React, {useState} from 'react'
import React from 'react'
// import {useParams} from 'react-router-dom'
import Button from "@mui/material/Button";
// import axios from "axios";
// import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function ResetPage() {

    // const {userEmail} = useParams()
    // const [user_password, setPassword] = useState('');
    // const [url_path] = useState(userEmail)
    //
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //
    //     const params = JSON.stringify({
    //         user_password,
    //         url_path
    //     });
    //
    //     axios.post('auth/reset', params, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(res => {
    //         if (res.status === 200) {
    //             Swal.fire(
    //                 'เปลี่ยนรหัสใหม่สำเร็จ',
    //                 'ยินดีต้อนรับสู่บริการสะสมคลังทักษะไอทีอีกครั้ง',
    //                 'success'
    //             ).then(function () {
    //                 window.location = '/'
    //             });
    //         }
    //     }).catch(err =>
    //         console.log(err)
    //     )
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        บริการสะสมคลังทักษะไอที
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        // <>
        //     <form noValidate onSubmit={handleSubmit}>
        //         <div className="col-md-12 mt-4">
        //             <input type="password" className={'form-control'} placeholder={'New password'}
        //                    onChange={e => setPassword(e.target.value)}
        //             />
        //             <input type="password" className={'form-control mt-4'} placeholder={'Renew password'}
        //             />
        //         </div>
        //         <div className="col-md-12 mt-4 d-grid gap-2">
        //             <Button className="btn btn-primary" type="submit" variant="contained">เปลี่ยนรหัสผ่าน</Button>
        //         </div>
        //     </form>
        // </>
    )
}