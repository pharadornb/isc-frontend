import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/CompanyDashboard.css';
import bgShow from '../../img/morning 1.png';
import CommunicationSkillIcon from '../../img/think-icon.PNG';
import MorningIcon from '../../img/money2.PNG';
import TimeIcon2 from '../../img/Time2.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CompanySelectionCriteria from './CompanySelectionCriteria';
import ServiceResult from './CompanyServiceResult';
import moment from 'moment';
import 'moment/locale/th';

export default function CompanyDashboardContent(){

    const [datacount1, setDatacount1] = useState([]);
    const [datacount2, setDatacount2] = useState([]);
    const [datacount3, setDatacount3] = useState([]);

    const UpdateCount = () => {
        try{
            axios
            .post("summarize_company/count", {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(res => {
              if (res.status === 200) {
                // console.log(res.data);
                setDatacount1(res.data.skill_data[0].skill);
                setDatacount2(res.data.your_skill_data[0].your_skill);
                setDatacount3(res.data.your_wallet_data[0].your_wallet);
              }
            });
            // setLoading(true);
        }catch (err){
            
            console.log(err);
        }
    }

    const Hello = () => {
        const a = moment().format('a');
        const h = moment().format('h');
        console.log(h);
        if(a === "am") {
            return "สวัสดีตอนเช้า";
        }else if(a === "pm"){
            if(h >0 && h<=6)
                return "สวัสดีตอนบ่าย";
            else if(h>6 && h<=12 )
                return "สวัสดีตอนเย็น";
            else
                return "สวัสดี Error!!!";
        }else{
                return "สวัสดี Error!!!";
        }
        // console.log(parseInt(hh));
    };

    useEffect(() => {
        UpdateCount();
      },[]);
    


    return(
        <>
            <div className="boxC-02">
                <div className="boxC-02-00">
                    <img src={bgShow} className="boxC-02-01" alt="Trulli"></img>
                    <div className="boxC-02-01-00">
                        <label className="boxC-02-01-txt1"><Hello /></label><br></br>
                        <label className="boxC-02-01-txt2">บริษัท ไอเอสซี จำกัด</label><br></br>
                        <label className="boxC-02-01-txt3">iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={CommunicationSkillIcon} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>คลังทักษะสร้าง</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount1}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}}  /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4  ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={MorningIcon} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>คลังสะสมทักษะของคุณ</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount2}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4  ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={TimeIcon2} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>กระเป๋าเงิน</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount3}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="boxC-03">
                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <p className="boxC03_htxt">ผ่านเกณฑ์คัดเลือก</p>
                            <div className="boxC03_inbox">
                                <div className="row">
                                    <CompanySelectionCriteria/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <p className="boxC03_htxt">ผลการรับบริการ</p>
                            <div className="rw">
                                <ServiceResult/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}