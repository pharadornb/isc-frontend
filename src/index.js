import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material";
import Home from "./pages/Home";
import Login from './pages/Login'

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.baseURL = 'http://20.212.154.221:8080';
// axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('accessToken')}`

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
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
