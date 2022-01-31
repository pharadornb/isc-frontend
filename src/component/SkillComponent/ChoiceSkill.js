import React, {useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";

const ChoiceSkill = (props) => {

    const [choice, setExam] = useState([{sec_name: "", sec_isanswer: "no"}]);

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

        console.log(choice)
        // const params = JSON.stringify({
        //     skill_type_id: props.skillType,
        //     skill_name: props.skillName,
        //     skill_detail: props.skillDetail,
        //     skill_time: props.skillTime,
        //     skill_hard: props.levelSkill,
        //     skill_credit: props.SkillPrice,
        //     skill_logo: props.profile,
        //     exam: props.exam_val
        // });

        // console.log(params)
        // choice.length

        // console.log(choice.length)

        for (let i = 1; i < choice.length; i--) {
            // console.log(i)
            // localStorage.setItem(props.count_stack + ' ' + i, JSON.stringify(choice));
        }

    };

    return (
        <>
            {choice.map((data, i) => {
                return (
                    props.skillExamOption === 'objective' &&
                    <Row key={i}>
                        <Col md={1} className={'mt-4'}>
                            <div style={{margin: "auto"}}>
                                <Form.Check inline label="เฉลย" name="sec_isanswer"
                                            onChange={(event) => handleChange(i, event)}/>
                            </div>
                        </Col>
                        <Col md={9} className={'mt-4'}>
                            <span>{props.count_stack} {i} {choice.length}</span>
                            <Form.Group controlId="formBasicRoom">
                                <Form.Control type="text" placeholder="ตัวเลือก" name="sec_name"
                                              value={data.sec_name}
                                              onChange={(event) => handleChange(i, event)}/>
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
            <div align={'center'} className={'mt-3'}>
                <Button variant="primary" onClick={handleSubmit}>
                    <i className="fas fa-cloud-upload-alt"/> บันทึกตัวเลือก
                </Button>
            </div>
        </>
    );
};

export default ChoiceSkill;