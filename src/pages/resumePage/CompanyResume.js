import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Sidebar from "../../component/configComponent/SidebarChild";
import './CompanyResume.css';
import { ModeEdit, Apartment, Email, Language, Call, LocationOn } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialogSlide from './CompanyDialogSlide';

// import Loading from '../../component/Loading';
import ProgressbarSkills from './CompanyProgressbarSkills';



export default function CompanyResume() {
    const {userEmail} = useParams();

    const [companyProfileGeneral, setCompanyProfileGeneral] = useState([]);
    const [companyPositionRequire, setCompanyPositionRequire] = useState([]);
    

   

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    const SelectCompanyData = () => {

        // companyProfileGeneral --------------

        try {
            axios
              .post("resume/companyProfileGeneral", {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                if (res.status === 200) {
                //   console.log(res.data[0]);
                  setCompanyProfileGeneral(res.data[0]);
                  setLoading1(true);
                }
              });
          } catch (err) {
            console.log(err);
          }

        //   companyPositionRequire--------------------------

          try {
            axios
              .post("resume/companyPositionRequire", {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                if (res.status === 200) {
                //   console.log(res.data);
                  setCompanyPositionRequire(res.data);
                  setLoading2(true);
                }
              });
          } catch (err) {
            console.log(err);
          }

          

          // End funtion SelectCompanyData --------------------------------------------------------
    }

    useEffect(() => {
        SelectCompanyData();
    },[]);

    const ImageLogoCompany = (props) => {
        var user_profile = "";
        if(props.user_profile){
            user_profile = "data:image/jpeg;base64," + props.user_profile;
        }

        return(
            <>
                <Avatar alt={props.uc_name} src={user_profile} sx={{ width: 300, height: 300 }} className="AvatarLogo" />
            </>
        )
    }

    

    const DobCompany = (props) => {
        const dob = props.user_dob;
        var datedob = moment(dob).format("DD MMMM YYYY");
        const dates = new Date().getFullYear();
        var oldYear = parseInt(dates) - parseInt(moment(dob).format("YYYY"));
        return(
            <>{datedob}, {oldYear} year old</>
        )
    }

    

    return (
        <Sidebar mark={'company_resume'}>
            {!userEmail &&
                <>
                    <p>Company resume page</p>
                    {/*<UserDashboard/>*/}
                    {/*<Button variant="contained" onClick={() => handleClick()}>Logout</Button>*/}
                    {/*<p>CompanyResume : {userEmail}</p>*/}

                    <div className='bg-company-resume'>
                        {/* {loading === false && <Loading />} */}
                        {/* Part 1 */}
                        <div className='box-edit'><button className='Cbtns'><ModeEdit className='edit-pen' /> แก้ไข้</button></div>
                        <div className='left-48' />
                        <div className='both' />

                        <div className="container">
                            {/* Part 2 */}
                            <div className='row'>
                                <div className='col-4 corner'><ImageLogoCompany uc_name={companyProfileGeneral.user_profile} user_profile={companyProfileGeneral.user_profile} /></div>
                                <div className='col-8 corner'>
                                    <div className='Cbox-text'>
                                        <div className='text-message1'>{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.uc_name}</div>
                                        <div className='text-message2'>“{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.user_slogan}”</div>
                                    </div>
                                </div>
                            </div>
                            {/* Part 3 */}
                            <div className='row'>
                                <div className='col-1' />
                                <div className='col-4 left-Cbox'>
                                    <div className='row align20'>
                                        <div className='col-2'><Apartment fontSize="large" className='scol' /></div>
                                        <div className='col-10'><div className='scol'>{loading1 === false && <CircularProgress disableShrink />}<DobCompany user_dob={companyProfileGeneral.user_dob} /></div></div>
                                    </div>
                                    <div className='row align20'>
                                        <div className='col-2'><Email fontSize="large" className='scol' /></div>
                                        <div className='col-10'><div className='scol'>{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.user_email}</div></div>
                                    </div>
                                    <div className='row align20'>
                                        <div className='col-2'><Call fontSize="large" className='scol' /></div>
                                        <div className='col-10'><div className='scol'>{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.user_tel},{companyProfileGeneral.uc_fax}</div></div>
                                    </div>
                                    <div className='row align20'>
                                        <div className='col-2'><Language fontSize="large" className='scol' /></div>
                                        <div className='col-10'><div className='scol'>{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.uc_website}</div></div>
                                    </div>
                                    <div className='row align20'>
                                        <div className='col-2'><LocationOn fontSize="large" className='scol' /></div>
                                        <div className='col-10'>
                                            <div className='scol'>{loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.user_address} {companyProfileGeneral.user_adduser_subdistrictress} {companyProfileGeneral.user_district} {companyProfileGeneral.user_province} {companyProfileGeneral.user_postcode}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 left-Cbox'>
                                    <div className='scol align20'>
                                    {loading1 === false && <CircularProgress disableShrink />}{companyProfileGeneral.uc_detail}
                                    </div>
                                </div>
                                <div className='col-1' />
                            </div>
                        </div>
                        <div className="container magintop">
                            {/* Part 4 */}
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='Cbox-title-bg'>
                                        <p className='box-title'>Position require</p>
                                        <div className='lineC' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row magin-top80-bottom40-paddig20' >
                            {companyPositionRequire.map((row, index) => (
                                    <div className='col-12 bg-while' key={index}>
                                    <div className="container ">
                                        <div className='row '>
                                            <div className='col-6'>
                                                <div className='textTitle'>{row.ucre_occupation}</div>
                                                <div className='textMessage'><b>รายละเอียด:</b> {row.ucre_detail}</div>
                                            </div>
                                            <div className='col-6'>
                                                <div className='float-right maginBottom20'><b>Skill Require</b></div>
                                                <div className='both1' />
                                                <ProgressbarSkills ucre_id={row.ucre_id} index={index} />
                                                <div className='both1' />
                                                <AlertDialogSlide companyPositionRequire={companyPositionRequire[index]} uc_name={companyProfileGeneral.uc_name} />
                                                <div className='both1' />
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                            ))}
                            </div>
                            
                        </div>
                    </div>
                </>
            }
            {userEmail &&
                <>
                    {/*<UserDashboard/>*/}
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>CompanyResume : {userEmail}</p>
                </>
            }
        </Sidebar>
    )
}