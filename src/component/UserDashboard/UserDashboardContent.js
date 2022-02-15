import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../css/UserDashboard.css";
import logo from "../../img/Thailand-company-registration.jpg";
import ThinkIcon from "../../img/think-icon.PNG";
import Moneys from "../../img/money2.PNG";
import ListIcon2 from "../../img/list-icon2.PNG";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import BoxSklil from "../UserDashboard/UserDashboardBoxSklil";
import LatestEstablishmentTable from "../UserDashboard/UserDashboardEstablishmentTable";

export default function UserDashboardContent() {
  const [datacount1, setDatacount1] = useState([]);
  const [datacount2, setDatacount2] = useState([]);
  const [datacount3, setDatacount3] = useState([]);

  const UpdateCount = () => {
    try {
      axios
        .post("summarize_user/count", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.skill_all[0]);
            setDatacount1(res.data.skill_all[0]);
            setDatacount2(res.data.your_skill_sum[0]);
            setDatacount3(res.data.your_wallet_sum[0]);
          }
        });
      // setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UpdateCount();
  }, []);

  const Hello = () => {
    const a = moment().format("a");
    const h = moment().format("h");
    // console.log(h);
    if (a === "am") {
      return "สวัสดีตอนเช้า";
    } else if (a === "pm") {
      if (h > 0 && h <= 6) return "สวัสดีตอนบ่าย";
      else if (h > 6 && h <= 12) return "สวัสดีตอนเย็น";
      else return "สวัสดี Error!!!";
    } else {
      return "สวัสดี Error!!!";
    }
  };

  return (
    <div className="row2">
      <div className="container ">
        <div className="row row2-2">
          <div className="col-md-12 col-lg-9 mergeTxt">
            <img className="img_design" src={logo} alt="Logo" />
            <div className="box-txt-top">
              <p className="seHi">
                <b>
                  <Hello />
                </b>
              </p>
              <p className="nameUser">
                <b>คุณ ภราดร บุญร่วม</b>
              </p>
              <p className="commentTxt">
                <b>iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</b>
              </p>
            </div>
          </div>
          <div className="col-md-12 col-lg-3">
            <div className="side-view">{/* Slider */}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-4 paddin20">
            <div className="box-design">
              <img className="img-think-icon" src={ThinkIcon} alt="Logo" />
              <label className="txt-to-icon">คลังสะสมทักษะ</label>
              <div className="row2-border">
                <p className="row2-txt1">{datacount1.skill}</p>
                <a href="##" className="row2-a">
                  <ArrowForwardIosIcon style={{ fontSize: 50 }} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 paddin20">
            <div className="box-design ">
              <img className="img-think-icon" src={Moneys} alt="Logo" />
              <label className="txt-to-icon">กระเป๋าเงิน</label>
              <div className="row2-border">
                  <p className="row2-txt1" key={datacount3.your_wallet}>
                    {datacount3.your_wallet}
                  </p>
                <a href="##" className="row2-a">
                  <ArrowForwardIosIcon style={{ fontSize: 50 }} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 paddin20">
            <div className="box-design">
              <img className="img-think-icon" src={ListIcon2} alt="Logo" />
              <label className="txt-to-icon">คลังทดสอบคงเหลือ</label>
              <div className="row2-border">
                  <p className="row2-txt1" key={datacount2.your_skill}>
                    {datacount2.your_skill}
                  </p>
                <a href="##" className="row2-a">
                  <ArrowForwardIosIcon style={{ fontSize: 50 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <h2>คลังทักษะล่าสุด</h2>
            <div className="box-skills-library">
              {/*------ Box ------*/}
              <BoxSklil />
              {/*-----------------*/}
            </div>
          </div>

          <div className="col-md-12 col-lg-6">
            <h2>สถานประกอบการล่าสุด</h2>
            <div className="box-latest-establishment overflow-auto">
              {/*----- Table -----*/}
              <table className="table-establishment ">
                <thead>
                  <tr>
                    <th>สถานประกอบการ</th>
                    <th>ตำแหน่งงาน</th>
                    <th></th>
                  </tr>
                </thead>
                <LatestEstablishmentTable />
              </table>
              {/*-----------------*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
