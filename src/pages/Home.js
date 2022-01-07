import React from 'react';
import Swal from 'sweetalert2';
import Button from "@mui/material/Button";

const Home = () => {
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
                {/*<div className="col-md-12 mt-3">*/}
                {/*    *<b>axios</b> getStaticProps api test: <br/>*/}
                {/*    {props.data.map((prod) => (*/}
                {/*        <div key={prod.title}>*/}
                {/*            {prod.title}*/}
                {/*            <br/>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Home;