import React from "react";
import Avatar from "@mui/material/Avatar";
import EditSkillBody from "./EditSkillBody";
import axios from "axios";
import Swal from "sweetalert2";

export default class EditSkillHeader extends React.Component {
    constructor(props) {
        super(props);
        if (props.edit) {
            this.state = {
                skillId: props.edit,
                base64Data: null,
                persons: [],
                skillType: 0,
                levelSkill: 0,
                skillName: '',
                skillDetail: '',
                skillTime: 0,
                SkillPrice: 0,
                skillProfile: '',
                SkillTypeName: '',
                SkillTypeId: 0,
            }
        } else {
            this.state = {
                base64Data: null,
                persons: [],
                skillType: 0,
                levelSkill: 0,
                skillName: '',
                skillDetail: '',
                skillTime: 0,
                SkillPrice: 0,
                SkillTypeName: '',
            }
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

    async componentDidMount() {

        await axios.post('skill/skill_types', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const persons = res.data;
            this.setState({persons});
        })


        const params = JSON.stringify({
            skill_id: this.state.skillId,
        });

        await axios.post('skill/viewSkillById', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            this.setState({
                profile: res.data[0].skill_logo,
                skillName: res.data[0].skill_name,
                skillDetail: res.data[0].skill_detail,
                SkillTypeName: res.data[0].skill_type_name,
                SkillTypeId: res.data[0].skill_type_id,
                skillTime: res.data[0].skill_time,
                levelSkill: res.data[0].skill_hard,
            });
        })
    }

    render() {
        const {
            base64Data,
            skillId,
            profile,
            skillName,
            skillDetail,
            SkillTypeName,
            skillTime,
            levelSkill,
            SkillTypeId
        } = this.state;

        return (
            <>
                <div className="container pb-4" align={'center'}
                     style={{backgroundColor: '#FFFAFA', borderRadius: '20px'}}>
                    <div className="row">
                        <div className="col-md-12" style={{fontSize: '30px'}}>
                            {
                                skillId ?
                                    <b>แก้ไขทักษะ</b>
                                    :
                                    <b>บริการสร้างทักษะ</b>
                            }
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 mt-4">
                                    {/*{Profile}*/}
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
                                                    src={`data:image;base64,${profile}`}
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
                                       onChange={(e) => this.setState({skillName: e.target.value})} value={skillName}/>
                            </div>
                            <div className="col-md-12 mt-4">
                                <textarea className="form-control" placeholder="รายละเอียดทักษะ" rows="3"
                                          onChange={(e) => this.setState({skillDetail: e.target.value})}
                                          value={skillDetail}/>
                            </div>
                            <div className="col-md-12">
                                {
                                    this.state.skillType === 0
                                        ? <div className="row">
                                            <div className="col-md-12 mt-4">
                                                <select className="form-select"
                                                        onChange={(e) => this.setState({skillType: e.target.value})}
                                                        defaultValue={SkillTypeName}>
                                                    <option value={SkillTypeId}>{SkillTypeName}</option>
                                                    {
                                                        this.state.persons
                                                            .map(data =>
                                                                SkillTypeId !== data.skill_type_id &&
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
                                                        defaultValue={SkillTypeName}>
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
                                               onChange={(e) => this.setState({skillTime: e.target.value})}
                                               value={skillTime}/>
                                    </div>
                                    <div className="col-md-4 mt-4">
                                        <select className="form-select"
                                                onChange={(e) => this.setState({levelSkill: e.target.value})}>
                                            {
                                                levelSkill === 1 &&
                                                <>
                                                    <option value={levelSkill}>ง่าย</option>
                                                    <option value="2">ค่อนข้างง่าย</option>
                                                    <option value="3">ปานกลาง</option>
                                                    <option value="4">ค่อนข้างยาก</option>
                                                    <option value="5">ยาก</option>
                                                </>
                                            }
                                            {
                                                levelSkill === 2 &&
                                                <>
                                                    <option value={levelSkill}>ค่อนข้างง่าย</option>
                                                    <option value="1">ง่าย</option>
                                                    <option value="3">ปานกลาง</option>
                                                    <option value="4">ค่อนข้างยาก</option>
                                                    <option value="5">ยาก</option>
                                                </>
                                            }
                                            {
                                                levelSkill === 3 &&
                                                <>
                                                    <option value={levelSkill}>ปานกลาง</option>
                                                    <option value="1">ง่าย</option>
                                                    <option value="2">ค่อนข้างง่าย</option>
                                                    <option value="4">ค่อนข้างยาก</option>
                                                    <option value="5">ยาก</option>
                                                </>
                                            }
                                            {
                                                levelSkill === 4 &&
                                                <>
                                                    <option value={levelSkill}>ค่อนข้างยาก</option>
                                                    <option value="1">ง่าย</option>
                                                    <option value="2">ค่อนข้างง่าย</option>
                                                    <option value="3">ปานกลาง</option>
                                                    <option value="5">ยาก</option>
                                                </>
                                            }
                                            {
                                                levelSkill === 5 &&
                                                <>
                                                    <option value={levelSkill}>ยาก</option>
                                                    <option value="1">ง่าย</option>
                                                    <option value="2">ค่อนข้างง่าย</option>
                                                    <option value="3">ปานกลาง</option>
                                                    <option value="4">ค่อนข้างยาก</option>
                                                </>
                                            }
                                        </select>
                                    </div>
                                    <div className=" col-md-1 mt-4">
                                        ราคา :
                                    </div>
                                    <div className=" col-md-3 mt-4">
                                        <input type="number" min="1" step="any" className=" form-control"
                                               placeholder="ราคา(บาท)" value={0}
                                               onChange={(e) => this.setState({skillPrice: e.target.value})}
                                               readOnly={true}/>
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
                            <EditSkillBody id={this.state.skillId} profile={ base64Data ? base64Data : this.state.profile}
                                           skillType={this.state.skillType ? this.state.skillType : this.state.SkillTypeId} levelSkill={this.state.levelSkill}
                                           skillName={this.state.skillName} skillDetail={this.state.skillDetail}
                                           skillTime={this.state.skillTime}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
