import React, {useEffect, useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import EditSkillChoice from "./EditSkillChoice";
import Loader from "../configComponent/Loader";
import axios from "axios";
import Swal from "sweetalert2";

const EditSkillBody = (props) => {

    const [exam, setExam] = useState([
        {skill_exam_head: "", skill_exam_option: "objective", skill_exam_detail: "", skill_exam_objective: ""}
    ]);
    const [examView, setExamView] = useState([]);
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {

        setShowLoading(true)
        const params = JSON.stringify({
            skill_id: props.id,
        });

        axios.post('skill/viewRandomExam', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            res => {
                if (res.status === 200) {
                    setExamView(res.data)
                    setShowLoading(false)
                }
            }
        ).catch(
            error => {
                console.log(error)
                setShowLoading(false)
            }
        )
    }, [props.id])

    const handleChange = (index, event) => {
        const values = [...exam];
        if (event.target.name === "skill_exam_head") {
            values[index].skill_exam_head = event.target.value;
        } else if (event.target.name === "skill_exam_option") {
            values[index].skill_exam_option = event.target.value;
        } else if (event.target.name === "skill_exam_detail") {
            values[index].skill_exam_detail = event.target.value;
        } else if (event.target.name === "skill_exam_objective") {
            values[index].skill_exam_objective = event.target.value;
        }
        setExam(values);
    };

    const handleAddFields = () => {
        const values = [...exam];
        values.push({
            skill_exam_head: "",
            skill_exam_option: "objective",
            skill_exam_detail: "",
            skill_exam_objective: ""
        });
        setExam(values);
    };

    const handleRemoveFields = (i) => {
        const values = [...exam];
        if (values.length > 1) values.splice(i, 1);
        setExam(values);
    };

    const handleRemoveFieldsView = (i, id) => {
        const values = [...examView];
        if (values.length > 1) values.splice(i, 1);
        setExamView(values);
        console.log(id)
        const params = JSON.stringify({
            "exam_del": [
                {
                    "skill_exam_id": id
                }
            ]
        });

        axios.post('skill/updateDeleteSkillExam', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'ลบข้อมูลสำเร็จ',
                        text: 'คุณสามารถดูข้อมูลที่ถูกลบได้ที่หน้าจอด้านล่าง',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง'
                    }).then((result) => {
                        if (result.value) {
                            window.location.reload()
                        }
                    })
                }
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const params = JSON.stringify({
            skill_type_id: props.skillType,
            skill_name: props.skillName,
            skill_detail: props.skillDetail,
            skill_time: props.skillTime,
            skill_hard: props.levelSkill,
            skill_logo: props.profile,
            skill_id: props.skillId,
        });

        console.log(JSON.parse(params))

        axios.post('skill/updateDeleteSkillExam', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            res => {
                if (res.status === 200) {
                    // let i;
                    // for (i = 0; i < exam.length; i++) {
                    //     if (exam[i].skill_exam_option === 'objective') {
                    //         let val = localStorage.getItem(i)
                    //
                    //         const params_choice = JSON.stringify({
                    //             "skill_exam_head": exam[i].skill_exam_head,
                    //             "skill_exam_option": exam[i].skill_exam_option,
                    //             "choice": JSON.parse(val)
                    //         });
                    //
                    //         axios.post('skill/choice_add', params_choice, {
                    //             headers: {
                    //                 'Content-Type': 'application/json',
                    //             }
                    //         }).then(
                    //             res => {
                    //                 if (res.status === 200) {
                    //                     Swal.fire(
                    //                         'บันทึกสำเร็จ',
                    //                         'บันทึกข้อมูลการสร้างทักษะสำเร็จ',
                    //                         'success'
                    //                     ).then(function () {
                    //                         setShowLoading(false)
                    //                         localStorage.clear();
                    //                         window.location = '/skill'
                    //                     });
                    //                 } else if (res.status === 404 || res.status === 404) {
                    //                     Swal.fire(
                    //                         'บันทึกไม่สำเร็จ',
                    //                         'บันทึกข้อมูลการสร้างทักษะไม่สำเร็จ',
                    //                         'error'
                    //                     ).then();
                    //                 }
                    //             }
                    //         ).catch(err =>
                    //             console.log(err)
                    //         )
                    //     }
                    // }
                } else if (res.status === 404 || res.status === 401) {
                    Swal.fire(
                        'บันทึกไม่สำเร็จ',
                        'บันทึกข้อมูลการสร้างทักษะไม่สำเร็จ',
                        'error'
                    ).then();
                }
            }
        ).catch(err =>
            console.log(err)
        )
    }

    return (
        <Loader show={showLoading}>
            {examView.map((data, i) => {
                return (
                    <Row className="mt-2 p-3" key={i}>
                        <Col md={8} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" placeholder="ตั้งโจทย์" name="skill_exam_head"
                                              value={'หัวข้อโจทย์ : '+ data.skill_exam_head} readOnly={true}/>
                            </Form.Group>
                        </Col>
                        <Col md={4} className={'mt-4'}>
                            <Form.Group controlId="formRoomType">
                                <Form.Select as="select" name="skill_exam_option"
                                             value={data.skill_exam_option} disabled={true}>
                                    {
                                        data.skill_exam_option === 'objective' ?
                                            <option value={data.skill_exam_option}>ประเภทโจทย์ : เลือกตอบ - ปรนัย</option> :
                                            <option value={data.skill_exam_option}>ประเภทโจทย์ : พิมพ์ตอบ*(ไม่นำมาคิดเปอร์เซ็นต์) - อัตนัย</option>
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {data.skill_exam_option !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'รายละเอียดของโจทย์'} name="skill_exam_detail"
                                      value={data.skill_exam_detail} readOnly={true}/>
                            </Col>
                        }
                        {data.skill_exam_option !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="skill_exam_objective"
                                      value={data.skill_exam_objective} readOnly={true}/>
                            </Col>
                        }
                        {data.skill_exam_option === 'objective' &&
                            <Col md={12} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="skill_exam_objective"
                                      value={data.skill_exam_objective} readOnly={true}/>
                            </Col>
                        }
                        {data.skill_exam_option === 'objective' &&
                            <Col md={12} className={'mt-4'} align={'left'}>
                                <EditSkillChoice count_stack={i} exam_val={exam}
                                                 skillExamOption={data.skill_exam_option} id={data.skill_exam_id} skObj={data.skill_exam_objective}/>
                            </Col>
                        }
                        <Col className="pt-2 d-flex justify-content-end">
                            <Button variant="danger" onClick={() => handleRemoveFieldsView(i, data.skill_exam_id)}>
                                <i className="fas fa-minus-circle"/> ลบโจทย์
                            </Button>
                        </Col>
                    </Row>
                );
            })}
            {exam.map((data, i) => {
                return (
                    <Row className="mt-2 p-3" key={i}>
                        <Col md={8} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" placeholder="ตั้งโจทย์" name="skill_exam_head"
                                              value={data.skill_exam_head}
                                              onChange={(event) => handleChange(i, event)}/>
                            </Form.Group>
                        </Col>
                        <Col md={4} className={'mt-4'}>
                            <Form.Group controlId="formRoomType">
                                <Form.Select as="select" name="skill_exam_option"
                                             value={data.skill_exam_option}
                                             onChange={(event) => handleChange(i, event)}>
                                    <option value="objective">เลือกตอบ - ปรนัย</option>
                                    <option value="subjective">พิมพ์ตอบ*(ไม่นำมาคิดเปอร์เซ็นต์) - อัตนัย</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {data.skill_exam_option !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'รายละเอียดของโจทย์'} name="skill_exam_detail"
                                      value={data.skill_exam_detail}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.skill_exam_option !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="skill_exam_objective"
                                      value={data.skill_exam_objective}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.skill_exam_option === 'objective' &&
                            <Col md={12} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="skill_exam_objective"
                                      value={data.skill_exam_objective}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.skill_exam_option === 'objective' &&
                            <Col md={12} className={'mt-4'} align={'left'}>
                                <EditSkillChoice count_stack={i} exam_val={exam} id={data.skill_exam_id}
                                             skillExamOption={data.skill_exam_option} />
                            </Col>
                        }
                        <Col className="pt-2 d-flex justify-content-between">
                            <Button variant="warning" onClick={handleAddFields}>
                                <i className="fas fa-plus-circle"/> เพิ่มโจทย์
                            </Button>
                            <Button variant="danger" onClick={() => handleRemoveFields(i)}>
                                <i className="fas fa-minus-circle"/> ลบโจทย์
                            </Button>
                        </Col>
                    </Row>
                );
            })}
            <Row>
                <Col className="pt-2 d-flex justify-content-center">
                    <Button variant="success" onClick={handleSubmit}>
                        <i className="fas fa-cloud-upload-alt"/> บันทึกโจทย์และทักษะ
                    </Button>
                </Col>
            </Row>
        </Loader>
    );
};

export default EditSkillBody;