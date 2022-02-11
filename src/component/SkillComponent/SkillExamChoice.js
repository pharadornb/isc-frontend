import React, {useEffect, useState} from "react";
import axios from "axios";

export default function SkillExamChoice(props) {

    const [choiceData, setChoice] = useState(false)
    const [gender, setGender] = useState();

    useEffect(() => {
        const getData = () => {

            const paramsChoice = JSON.stringify({
                skill_exam_id: props.examId,
            });

            if (props.examOption === 'objective') {
                axios.post('skill/viewRandomChoice', paramsChoice, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(resChoice => {
                    if (resChoice.status === 200) {
                        setChoice(resChoice.data)
                    }
                }).catch(err =>
                    console.log(err)
                )
            }
        };

        getData();
    }, [props.examId, props.examOption]);

    const handleChange = (e) => {
        setGender(e.target.value)
        localStorage.setItem(props.examId, Number(e.target.value));
    }

    const handleSubjective = (e) =>{
        localStorage.setItem(props.examId, e.target.value);
    }

    return (
        <tbody>
        <tr>
            <td style={{textAlign: 'left', fontSize: '20px', fontWeight: 'bold'}}>&nbsp;{props.examHead}</td>
        </tr>
        {props.examOption === 'objective'
            ?
            <tr>
                {choiceData.length > 0 &&
                    <td style={{textAlign: 'left', fontSize: '18px'}}>
                        {choiceData.map(data => (
                            <p key={data.sec_id}>
                                <input className="form-check-input" type="radio" value={data.sec_id}
                                       checked={Number(gender) === data.sec_id}
                                       onChange={handleChange}/> {data.sec_name}
                            </p>
                        ))}
                    </td>
                }
            </tr>
            :
            <>
                <tr>
                    <td style={{textAlign: 'left'}}>
                        {props.examDetail}
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign: 'left'}}>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                              placeholder="กรุณากรอกคำตอบ" onChange={handleSubjective} >{localStorage.getItem(props.examId)}</textarea>
                    </td>
                </tr>
            </>
        }

        </tbody>
    )
}