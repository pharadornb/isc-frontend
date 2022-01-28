import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/th'  

import '../../css/UserDashboard.css';

// import ListIcon from "../../img/list-icon.PNG"
import MoneyIcon from "../../img/money.PNG"
import PustIcon from "../../img/pust-icon.PNG"
import logo from '../../img/Thailand-company-registration.jpg';
import ThinkIcon from '../../img/think-icon.PNG';
import Moneys from '../../img/money2.PNG';
import ListIcon2 from '../../img/list-icon2.PNG';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BoxSklil from '../UserDashboard/UserDashboardBoxSklil';
import LatestEstablishmentTable from '../UserDashboard/UserDashboardEstablishmentTable';


export default function UserDashboardContent(){
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
                // console.log(res.data.skill_all);
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

      const Hello = () => {

        const a = moment().format('a');
        const h = moment().format('h');
        console.log(h);
        if(a === "ก่อนเที่ยง") {
            return "สวัสดีตอนเช้า";
        }else if(a === "หลังเที่ยง"){
            if(h >0 && h<=6)
                return "สวัสดีตอนบ่าย";
            else if(h>6 && h<=12 )
                return "สวัสดีตอนเย็น";
            else
                return "สวัสดี Error!!!";
        }else{
                return "สวัสดี Error!!!";
        }
    };
    

    return (
        <>
        <div className="row1">
            <div className="colume-right1">
                <img src={MoneyIcon} className="img1" alt="Trulli"></img>
                <label className="colume-right1-1">{datacount3.map((row)=>(row.your_wallet))}</label>
                <a href="##"><img src={PustIcon} className="img-pust" alt="Trulli"></img></a>
            </div>
            {/* <div className="colume-right2">
                <img src={ListIcon} className="img1" alt="Trulli"></img>
                <label className="colume-right1-1">{datacount3.map((row)=>(row.your_wallet))}</label>
                <a href="##"><img src={PustIcon} className="img-pust" alt="Trulli"></img></a>
            </div> */}
        </div>
        <div className="row2">
            <div className="row row2-2">
                <div className="col-md-9 mergeTxt">
                    <img className="img_design" src={logo} alt="Logo" />
                    <div className="box-txt-top">
                        <p className="seHi"><b><Hello /></b></p>
                        <p className="nameUser"><b>คุณ ภราดร บุญร่วม</b></p>
                        <p className="commentTxt"><b>iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</b></p>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="side-view">
                        {/* Slider */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 ko">
                    <div className="box-design">
                        <img className="img-think-icon" src={ThinkIcon} alt="Logo" />
                        <label className="txt-to-icon">คลังสะสมทักษะ</label>
                        <div className="row2-border">
                            {datacount1.map((row)=>(<p className="row2-txt1" key={row.skill}>{row.skill}</p>))}
                            <a href="##" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ko">
                    <div className="box-design">
                        <img className="img-think-icon" src={Moneys} alt="Logo" />
                        <label className="txt-to-icon">กระเป๋าเงิน</label>
                        <div className="row2-border">
                            {datacount3.map((row)=>(<p className="row2-txt1" key={row.your_wallet}>{row.your_wallet}</p>))}
                            <a href="##" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ko">
                    <div className="box-design">
                        <img className="img-think-icon" src={ListIcon2} alt="Logo" />
                        <label className="txt-to-icon">คลังทดสอบคงเหลือ</label>
                        <div className="row2-border">
                            {datacount2.map((row)=>(<p className="row2-txt1" key={row.your_skill}>{row.your_skill}</p>))}
                            <a href="##" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row cs">
                <div className="col-md-6">
                    <h2>คลังทักษะล่าสุด</h2>
                    <div className="box-skills-library">
                        {/*------ Box ------*/}
                        <BoxSklil/>
                        {/*-----------------*/}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>สถานประกอบการล่าสุด</h2>
                    <div className="box-latest-establishment">
                        {/*----- Table -----*/}
                        <table className="table-establishment">
                            <thead>
                                <tr>
                                    <th>สถานประกอบการ</th>
                                    <th>ตำแหน่งงาน</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <LatestEstablishmentTable/>
                        </table>
                        
                        {/*-----------------*/}
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}