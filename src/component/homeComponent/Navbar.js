import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import iscLogo from '../../assets/logo/isc-logo.png';
import './HomeComponentStyle.css'
import {Modal} from 'react-bootstrap';
import LoginDialog from "./LoginDialog";

const pages = ['หน้าหลัก', 'เกี่ยวกับระบบ', 'แนะนำระบบ', 'ลงทะเบียน'];

export default function Navbar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <AppBar position="static" style={{background: '#2E2E48'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div"
                                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}><img src={iscLogo} alt="isc-logo"
                                                                                     width={'70%'}/></Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                                    aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted
                              transformOrigin={{vertical: 'top', horizontal: 'left',}} open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu} sx={{display: {xs: 'block', md: 'none'},}}>
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
                    <Typography variant="h6" noWrap component="div"
                                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <img src={iscLogo} alt={'logo'} width={'100px'}/>
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button style={{fontSize: "16px"}} key={page} onClick={handleCloseNavMenu}
                                    sx={{my: 2, ml: 0.5, color: 'white', display: 'block'}}>{page}</Button>
                        ))}
                    </Box>
                    <Button sx={{ml: 2}}
                            style={{
                                borderRadius: 10,
                                borderColor: "#fff",
                                fontSize: "16px",
                                color: "#fff",
                                textDecoration: "none"
                            }}
                            variant="outlined" onClick={handleShow}>เข้าสู่ระบบ</Button>
                    <Modal className="my-modal" show={show} onHide={handleClose} centered>
                        <Modal.Body>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-end">
                                        <i className="far fa-times-circle" onClick={handleClose}/>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <img src={iscLogo} alt="isc-logo" width={'30%'}/>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center mt-4">
                                        <h4>บริการสะสมคลังทักษะด้านไอที</h4>
                                    </div>
                                    <LoginDialog/>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Toolbar>
            </Container>
        </AppBar>
    )
}