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
import HomePage from './pages/homePage/HomePage'
import ResetPage from "./pages/secretPage/ResetPage";
import VerifyPage from "./pages/secretPage/VerifyPage";
import CompanyResume from "./pages/resumePage/CompanyResume";
import UserResume from "./pages/resumePage/UserResume";
import SkillPage from "./pages/skillPage/SkillPage";
import SkillDashboardPage from "./pages/skillPage/SkillDashboard";
import ResumeCheck from "./pages/resumePage/ResumeCheck";
import SkillStore from "./pages/skillPage/SkillStore";
import SkillExam from "./pages/skillPage/skillExam";
import SkillExamTimeout from "./component/userSkillComponent/skillExamTimeout";
import SkillManage from "./pages/adminPage/SkillManage";
import ResetPassword from "./pages/configPage/resetPassword";

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
                <Route path="/test" element={<App/>} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/reset/:userEmail" element={<ResetPage/>} />
                <Route path="/verify/:userEmail" element={<VerifyPage/>} />
                <Route path="/resume_user" element={<UserResume/>} />
                <Route path="/resume_user/:userEmail" element={<UserResume/>} />
                <Route path="/resume_company" element={<CompanyResume/>} />
                <Route path="/resume/company/:userEmail" element={<CompanyResume/>} />
                <Route path="/skill" element={<SkillDashboardPage/>} />
                <Route path="/create_skill" element={<SkillPage/>} />
                <Route path="/check_resume" element={<ResumeCheck/>} />
                <Route path="/skill_store" element={<SkillStore/>} />
                <Route path="/skill/exam/:skillId" element={<SkillExam/>} />
                <Route path="/skill/exam/save" element={<SkillExamTimeout/>} />
                <Route path="/admin/skill" element={<SkillManage/>} />
                <Route path="/setting" element={<ResetPassword/>} />
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
