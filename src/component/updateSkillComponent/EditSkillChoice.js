import React, {useEffect, useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const EditSkillChoice = (props) => {

    const [choice, setExam] = useState([{sec_name: "", sec_isanswer: "no"}]);
    const [examView, setExamView] = useState([]);

    useEffect(() => {

        if(props.id){
            const params = JSON.stringify({
                skill_exam_id: props.id,
            });

            axios.post('skill/viewRandomChoice', params, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(
                res => {
                    if (res.status === 200) {
                        setExamView(res.data)
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        }

    }, [props.id])

    const handleChange = (index, event) => {
        const values = [...choice];
        if (event.target.name === "sec_name") {
            values[index].sec_name = event.target.value;
        } else if (event.target.name === "sec_isanswer") {
            if (event.target.checked === true) {
                values[index].sec_isanswer = 'yes';
            } else {
                values[index].sec_isanswer = 'no';
            }
        }
        setExam(values);
    };

    const handleAddFields = () => {
        const values = [...choice];
        values.push({sec_name: "", sec_isanswer: "no"});
        setExam(values);
    };

    const handleRemoveFields = () => {
        const values = [...choice];
        if (values.length > 1) values.pop();
        setExam(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let check = 0;

        for (let i = 0; i < choice.length; i++) {
            if (i >= 0) {
                if (choice[i].sec_name !== "") {
                    if (choice[i].sec_isanswer === "yes") {
                        check = 1;
                    }
                }
            }
        }

        if (check === 1) {
            for (let i = 0; i < props.exam_val.length; i++) {
                localStorage.setItem(props.count_stack, JSON.stringify(choice));
            }
            Swal.fire(
                'สำเร็จ',
                'บันทึกข้อมูลตัวเลือกสำเร็จ',
                'success'
            ).then();
        } else {
            Swal.fire(
                'กรุณาเลือกเฉลย',
                'เลือกเฉลยอย่างน้อย 1 ตัวเลือก',
                'info'
            ).then();
        }
    };

    return (
        <>
            {examView.map((data, i) => {
                return (
                    props.skillExamOption === 'objective' &&
                    <Row key={i}>
                        <Col md={1} className={'mt-4'}>
                            {/*<div style={{margin: "auto"}}>*/}
                                {/*<Form.Check inline label="เฉลย" name="sec_isanswer"*/}
                                {/*            onChange={(event) => handleChange(i, event)}/>*/}
                            {/*</div>*/}
                        </Col>
                        <Col md={9} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" name="sec_name"
                                              value={"ตัวเลือก : " + data.sec_name}
                                              onChange={(event) => handleChange(i, event)} readOnly={true}/>
                            </Form.Group>
                        </Col>
                        {/*<Col md={2} className={'mt-4'}>*/}
                        {/*    <Button variant="warning" onClick={handleAddFields}>*/}
                        {/*        <i className="fas fa-plus-circle"/>*/}
                        {/*    </Button>&nbsp;&nbsp;&nbsp;*/}
                        {/*    <Button variant="danger" onClick={handleRemoveFields}>*/}
                        {/*        <i className="fas fa-minus-circle"/>*/}
                        {/*    </Button>&nbsp;&nbsp;&nbsp;*/}
                        {/*</Col>*/}
                    </Row>
                );
            })}
            {choice.map((data, i) => {
                return (
                    props.skillExamOption === 'objective' &&
                        props.skillExamOption === 'objective' &&
                    examView.length === 0 &&
                    <Row key={i}>
                        <Col md={1} className={'mt-4'}>
                            <div style={{margin: "auto"}}>
                                <Form.Check inline label="เฉลย" name="sec_isanswer"
                                            onChange={(event) => handleChange(i, event)}/>
                            </div>
                        </Col>
                        <Col md={9} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" name="sec_name" placeholder="ตัวเลือก"
                                              value={data.sec_name}
                                              onChange={(event) => handleChange(i, event)} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className={'mt-4'}>
                            <Button variant="warning" onClick={handleAddFields}>
                                <i className="fas fa-plus-circle"/>
                            </Button>&nbsp;&nbsp;&nbsp;
                            <Button variant="danger" onClick={handleRemoveFields}>
                                <i className="fas fa-minus-circle"/>
                            </Button>&nbsp;&nbsp;&nbsp;
                        </Col>
                    </Row>
                );
            })}
            {
                examView.length === 0 &&
                <div align={'center'} className={'mt-3'}>
                    <Button variant="primary" onClick={handleSubmit}>
                        <i className="fas fa-cloud-upload-alt"/> บันทึกตัวเลือก
                    </Button>
                </div>
            }
        </>
    );
};

export default EditSkillChoice;