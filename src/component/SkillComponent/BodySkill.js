import React, {useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";
import ChoiceSkill from "./ChoiceSkill";

const BodySkill = () => {

    const [exam, setExam] = useState([
        {headExam: "", examType: "objective", examDetail: "", examIndicator: ""}
    ]);

    const handleChange = (index, event) => {
        const values = [...exam];
        if (event.target.name === "headExam") {
            values[index].headExam = event.target.value;
        } else if (event.target.name === "examType") {
            values[index].examType = event.target.value;
        } else if (event.target.name === "examDetail") {
            values[index].examDetail = event.target.value;
        } else if (event.target.name === "examIndicator") {
            values[index].examIndicator = event.target.value;
        }
        setExam(values);
    };

    const handleAddFields = () => {
        const values = [...exam];
        values.push({headExam: "", examType: "objective", examDetail: "", examIndicator: ""});
        setExam(values);
    };

    const handleRemoveFields = () => {
        const values = [...exam];
        if (values.length > 1) values.pop();
        setExam(values);
    };

    return (
        <Form>
            {exam.map((data, i) => {
                return (
                    <Row className="mt-3 p-3" key={i}>
                        <Col md={8} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" placeholder="ตั้งโจทย์" name="headExam"
                                              value={data.headExam}
                                              onChange={(event) => handleChange(i, event)}/>
                            </Form.Group>
                        </Col>
                        <Col md={4} className={'mt-4'}>
                            <Form.Group controlId="formRoomType">
                                <Form.Select as="select" name="examType"
                                             value={data.examType}
                                             onChange={(event) => handleChange(i, event)}>
                                    <option value="objective">เลือกตอบ - ปรนัย</option>
                                    <option value="subjective">พิมพ์ตอบ*(ไม่นำมาคิดเปอร์เซ็นต์) - อัตนัย</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {data.examType !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'รายละเอียดของโจทย์'} name="examDetail"
                                      value={data.examDetail}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.examType !== 'objective' &&
                            <Col md={6} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="examIndicator"
                                      value={data.examIndicator}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.examType === 'objective' &&
                            <Col md={12} className={'mt-4'}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                      placeholder={'ตัวชี้วัดโจทย์'} name="examIndicator"
                                      value={data.examIndicator}
                                      onChange={(event) => handleChange(i, event)}/>
                            </Col>
                        }
                        {data.examType === 'objective' &&
                            <Col md={12} className={'mt-4'} align={'left'}>
                                <ChoiceSkill count={exam.length} count_stack={i}/>
                            </Col>
                        }
                    </Row>
                );
            })}
            <Row>
                <Col className="pt-3 d-flex justify-content-between">
                    <Button variant="warning" onClick={handleAddFields}>
                        <i className="fas fa-plus-circle"/> เพิ่มโจทย์
                    </Button>
                    <Button variant="danger" onClick={handleRemoveFields}>
                        <i className="fas fa-minus-circle"/> ลบโจทย์
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default BodySkill;