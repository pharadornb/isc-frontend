import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import iscLogo from "../../img/isc-logo-black.png";

export default function ResetPage() {

    const {userEmail} = useParams()
    const [user_password, setPassword] = useState('');
    const [url_path] = useState(userEmail)

    const handleSubmit = async e => {
        e.preventDefault();

        const params = JSON.stringify({
            user_password,
            url_path
        });

        axios.post('auth/reset', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'เปลี่ยนรหัสใหม่สำเร็จ',
                    'ยินดีต้อนรับสู่บริการสะสมคลังทักษะไอทีอีกครั้ง',
                    'success'
                ).then(function () {
                    window.location = '/'
                });
            }
        }).catch(err =>
            console.log(err)
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <img src={iscLogo} alt="isc-logo" width={'30%'} sx={{m: 1}}/>
                <Typography component="h1" variant="h5" sx={{mt: 3}}>
                    <b>บริการสะสมคลังทักษะไอที</b>
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 3}}>
                    <TextField margin="normal" required fullWidth id="email" label="กรอกรหัสผ่านใหม่" name="email"
                               autoComplete="email" autoFocus onChange={e => setPassword(e.target.value)}/>
                    <TextField margin="normal" required fullWidth name="password" label="กรอกรหัสผ่านใหม่อีกครั้ง" type="password"
                               id="password" autoComplete="current-password"/>
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>เปลี่ยนรหัสผ่าน</Button>
                </Box>
            </Box>
        </Container>
    )
}