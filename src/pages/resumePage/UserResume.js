import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import UserDashboard from "../../component/UserDashboard";
import Button from "@mui/material/Button";
import Sidebar from '../../component/configComponent/SidebarChild';
import './UserResume.css';
import axios from 'axios';
import { Avatar } from '@mui/material';
import moment from 'moment';

export default function UserResume() {
    const {userEmail} = useParams()

    const handleClick = () => {
        sessionStorage.clear()
        window.location = '/'
    }

    const [dataNUser, setDataNUser] = useState([]);

    const UserDatas = () =>{
        try{
            axios
              .post("resume/user_profile", {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then(res => {
                if (res.status === 200) {
                    // console.log(res.data[0]);
                    setDataNUser(res.data[0]);
                }
              });
        }catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        UserDatas();
    },[]);

    const SetImage = (props) => {
        const setimgname = "data:image/jpeg;base64," + props.photoName;
        return <Avatar alt={props.uname} src={setimgname} style={{width: 200,height:200}} />;
    };
    
    const SetDateTime = (props) => {
        // console.log(props.dates);
        const yearnow = new Date().getFullYear() ;
        const byear = moment(props.dates).format('YYYY');
        const yy = yearnow-byear;
        const dd = moment(props.dates).format('DD');
        const mmmm = moment(props.dates).format('MMMM');
        const yyyy = moment(props.dates).format('YYYY');
        var yyy = parseInt(yyyy)+543;
        var mm = '';
        switch(mmmm) {
            case 'January':
                mm = 'มกราคม';
              // code block
              break;
            case 'February':
                mm = 'กุมภาพันธ์';
              // code block
              break;
            case 'March':
                mm = 'มีนาคม';
                // code block
                break;
            case 'April':
                mm = 'เมษายน';
                // code block
                break;
                case 'May':
                    mm = 'พฤษภาคม';
              // code block
              break;
            case 'June':
                mm = 'มิถุนายน';
              // code block
              break;
            case 'July':
                mm = 'กรกฎาคม';
                // code block
                break;
            case 'August ':
                mm = 'สิงหาคม';
                // code block
                break;
                case 'September':
                    mm = 'กันยายน';
                // code block
                break;
            case 'October':
                mm = 'ตุลาคม';
                // code block
                break;
                case 'November':
                    mm = 'พฤศจิกายน';
                // code block
                break;
                case 'December':
                    mm = 'ธันวาคม';
                // code block
                break;
            default:
              // code block
          }

        const birthday = "เกิดวันที่ " + dd + " " + mm + " " + yyy + ", อายุ " + yy + " ปี";
        //console.log(birthday.toString());
        return birthday.toString();
    };
    

    return(
        <Sidebar>
            {!userEmail &&
                <div className='bg-resume'>
                    <p>UserResume</p>
                    <div className='div-1'>

                    </div>
                    <div className='row div-2'>
                        <div className='col-md-6 div2-1'>
                            {/* box left */}
                            <div className='row div21-1'>
                                <div className='col-md-5 div211-1'>
                                    {/* image user */}
                                    <SetImage photoName={dataNUser.user_profile} uname={dataNUser.us_firstname} />
                                </div>
                                <div className='col-md-7 div211-2 '>
                                    <div className='row div2112-1 w'>
                                        {/* firstname */}
                                        <h1>{dataNUser.us_firstname}</h1>
                                    </div>
                                    <div className='row div2112-1 w'>
                                        {/* lasttname */}
                                        <h1>{dataNUser.us_lastname}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='row div22-1 sl'>
                                {/* คำขวัญ */}
                                <div className='col-12 w center'>{dataNUser.user_slogan}</div>
                            </div>
                            <div className='row div22-2 la'>
                                {/* วันเกิด */}
                                <div className='col-1'><i className="fas fa-birthday-cake w"></i></div>
                                <div className='col-11 w'>
                                    <SetDateTime dates={dataNUser.user_dob} />
                                </div>
                            </div>
                            <div className='row div22-2 la'>
                                <div className='col-1'><i className="fas fa-envelope w"></i></div>
                                {/* อีเมล */}
                                <div className='col-11 w'>{dataNUser.user_email}</div>
                            </div>
                            <div className='row div22-2 la'>
                                <div className='col-1'><i className="fas fa-phone-alt w"></i></div>
                                {/* เบอร์โทร */}
                                <div className='col-11 w'>{dataNUser.user_tel}</div>
                            </div>
                            <div className='row div22-2 la'>
                                <div className='col-1'><i className="fas fa-map-marker-alt w"></i></div>
                                <div className='col-11 w'>
                                    <b>ที่อยู่ปัจจุบัน : </b>
                                    <label>{dataNUser.us_com_address}&nbsp;</label>
                                    <label>ตำบล {dataNUser.user_subdistrict}&nbsp;</label>
                                    <label>อำเภอ {dataNUser.user_district}&nbsp;</label>
                                    <label>จังหวัด {dataNUser.user_province}&nbsp;&nbsp;</label>
                                    <label>รหัสไปรษณีย์ {dataNUser.user_postcode}&nbsp;</label>
                                </div>
                            </div>
                            <div className='row div22-2 la'>
                                <div className='col-1'><i className="fas fa-map-marker-alt w"></i></div>
                                <div className='col-11 w'>
                                    <b>ภูมิลำเนา : </b>
                                    <label>{dataNUser.us_com_address}&nbsp;</label>
                                    <label>ตำบล {dataNUser.us_com_subdistrict}&nbsp;</label>
                                    <label>อำเภอ {dataNUser.us_com_district}&nbsp;</label>
                                    <label>จังหวัด {dataNUser.us_com_province}&nbsp;&nbsp;</label>
                                    <label>รหัสไปรษณีย์ {dataNUser.us_com_postcode}&nbsp;</label>
                                </div>
                            </div>
                            <div className='row div22-2 la'>
                                <div className='col-12 w b'>Social</div>
                                <div className='row'>
                                    {/* facebook */}
                                    <a className='col-6' id='1' href={dataNUser.us_com_facebook}>
                                        <i className="fab fa-facebook w"></i>
                                        <label className='w ml'>facebook</label>
                                    </a>
                                    {/* youtube */}
                                    <a className='col-6' href={dataNUser.us_com_youtube}>
                                        <i className="fab fa-youtube w"></i>
                                        <label className='w ml'>youtube</label>
                                    </a>
                                    {/* github */}
                                    <a className='col-6' href={dataNUser.us_com_github}>
                                        <i className="fab fa-github w"></i>
                                        <label className='w ml'>github</label>
                                    </a>
                                    {/* linkedin */}
                                    <a className='col-6' href={dataNUser.us_com_linkedin}>
                                        <i className="fab fa-linkedin w"></i>
                                        <label className='w ml'>linkedin</label>
                                    </a>
                                </div>
                            </div>
                            <div className='row la'>
                                <div className='col-12 w'><b>Education</b></div>
                                <div className='col-12'>
                                    {/* map data study */}
                                    <label className='w'><b>Bachelor of Engineering in Information Technology</b></label>
                                    <p className='w'>Suranaree University of Technology, Nakhonrachasima</p>
                                    <label className='gray'>GPAX : 3.22 Year of study : 2011- Present</label>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-6 div2-2'>
                            {/* box right */}
                            <div className='div22-1'>
                                <label className='bgs'>EXPERIENCE</label>
                                <div className='line' />
                            </div>
                            <div className='div22-11'>
                                <p className='b'>Blue Moon Consultency Studio, Bankok</p>
                                <label>Seniour UI designer</label><br/>
                                <label className='gray'>Aug 2020 - Present - 1 Year</label><br/>
                                <label>Product team to prototype, 
                                    design and deliver the UI and UX experience with a lean design process: research, 
                                    design, test, and iterate.</label>
                            </div>
                            <div className='div22-1 div22-11'>
                                <label className='bgs'>SKILLS COLLECT</label>
                                <div className='line' />
                            </div>
                        </div>

                    </div>

                </div>
            }
            {userEmail &&
                <>
                    <UserDashboard/>
                    <Button variant="contained" onClick={() => handleClick()}>Logout</Button>
                    <p>UserResume : {userEmail}</p>
                </>
            }
        </Sidebar>
    )
}