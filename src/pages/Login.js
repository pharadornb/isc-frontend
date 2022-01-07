import React, {useState} from 'react';
import Button from "@mui/material/Button";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState('bom@bom.com');
    const [password, setPassword] = useState('bom1234');

    const handleSubmit = async e => {
        e.preventDefault();

        axios.get('auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

        // const response = await loginUser({
        //     email,
        //     password
        // });

        // console.log("fuck" + response)

        // if ('accessToken' in response) {
        //     sessionStorage.setItem('accessToken', response['accessToken']);
        //     sessionStorage.setItem('refreshToken', response['refreshToken']);
        //     window.location.href = "/";
        // } else {
        //     // Swal("Failed", response.messageTh, "error");
        // }
    }

    return (
        <div className="col-lg-6 col-md-6 form-container">
            <div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
                <div className="mb-3">
                    {/*<img src={iamLogo} width="120px" alt="img-logo"/>*/}
                </div>
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8">
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="email" className={'form-control'}
                                           onChange={e => setEmail(e.target.value)} placeholder={'Username'} value={email}></input>
                                    <input type="email" className={'form-control mt-3'}
                                           onChange={e => setPassword(e.target.value)} placeholder={'Password'} value={password}></input>
                                </div>
                                <div className="col-md-12 d-flex justify-content-end">
                                    <div className="text-left mb-3 mt-4">
                                        <Button type="submit" variant="contained">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2"/>
                </div>
            </div>
        </div>
    );
}

// async function loginUser(credentials) {
//     console.log(credentials)
//
//     return fetch('http://20.212.154.221:2195/api/auth/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true
//         },
//         // body: JSON.stringify(credentials),
//         mode: 'no-cors'
//     })
//         .then(data => data.json())
// }

export default Login;

