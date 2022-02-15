import React from "react";
import Avatar from "@mui/material/Avatar";
import BodySkill from "./BodySkill";
import axios from "axios";
import Swal from "sweetalert2";

export default class HeadSkill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Data: null,
            persons: [],
            skillType: 0,
            levelSkill: 0,
            skillName: '',
            skillDetail: '',
            skillTime: 0,
            SkillPrice: 0,
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
        if (btoa(binaryString).length * (3 / 4) - 2 <= 50000) {
            this.setState({
                base64Data: btoa(binaryString),
            });
        } else {
            Swal.fire(
                'ไม่อนุญาตภาพ',
                'อนุญาตขนาดภาพไม่เกิน 50 Kb',
                'error'
            );
        }
    };

    componentDidMount() {
        axios.post('skill/skill_types', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const persons = res.data;
            this.setState({persons});
        })
    }

    render() {
        const {base64Data} = this.state;

        return (
            <>
                <div className="container pb-4" align={'center'}
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
                                    <div>
                                        <i className="fas fa-caret-up"/> เพิ่มสัญลักษณ์ทักษะ, 50 kb
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="col-md-12 mt-4">
                                <input type="email" className="form-control" placeholder="ชื่อทักษะ"
                                       onChange={(e) => this.setState({skillName: e.target.value})}/>
                            </div>
                            <div className="col-md-12 mt-4">
                                <textarea className="form-control" placeholder="รายละเอียดทักษะ" rows="3"
                                          onChange={(e) => this.setState({skillDetail: e.target.value})}/>
                            </div>
                            <div className="col-md-12">
                                {
                                    this.state.skillType === 0
                                        ? <div className="row">
                                            <div className="col-md-12 mt-4">
                                                <select className="form-select"
                                                        onChange={(e) => this.setState({skillType: e.target.value})}
                                                        defaultValue="">
                                                    <option>เลือกประเภททักษะ...</option>
                                                    {
                                                        this.state.persons
                                                            .map(data =>
                                                                <option
                                                                    value={data.skill_type_id}
                                                                    key={data.skill_type_id}>{data.skill_type_name}</option>
                                                            )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        : <div className="row">
                                            <div className="col-md-5 mt-4">
                                                <select className="form-select"
                                                        onChange={(e) => this.setState({skillType: e.target.value})}
                                                        defaultValue="">
                                                    <option disabled>เลือกประเภททักษะ...</option>
                                                    {
                                                        this.state.persons
                                                            .map(data =>
                                                                <option
                                                                    value={data.skill_type_id}
                                                                    key={data.skill_type_id}>{data.skill_type_name}</option>
                                                            )
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-7 mt-4">
                                                {this.state.persons
                                                    .map(data =>
                                                        Number(this.state.skillType) === Number(data.skill_type_id)
                                                        && <textarea className="form-control" rows="2"
                                                                     value={data.skill_type_detail} key={data.skill_type_id}
                                                                     readOnly/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 mt-4">
                                        <input type="number" className="form-control" placeholder="ระยะเวลา(นาที)"
                                               onChange={(e) => this.setState({skillTime: e.target.value})}/>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <select className="form-select"
                                                onChange={(e) => this.setState({levelSkill: e.target.value})}
                                                defaultValue="">
                                            <option disabled>เลือกระดับความยาก...</option>
                                            <option value="1">ง่าย</option>
                                            <option value="2">ค่อนข้างง่าย</option>
                                            <option value="3">ปานกลาง</option>
                                            <option value="4">ค่อนข้างยาก</option>
                                            <option value="5">ยาก</option>
                                        </select>
                                    </div>
                                    <div className=" col-md-1 mt-4">
                                        ราคา :
                                    </div>
                                    <div className=" col-md-3 mt-4">
                                        <input type="number" min="1" step="any" className=" form-control"
                                               placeholder="ราคา(บาท)" value={0}
                                               onChange={(e) => this.setState({skillPrice: e.target.value})} readOnly={true}/>
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
                            <BodySkill profile={base64Data} skillType={this.state.skillType}
                                       levelSkill={this.state.levelSkill}
                                       skillName={this.state.skillName} skillDetail={this.state.skillDetail}
                                       skillTime={this.state.skillTime}
                                       SkillPrice={this.state.SkillPrice}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
