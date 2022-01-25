import React from "react";
import Avatar from "@mui/material/Avatar";
import ThaiAddressCompany from "./ThaiAddressCompany";

export default class RegisterCompany extends React.Component {
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
        this.setState({
            base64Data: btoa(binaryString),
        });
    };

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
                                        {base64Data != null && (
                                            <Avatar
                                                alt="profile-images"
                                                src={`data:image;base64,${base64Data}`}
                                                sx={{width: 130, height: 130}}
                                            />
                                        )}
                                        {base64Data === null && (
                                            <Avatar alt="profile-images"
                                                    src="https://pharadorn.lnw.mn/isc-project/isc-logo-2.png"
                                                    sx={{width: 130, height: 130}}/>
                                        )}
                                        <input type="file" className="custom-file-input" name="image" id="file"
                                               accept=".jpg, .jpeg, .png"
                                               onChange={(e) => this.onChange(e)}/>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input type="email" className="form-control" placeholder="อีเมล์ผู้รับบริการ"
                                               onChange={(e) => this.setState({email: e.target.value})}/>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input type="password" className="form-control" placeholder="ตั้งรหัสผ่าน"
                                               onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input type="password" className="form-control" placeholder="ยืนยันรหัสผ่าน"/>
                                    </div>
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
                                        <input type="email" className="form-control" placeholder="GitHub"
                                               onChange={(e) => this.setState({github: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="LinkedIn"
                                               onChange={(e) => this.setState({linkedin: e.target.value})}/>
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <input type="email" className="form-control" placeholder="Facebook"
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
                                <ThaiAddressCompany user_email={this.state.email} user_password={this.state.password}
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
