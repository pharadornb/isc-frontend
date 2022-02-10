import React from "react";
import Avatar from "@mui/material/Avatar";
import ThaiAddress from "./ThaiAddress";
import Swal from "sweetalert2";

const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Data: null,
            email: '',
            password: '',
            name: '',
            surname: '',
            dob: '',
            tel: '',
            slogan: '',
            github: '',
            linkedin: '',
            facebook: '',
            youtube: ''
        }
        localStorage.removeItem('userRegisterEmail');
        localStorage.removeItem('userRegisterProfile');
        localStorage.removeItem('userRegisterPassword');
        localStorage.removeItem('userRegisterRePassword');
        localStorage.removeItem('validEmail');
        localStorage.removeItem('validPassword');
    }

    onChange = (e) => {
        let file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };

    _handleReaderLoaded = (e) => {
        let binaryString = e.target.result;
        if (btoa(binaryString).length * (3 / 4) - 2 <= 50000) {
            this.setState({
                base64Data: btoa(binaryString),
            });
            localStorage.setItem('userRegisterProfile', btoa(binaryString));
        } else {
            Swal.fire(
                'ไม่อนุญาตภาพ',
                'อนุญาตขนาดภาพไม่เกิน 50 Kb',
                'error'
            );
        }
    };

    checkEmailValid() {
        let val = '';
        localStorage.removeItem('validEmail');
        if (localStorage.getItem('userRegisterEmail') === '') {
            val = 'false1';
        } else {
            if (!emailValidator.test(localStorage.getItem('userRegisterEmail')) === false) {
                val = 'false2';
                localStorage.setItem('validEmail', true)
            }
        }
        return val;
    }

    checkPasswordValid() {
        let val = '';
        if (localStorage.getItem('userRegisterPassword') === '') {
            val = 'false1';
        }
        return val;
    }

    checkRepasswordValid() {
        localStorage.removeItem('validPassword');
        let val = '';
        if (localStorage.getItem('userRegisterRePassword') !== localStorage.getItem('userRegisterPassword')) {
            val = 'false2';
        } else {
            if (localStorage.getItem('userRegisterPassword') !== '' && localStorage.getItem('userRegisterPassword') !== null) {
                val = 'false3';
                localStorage.setItem('validPassword', true)
            }
        }
        return val;
    }


    render() {
        const {base64Data} = this.state;

        return (
            <>
                {this.props.step === 1 && (
                    <div className="container" align={'center'}>
                        <div className="row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12 mt-4">
                                        {base64Data !== null ? (
                                            <Avatar
                                                src={`data:image/png;base64,${base64Data}`}
                                                className="avatar-register" sx={{width: 150, height: 150}}
                                            />
                                        ) : (
                                            localStorage.getItem('userRegisterProfile') !== '' && (
                                                <label htmlFor="file">
                                                    <Avatar alt="ITSC-Profile"
                                                            src={`data:image;base64,${localStorage.getItem('userRegisterProfile')}`}
                                                            sx={{width: 130, height: 130}}/>
                                                </label>

                                            )
                                        )}
                                        <input type="file" className="custom-file-input" name="image" id="file"
                                               accept=".jpg, .jpeg, .png"
                                               onChange={(e) => this.onChange(e)} style={{display: "none"}}/>
                                        <div>
                                            <i className="fas fa-caret-up"/> เพิ่มรูปโฟรไฟล์, 50 kb
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input type="email" className='form-control' placeholder="อีเมล์ผู้รับบริการ"
                                               onChange={(e) => this.setState({email: e.target.value},
                                                   localStorage.setItem('userRegisterEmail', e.target.value))}
                                               size={250}
                                               value={localStorage.getItem('userRegisterEmail') ? localStorage.getItem('userRegisterEmail') : ''}/>
                                        {
                                            this.checkEmailValid() === 'false1' && (
                                                <div className="alert alert-danger" role="alert">
                                                    กรุณากรอกอีเมล์
                                                </div>
                                            )
                                        }
                                        {
                                            this.checkEmailValid() === 'false2' && (
                                                <div className="alert alert-success" role="alert">
                                                    อีเมล์สามารถใช้ได้
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input type="password" className="form-control" placeholder="ตั้งรหัสผ่าน"
                                               onChange={(e) => this.setState(
                                                   localStorage.setItem('userRegisterRePassword', e.target.value))}/>
                                    </div>
                                    {
                                        this.checkPasswordValid() === 'false1' && (
                                            <div className="alert alert-danger" role="alert">
                                                กรุณากรอกรหัสผ่าน
                                            </div>
                                        )
                                    }
                                    <div className="col-md-12 mt-4">
                                        <input type="password" className="form-control" placeholder="ยืนยันรหัสผ่าน"
                                               onChange={(e) => this.setState({password: e.target.value},
                                                   localStorage.setItem('userRegisterPassword', e.target.value))}
                                               value={localStorage.getItem('userRegisterPassword') ? localStorage.getItem('userRegisterPassword') : ''}/>
                                    </div>
                                    {
                                        this.checkRepasswordValid() === 'false2' && (
                                            <div className="alert alert-danger" role="alert">
                                                กรุณากรอกรหัสผ่านให้ตรงกัน
                                            </div>
                                        )
                                    }
                                    {
                                        this.checkRepasswordValid() === 'false3' && (
                                            <div className="alert alert-success" role="alert">
                                                รหัสผ่านตรงกัน
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                )}
                {this.props.step === 2 && (
                    <div className="container mt-3" align={'center'}>
                        <div className="row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="ชื่อ"
                                               onChange={(e) => this.setState({name: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="สกุล"
                                               onChange={(e) => this.setState({surname: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="date" className="form-control"
                                               onChange={(e) => this.setState({dob: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="เบอร์ติดต่อ"
                                               onChange={(e) => this.setState({tel: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="GitHub"
                                               onChange={(e) => this.setState({github: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="LinkedIn"
                                               onChange={(e) => this.setState({linkedin: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="Facebook"
                                               onChange={(e) => this.setState({facebook: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="Youtube"
                                               onChange={(e) => this.setState({youtube: e.target.value})}/>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <textarea className="form-control" placeholder="คติประจำใจ" rows="3"
                                                  onChange={(e) => this.setState({slogan: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                )}
                {this.props.step === 3 && (
                    <div className="container mt-3" align={'center'}>
                        <div className="row">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <ThaiAddress user_email={this.state.email} user_password={this.state.password}
                                             user_role={'user'} user_profile={this.state.base64Data}
                                             user_tel={this.state.tel} user_dob={this.state.dob}
                                             user_slogan={this.state.slogan} us_com_github={this.state.github}
                                             us_com_linkedin={this.state.linkedin} us_com_facebook={this.state.facebook}
                                             us_com_youtube={this.state.youtube}/>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
