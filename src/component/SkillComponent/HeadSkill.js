import React from "react";
import Avatar from "@mui/material/Avatar";
import BodySkill from "./BodySkill";

export default class HeadSkill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Data: null,
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
                <div className="container pb-4 pt-2" align={'center'}
                     style={{backgroundColor: '#FFFAFA', borderRadius: '20px'}}>
                    <div className="row">
                        <div className="col-md-12" style={{fontSize: '30px'}}>
                            <b>บริการสร้างทักษะ</b>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 mt-4">
                                    {base64Data != null && (
                                        <label htmlFor="file">
                                            <Avatar
                                                alt="profile-images"
                                                src={`data:image;base64,${base64Data}`}
                                                sx={{width: 150, height: 150}}
                                                htmlFor="file"
                                            />
                                        </label>
                                    )}
                                    {base64Data === null && (
                                        <label htmlFor="file">
                                            <Avatar alt="profile-images"
                                                    src="https://pharadorn.lnw.mn/isc-project/isc-logo-2.png"
                                                    sx={{width: 150, height: 150}}/>
                                        </label>
                                    )}
                                    <input type="file" className="custom-file-input" name="image" id="file"
                                           accept=".jpg, .jpeg, .png"
                                           onChange={(e) => this.onChange(e)} style={{display: "none"}}/>
                                        เพิ่มสัญลักษณ์ทักษะ
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="col-md-12 mt-4">
                                <input type="email" className="form-control" placeholder="ชื่อทักษะ"
                                       onChange={(e) => this.setState({email: e.target.value})}/>
                            </div>
                            <div className="col-md-12 mt-4">
                                <textarea className="form-control" placeholder="รายละเอียดทักษะ" rows="3"/>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-5 mt-4">
                                        <input type="text" className="form-control" placeholder="ประเภททักษะ"
                                               onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                    <div className="col-md-7 mt-4">
                                        <input type="text" className="form-control" placeholder="รายละเอียดประเภททักษะ"
                                               onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 mt-4">
                                        <input type="text" className="form-control" placeholder="ระยะเวลารับบริการ"
                                               onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <input type="number" className="form-control" placeholder="ระดับความยาก"
                                               onChange={(e) => this.setState({password: e.target.value})} min="1"
                                               max="5"/>
                                    </div>
                                    <div className=" col-md-4 mt-4">
                                        <input type="number" min="1" step="any" className=" form-control"
                                               placeholder="ราคา"
                                               onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pb-4 pt-2 mt-3" align={'center'}
                     style={{backgroundColor: '#FFFAFB', borderRadius: '20px'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <BodySkill/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
