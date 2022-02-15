import Sidebar from "../../component/configComponent/SidebarChild";
import React, {useState} from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import iscLogo from "../../img/isc-logo-black.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2"

export default function ResetPassword() {

    const [user_password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = JSON.stringify({
            user_password
        });

        axios.post('account/resetPassword', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'เปลี่ยนรหัสใหม่สำเร็จ',
                    'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
                    'success'
                ).then(function () {
                    sessionStorage.clear();
                    window.location = '/'
                });
            }
        }).catch(err =>
            console.log(err)
        )
    }

    return (
        <Sidebar mark={'setting'}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <img src={iscLogo} alt="isc-logo" width={'30%'} sx={{m: 1}}/>
                    <Typography component="h1" variant="h5" sx={{mt: 3}}>
                        <b>บริการสะสมคลังทักษะไอที</b>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 3}}>
                        <TextField margin="normal" required fullWidth id="new_password" label="กรอกรหัสผ่านใหม่" type="password"
                                   autoComplete="email" onChange={e => setPassword(e.target.value)}/>
                        <TextField margin="normal" required fullWidth name="re_password" label="กรอกรหัสผ่านใหม่อีกครั้ง" type="password"
                                   id="password" autoComplete="current-password"/>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>เปลี่ยนรหัสผ่าน</Button>
                    </Box>
                </Box>
            </Container>
        </Sidebar>
  );
}