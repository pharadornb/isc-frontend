import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Navbar from "../component/homeComponent/Navbar";
import {Dropdown} from "react-bootstrap";
import RegisterCompany from "../component/registerComponet/RegisterCompany";
import RegisterUser from "../component/registerComponet/RegisterUser";

const steps = ['บัญชี', 'ข้อมูลเบื้องต้น', 'ที่อยู่'];

export default function Register() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [user, checkUser] = useState('ผู้รับบริการ');

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Navbar/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-2 mb-3 d-flex justify-content-center">
                        <h3 className={'mt-1'}><b>ลงทะเบียนเข้ารับบริการ :&nbsp;</b></h3>
                        {activeStep + 1 === 1 ?
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    {user}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => checkUser('ผู้รับบริการ')}>ผู้รับบริการ</Dropdown.Item>
                                    <Dropdown.Item onClick={() => checkUser('ในนามบริษัท')}>ในนามบริษัท</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <h4 className={'mt-2'}>{user}</h4>
                        }
                    </div>
                    <div className="col-md-12">
                        <Box>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment/>
                            ) : (
                                <React.Fragment>
                                    {user === 'ผู้รับบริการ' &&
                                        <RegisterUser step={activeStep + 1}/>
                                    }
                                    {user === 'ในนามบริษัท' &&
                                        <RegisterCompany/>
                                    }
                                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center'}}>
                                        {activeStep > 0 &&
                                            <button className="btn btn-warning"
                                                    onClick={handleBack}
                                                    sx={{mr: 1}}><i className="fas fa-arrow-circle-left"/> ย้อนกลับ
                                            </button>
                                        }
                                        &nbsp;&nbsp;&nbsp;
                                        {activeStep !== steps.length - 1 &&
                                            <button className="btn btn-primary" onClick={handleNext}>&nbsp;ถัดไป <i
                                                className="fas fa-arrow-circle-right"/></button>}
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}