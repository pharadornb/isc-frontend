import './App.css';
import React from 'react';
import Swal from 'sweetalert2';
import Button from "@mui/material/Button";

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
                <a href="/login">login จ้า</a>
                <a href="/register">register จ้า</a>
                <div className="col-md-12 mt-3">
                    <h3><b>iT-Skill-Collect(ISC) ระบบฝึกทักษะ</b></h3>
                </div>
                <div className="col-md-4 mt-3">
                    *<b>boostrap</b> test: <input type="email" className={'form-control'}></input>
                </div>
                <div className="col-md-12 mt-3">
                    *<b>mui</b> test + *<b>sweetalert</b> test: : <Button variant="contained"
                                                                          onClick={() => handleClick()}>Login</Button>
                </div>
                <div className="col-md-12 mt-3">
                    *<b>fontawesome</b> test: <i className="fas fa-user"></i>
                </div>
            </div>
        </div>
    );
}