import React, {useState} from "react";
import Sidebar from "../configComponent/SidebarChild";
import axios from "axios";
import Swal from "sweetalert2";

export default function SkillExamTimeout() {
    const [exam, setExam] = useState([]);
    var Obj = {skill_id: 0, objective: [], subjective: []};
    const [no, setNo] = useState(0);

    const sendSkill = () => {

        const params = JSON.stringify({
            skill_id: Number(localStorage.getItem("skillId")),
        });

        axios.post('skill/viewRandomExam', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                setExam(res.data.exam);

                Obj.skill_id = Number(localStorage.getItem("skillId"));
                setNo(no + 1);

                for (let i = 0; i < exam.length; i++) {
                    if (exam[i].skill_exam_option === 'objective') {
                        Obj['objective'].push({
                            "skill_exam_id": exam[i].skill_exam_id,
                            "sec_id": Number(localStorage.getItem(exam[i].skill_exam_id))
                        })
                    } else if (exam[i].skill_exam_option === 'subjective') {
                        Obj['subjective'].push({
                            "skill_exam_id": exam[i].skill_exam_id,
                            "user_ans_detail": localStorage.getItem(exam[i].skill_exam_id)
                        })
                    }
                }

                if (no >= 1) {
                    axios.post('skill/checkPointSkill', JSON.stringify(Obj), {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'ส่งสำเร็จ',
                                'ติดตามคะแนนการวัดทักษะที่คลังทักษะของคุณ',
                                'success'
                            ).then(function () {
                                window.location = '/skill_store'
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        }).catch((err) =>
            console.log(err)
        )
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Sidebar mark={'skill'}>
                <button type="button" className={no > 0 ? "btn btn-warning btn-lg disabled" : "btn btn-lg btn-warning"}
                        onClick={sendSkill}><i
                    className="fa-solid fa-floppy-disk"/> บันทึกแบบวัดทักษะ
                </button>
                &nbsp;&nbsp;

                <button type="button" className={no >= 1 ? "btn btn-lg btn-success" : "btn btn-success btn-lg disabled"}
                        onClick={sendSkill}><i
                    className="fa-solid fa-paper-plane"/> ส่งแบบวัดทักษะ
                </button>
            </Sidebar>
        </div>
    )
}