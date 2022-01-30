import React, {useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";

const ChoiceSkill = (props) => {
    const [exam, setExam] = useState([
        {headExam: "", examType: ""}
    ]);

    const handleChange = (index, event) => {
        const values = [...exam];
        if (event.target.name === "headExam") {
            values[index].headExam = event.target.value;
        } else if (event.target.name === "examType") {
            values[index].examType = event.target.value;
        }
        setExam(values);
    };

    const handleAddFields = () => {
        const values = [...exam];
        values.push({headExam: "", examType: ""});
        setExam(values);
    };

    const handleRemoveFields = () => {
        const values = [...exam];
        if (values.length > 1) values.pop();
        setExam(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Form>
            {exam.map((data, i) => {
                return (
                    <Row key={i}>
                        <Col md={1} className={'mt-4'}>
                            <div style={{margin: "auto"}}>
                                <Form.Check inline label="เฉลย" name="group1"/>
                            </div>
                        </Col>
                        <Col md={8} className={'mt-4'}>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" placeholder="ตัวเลือก" name="headExam"
                                              value={data.headExam}
                                              onChange={(event) => handleChange(i, event)}/>
                            </Form.Group>
                        </Col>
                        <Col md={3} className={'mt-4'}>
                            <Button variant="warning" onClick={handleAddFields}>
                                <i className="fas fa-plus-circle"/>
                            </Button>&nbsp;&nbsp;&nbsp;
                            <Button variant="danger" onClick={handleRemoveFields}>
                                <i className="fas fa-minus-circle"/>
                            </Button>
                        </Col>
                        {props.count - props.count_stack === 1 &&
                            <Button className="mt-5" variant="primary" type="submit" onClick={handleSubmit}><i
                                className="fas fa-cloud-upload-alt"/> อัพโหลดทักษะ</Button>
                        }
                    </Row>
                );
            })}
        </Form>
    );
};

export default ChoiceSkill;