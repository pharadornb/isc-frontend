import React, {useEffect, useState, useMemo} from "react";
import {Pagination} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PaginationTable = ({total = 0, itemsPerPage = 10, currentPage = 1, onPageChange}) => {
    const [totalPages, setTotalPages] = useState(0);
    const {skillId} = useParams()
    const [exam, setExam] = useState([]);
    var Obj = {skill_id: 0, objective: [], subjective: []};
    const [no, setNo] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button key={i} type="button" style={{marginLeft: '1.5px'}}
                        className={i > currentPage ? "btn btn-md btn-light" : "btn btn-md btn-primary"} disabled>
                    {i}
                </button>
            );
        }

        return pages;
    }, [totalPages, currentPage]);

    if (totalPages === 0) return null;

    const sendSkill = () => {

        const params = JSON.stringify({
            skill_id: skillId,
        });

        axios.post('skill/viewRandomExam', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                setExam(res.data.exam);

                Obj.skill_id = skillId;
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
                                localStorage.removeItem('time');
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
        <>
            <Pagination>
                {paginationItems}
                <button type="button" style={{marginLeft: '5px'}} className="btn btn-md btn-warning"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>
                    ข้อถัดไป <i className="fa-solid fa-circle-chevron-right"/>
                </button>
            </Pagination>
            {
                currentPage === totalPages &&
                <div style={{textAlign: 'center'}}>
                    <button type="button" className={no > 0 ? "btn btn-warning btn-lg disabled" : "btn btn-lg btn-warning"} onClick={sendSkill}><i
                        className="fa-solid fa-floppy-disk"/> บันทึกแบบวัดทักษะ
                    </button>
                    &nbsp;&nbsp;

                    <button type="button" className={no >= 1 ? "btn btn-lg btn-success" : "btn btn-success btn-lg disabled"} onClick={sendSkill}><i
                        className="fa-solid fa-paper-plane"/> ส่งแบบวัดทักษะ
                    </button>
                </div>

            }
        </>
    );
};

export default PaginationTable;