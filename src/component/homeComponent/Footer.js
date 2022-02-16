import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

export default function Footer() {
    return (
        <>
            <AppBar position="static" style={{background: '#2E2E48', textAlign: "center", paddingTop: "10px", paddingBottom: "10px"}}>
                <Container maxWidth="xl">
                    Copyright © 2022 - All Rights Reserved
                </Container>
            </AppBar>
        </>
    )
}