import React from "react";
import Avatar from "@mui/material/Avatar";
import ThaiAddressCompany from "./ThaiAddressCompany";
import Swal from "sweetalert2";

const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default class RegisterCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Data: null,
            email: '',
            password: '',
            companyName: '',
            companyRegister: '',
            dobCompany: '',
            companyType: '',
            companyDetail: '',
            companyTel: '',
            companyFax: '',
            companyWeb: '',
            companyVision: ''
        }
        localStorage.removeItem('companyRegisterEmail');
        localStorage.removeItem('companyRegisterProfile');
        localStorage.removeItem('companyRegisterPassword');
        localStorage.removeItem('companyRegisterRePassword');
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
            localStorage.setItem('companyRegisterProfile', btoa(binaryString));
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
        if (localStorage.getItem('companyRegisterEmail') === '') {
            val = 'false1';
        } else {
            if (!emailValidator.test(localStorage.getItem('companyRegisterEmail')) === false) {
                val = 'false2';
                localStorage.setItem('validEmail', true)
            }
        }
        return val;
    }

    checkPasswordValid() {
        let val = '';
        if (localStorage.getItem('companyRegisterPassword') === '') {
            val = 'false1';
        }
        return val;
    }

    checkRepasswordValid() {
        localStorage.removeItem('validPassword');
        let val = '';
        if (localStorage.getItem('companyRegisterRePassword') !== localStorage.getItem('companyRegisterPassword')) {
            val = 'false2';
        } else {
            if (localStorage.getItem('companyRegisterPassword') !== '' && localStorage.getItem('companyRegisterPassword') !== null) {
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
                                            localStorage.getItem('companyRegisterProfile') !== '' && (
                                                <label htmlFor="file">
                                                    <Avatar alt="ITSC-Profile"
                                                            src={`data:image;base64,${localStorage.getItem('companyRegisterProfile')}`}
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
                                        <input type="email" className='form-control' placeholder="อีเมล์บริษัท"
                                               onChange={(e) => this.setState({email: e.target.value},
                                                   localStorage.setItem('companyRegisterEmail', e.target.value))}
                                               size={250}
                                               value={localStorage.getItem('companyRegisterEmail') ? localStorage.getItem('companyRegisterEmail') : ''}/>
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
                                                   localStorage.setItem('companyRegisterRePassword', e.target.value))}/>
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
                                                   localStorage.setItem('companyRegisterPassword', e.target.value))}
                                               value={localStorage.getItem('companyRegisterPassword') ? localStorage.getItem('companyRegisterPassword') : ''}/>
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
                                    <div className="col-md-12 mt-4">
                                        <input type="email" className="form-control" placeholder="ชื่อบริษัท"
                                               onChange={(e) => this.setState({companyName: e.target.value})}/>
                                    </div>
                                    <div className="col-md-5 mt-4">
                                        <input type="email" className="form-control" placeholder="เว็บไซต์บริษัท"
                                               onChange={(e) => this.setState({companyWeb: e.target.value})}/>
                                    </div>
                                    <div className="col-md-7 mt-4">
                                        <input type="email" className="form-control" placeholder="วิสัยทัศน์บริษัท"
                                               onChange={(e) => this.setState({companyVision: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="text" className="form-control" placeholder="เลขจดทะเบียน"
                                               onChange={(e) => this.setState({companyRegister: e.target.value})}/>
                                        <div style={{textAlign: 'left', fontSize: '12px', color: 'blue'}}>*13 หลัก</div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="date" className="form-control"
                                               onChange={(e) => this.setState({dobCompany: e.target.value})}/>
                                        <div style={{
                                            textAlign: 'left',
                                            fontSize: '12px',
                                            color: 'blue'
                                        }}>*วันจัดตั้งบริษัท
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="เบอร์โทรศัพท์"
                                               onChange={(e) => this.setState({companyTel: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="เบอร์โทรสาร"
                                               onChange={(e) => this.setState({companyFax: e.target.value})}/>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <textarea className="form-control" placeholder="รายละเอียดของบริษัท" rows="3"
                                                  onChange={(e) => this.setState({companyDetail: e.target.value})}/>
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
                                <ThaiAddressCompany user_email={this.state.email} user_password={this.state.password}
                                                    user_role={'company'} user_profile={this.state.base64Data}
                                                    companyName={this.state.companyName}
                                                    companyRegister={this.state.companyRegister}
                                                    dobCompany={this.state.dobCompany}
                                                    companyType={this.state.companyType}
                                                    companyDetail={this.state.companyDetail}
                                                    companyTel={this.state.companyTel}
                                                    companyFax={this.state.companyFax}
                                                    companyWeb={this.state.companyWeb}
                                                    companyVision={this.state.companyVision}/>
                            </div>
                            <div className="col-md-2"/>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
