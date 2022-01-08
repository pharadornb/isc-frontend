import './App.css';
import React from 'react';
import Swal from 'sweetalert2';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function App() {

    const handleClick = () => {
        Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
        )
    }

    return (
        <div className={'container-fluid'}>
            <div className="row">
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
                <div className="col-md-12 mt-3">
                    <h3><b>iT-Skill-Collect(ISC) ระบบฝึกทักษะ</b></h3>
                </div>
                <div className="col-md-4 mt-3">
                    *<b>boostrap</b> test: <input type="email" className={'form-control'} />
                </div>
                <div className="col-md-12 mt-3">
                    *<b>mui</b> test + *<b>sweetalert</b> test: : <Button variant="contained"
                                                                          onClick={() => handleClick()}>ทดสอบ</Button>
                </div>
                <div className="col-md-12 mt-3">
                    *<b>fontawesome</b> test: <i className="fas fa-user" />
                </div>
            </div>
        </div>
    );
}