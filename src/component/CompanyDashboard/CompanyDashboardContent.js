import React, { useState, useEffect } from "react";
import axios from "axios";


import '../../css/CompanyDashboard.css';

import AddIcon from '../../img/Add.png';
import TimeIcon from '../../img/Time.png';
import BugIcon from '../../img/Wallet.png';
import bgShow from '../../img/morning 1.png';

import CommunicationSkillIcon from '../../img/think-icon.PNG';
import MorningIcon from '../../img/money2.PNG';
import TimeIcon2 from '../../img/Time2.png';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CompanySelectionCriteria from './CompanySelectionCriteria';
import ServiceResult from './CompanyServiceResult';

export default function CompanyDashboardContent(){

    const [datacount1, setDatacount1] = useState([]);
    const [datacount2, setDatacount2] = useState([]);
    const [datacount3, setDatacount3] = useState([]);

    const UpdateCount = () => {
        try{
            axios
            .post("summarize_user/count", {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(res => {
              if (res.status === 200) {
                console.log(res.data.skill_all);
                setDatacount1(res.data.skill_all);
                setDatacount2(res.data.your_skill_sum);
                setDatacount3(res.data.your_wallet_sum);
              }
            });
            // setLoading(true);
        }catch (err){
            
            console.log(err);
        }
    }

    useEffect(() => {
        UpdateCount();
      },[]);
    

    return(
        <>
            <div className="boxC-01">
                <img src={TimeIcon} alt="Trulli"></img>
                <label className="txt1-1"><p>22:22:3</p></label>
                <img src={AddIcon} alt="Trulli"></img>
                <img src={BugIcon} alt="Trulli"></img>
                <label className="txt1-1"><p>200</p></label>
                <img src={AddIcon} alt="Trulli"></img>
            </div>

            <div className="boxC-02">
                <div className="boxC-02-00">
                    <img src={bgShow} className="boxC-02-01" alt="Trulli"></img>
                    <div className="boxC-02-01-00">
                        <label className="boxC-02-01-txt1">สวัสดีตอนเช้า</label><br></br>
                        <label className="boxC-02-01-txt2">บริษัท ไอเอสซี จำกัด</label><br></br>
                        <label className="boxC-02-01-txt3">iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={CommunicationSkillIcon} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>คลังทักษะสร้าง</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount1.map((row)=>(row.skill))}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}}  /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={MorningIcon} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>คลังสะสมทักษะของคุณ</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount2.map((row)=>(row.your_skill))}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={TimeIcon2} className="inBoxC101" alt="Trulli"></img>
                                <label className="inBoxC102"><b>กระเป๋าเงิน</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>{datacount3.map((row)=>(row.your_wallet))}</b></label>
                                <a href="##" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="boxC-03">
                    <div className="row">
                        <div className="col-md-5">
                            <p className="boxC03_htxt">ผ่านเกณฑ์คัดเลือก</p>
                            <div className="boxC03_inbox">
                                <div className="row">
                                    <CompanySelectionCriteria/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
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