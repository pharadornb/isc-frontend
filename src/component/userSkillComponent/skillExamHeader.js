import React from 'react';
import Avatar from '@mui/material/Avatar';
import companyLogo from '../../img/isc-logo-2.png';
import SkillExamTimer from "../userSkillComponent/skilExamlTimer";

export default function SkillExamHeader(props) {
    return (
        <>
            <table className={'w-100'}>
                <tbody>
                <tr>
                    <td style={{justifyContent: "center", display: "flex"}}>
                        <Avatar alt={props.skillName} src={companyLogo}
                                sx={{width: 70, height: 70}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar alt={props.skillName} src={`data:image/jpeg;base64,${props.skillLogo}`}
                                sx={{width: 80, height: 80}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar alt={props.skillName} src={`data:image/jpeg;base64,${props.skillProfile}`}
                                sx={{width: 70, height: 70}}/>
                    </td>
                </tr>
                <tr>
                    <td className={'pt-3'}>
                        <h3><b>&nbsp;&nbsp;แบบทดสอบวัดทักษะ {props.skillName}</b></h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="d-flex justify-content-between mt-2">
                            <div className="container mt-auto mb-auto">
                                <div className="row">
                                    <div className="col-md-8" style={{textAlign: 'left'}}>
                                        <b>รายละเอียด : </b><u>ข้อเลือกตอบ</u>จะมีการคิดคะแนน เต็ม 100% เฉลี่ยรายข้อ
                                        &nbsp;<u>ข้อตอบแบบช่องว่าง</u>จะมีการถูกพิจารณาร่วมกับบริษัทที่เห็นข้อมูลโดยไม่ทำการนำมาคิดคะแนน
                                    </div>
                                    <div className="col-md-2">
                                        <b>&nbsp;&nbsp;โดย: </b>{props.skillUser}
                                    </div>
                                    <div className="col-md-2">
                                        <b>จำนวน : </b>{props.skillSum}<b> ข้อ</b>
                                    </div>
                                </div>
                            </div>
                            <SkillExamTimer skillTime={props.skillTime}/>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}