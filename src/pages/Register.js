import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Navbar from "../component/homeComponent/Navbar";
import {Dropdown} from "react-bootstrap";
import RegisterCompany from "../component/registerComponet/RegisterCompany";
import RegisterUser from "../component/registerComponet/RegisterUser";

const steps = ['บัญชี', 'ข้อมูลเบื้องต้น', 'ที่อยู่'];

export default function Register() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [user, checkUser] = useState('ผู้รับบริการ');

    // const isStepOptional = (step) => {
    //     return step === 1;
    // };

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

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Navbar/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-2 mb-3 d-flex justify-content-center">
                        <h3><b>ลงทะเบียนเข้ารับบริการ :&nbsp;</b></h3>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {user}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => checkUser('ผู้รับบริการ')}>ผู้รับบริการ</Dropdown.Item>
                                <Dropdown.Item onClick={() => checkUser('ในนามบริษัท')}>ในนามบริษัท</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                                <React.Fragment>
                                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                        <Box sx={{flex: '1 1 auto'}}/>
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {user === 'ผู้รับบริการ' &&
                                        <RegisterUser/>
                                    }
                                    {user === 'ในนามบริษัท' &&
                                        <RegisterCompany/>
                                    }

                                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{mr: 1}}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{flex: '1 1 auto'}}/>
                                        {/*{isStepOptional(activeStep) && (*/}
                                        {/*    // <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>*/}
                                        {/*    //     Skip*/}
                                        {/*    // </Button>*/}
                                        {/*    <p></p>*/}
                                        {/*)}*/}

                                        <Button onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
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