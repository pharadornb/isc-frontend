import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import iscLogo from "../../img/isc-logo-black.png";

export default function VerifyPage() {

    const {userEmail} = useParams()
    const [url_path] = useState(userEmail)
    const [verify] = useState('yes')

    const handleSubmit = async e => {
        e.preventDefault();

        const params = JSON.stringify({
            url_path,
            verify
        });

        axios.post('auth/verify', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'ยืนยันบัญชีสำเร็จ',
                    'ยินดีต้อนรับสู่บริการสะสมคลังทักษะไอที',
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
                    <h6><b>เกือบจะเสร็จแล้วผู้ใช้อีเมล์ : </b>{url_path}</h6>
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>ยืนยันบัญชี</Button>
                </Box>
            </Box>
        </Container>
    )
}