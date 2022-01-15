import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from "axios"
import {createTheme, ThemeProvider} from "@mui/material"
import App from './App'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard";

axios.defaults.baseURL = process.env.REACT_APP_SECRET_NAME
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`

const theme = createTheme({
    typography: {
        fontFamily: [
            'Kanit',
        ].join(','),
    },
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
