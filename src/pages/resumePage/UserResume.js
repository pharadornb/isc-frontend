import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDashboard from "../../component/UserDashboard";
import Button from "@mui/material/Button";
import Sidebar from "../../component/configComponent/SidebarChild";
import "./UserResume.css";
import axios from "axios";
import { Avatar } from "@mui/material";
import moment from "moment";
import "moment/locale/en-au";

import CustomContentProgressbar from "./CustomContentProgressbar";
import AlertDialogSlide from "./AlertDialogSlide";

import Logo from "../../img/logo2.PNG";

export default function UserResume() {
  const { userEmail } = useParams();

  const handleClick = () => {
    sessionStorage.clear();
    window.location = "/";
  };

  const [dataNUser, setDataNUser] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const UserDatas = () => {
    try {
      axios
        .post("resume/user_profile", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data[0]);
            setDataNUser(res.data[0]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const Education = () => {
    try {
      axios
        .post("resume/user_education", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setEducation(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const Experience = () => {
    try {
      axios
        .post("resume/user_experince", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setExperience(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserDatas();
    Education();
    Experience();
  }, []);

  const SetDateTime = (props) => {
    // console.log(props.dates);
    const yearnow = new Date().getFullYear();
    const byear = moment(props.dates).format("YYYY");
    const yy = yearnow - byear;
    const dd = moment(props.dates).format("DD");
    const mmmm = moment(props.dates).format("MMMM");
    const yyyy = moment(props.dates).format("YYYY");
    var yyy = parseInt(yyyy) + 543;
    var mm = "";
    switch (mmmm) {
      case "January":
        mm = "มกราคม";
        // code block
        break;
      case "February":
        mm = "กุมภาพันธ์";
        // code block
        break;
      case "March":
        mm = "มีนาคม";
        // code block
        break;
      case "April":
        mm = "เมษายน";
        // code block
        break;
      case "May":
        mm = "พฤษภาคม";
        // code block
        break;
      case "June":
        mm = "มิถุนายน";
        // code block
        break;
      case "July":
        mm = "กรกฎาคม";
        // code block
        break;
      case "August ":
        mm = "สิงหาคม";
        // code block
        break;
      case "September":
        mm = "กันยายน";
        // code block
        break;
      case "October":
        mm = "ตุลาคม";
        // code block
        break;
      case "November":
        mm = "พฤศจิกายน";
        // code block
        break;
      case "December":
        mm = "ธันวาคม";
        // code block
        break;
      default:
      // code block
    }

    const birthday =
      "เกิดวันที่ " + dd + " " + mm + " " + yyy + ", อายุ " + yy + " ปี";
    //console.log(birthday.toString());
    return birthday.toString();
  };

  const DateStartEnd = (props) => {
    const mmmm1 = moment(props.start).format("MMMM");
    const yyyy1 = moment(props.start).format("YYYY");
    const mmmm2 = moment(props.end).format("MMMM");
    const yyyy2 = moment(props.end).format("YYYY");
    var sumy = parseInt(yyyy2) - parseInt(yyyy1);
    var massage =
      mmmm1 +
      " " +
      yyyy1 +
      " - " +
      mmmm2 +
      " " +
      yyyy2 +
      " - " +
      sumy +
      " year ";

    // while (condition) {

    // }

    return massage.toString();
  };



  return (
    <Sidebar>
      {!userEmail && (
        <div className="bg-resume">
          {/* <p>UserResume</p> */}
          <div className="div-1">
            <div className="d11">
              <button className="btns">
                <i className="fas fa-file-pdf"></i> ดาวน์โหลด
              </button>
              <AlertDialogSlide />
            </div>
            <div className="d12">
              <label className="w b mg">Created by :</label>
              <img alt="logo2" className="sl" src={Logo} />
              <label className="b w mg">Serial key :</label>
              <label className="w lbd12 mg">{dataNUser.user_key}</label>
            </div>
            <a
              href="https://isc-service.azurewebsites.net/user_resume"
              className="w lin"
            >
              https://isc-service.azurewebsites.net/user_resume
            </a>
          </div>
          <div className="goo"></div>
          <div className="row div-2">
            <div className="col-md-6 div2-1">
              {/* box left */}
              <div className="row div21-1">
                <div className="col-md-5 div211-1">
                  {/* image user */}
                  <Avatar
                    alt="iT"
                    src={`data:image/jpeg;base64,${dataNUser.user_profile}`}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
                <div className="col-md-7 div211-2 ">
                  <div className="row div2112-1 w">
                    {/* firstname */}
                    <h1>{dataNUser.us_firstname}</h1>
                  </div>
                  <div className="row div2112-1 w">
                    {/* lasttname */}
                    <h1>{dataNUser.us_lastname}</h1>
                  </div>
                </div>
              </div>
              <div className="row div22-1 ">
                {/* คำขวัญ */}
                <h4 className="col-12 w center slogan">
                  {dataNUser.user_slogan}
                </h4>
              </div>
              <div className="row div22-2 la">
                {/* วันเกิด */}
                <div className="col-1">
                  <i className="fas fa-birthday-cake w"></i>
                </div>
                <div className="col-11 w">
                  <SetDateTime dates={dataNUser.user_dob} />
                </div>
              </div>
              <div className="row div22-2 la">
                <div className="col-1">
                  <i className="fas fa-envelope w"></i>
                </div>
                {/* อีเมล */}
                <div className="col-11 w">{dataNUser.user_email}</div>
              </div>
              <div className="row div22-2 la">
                <div className="col-1">
                  <i className="fas fa-phone-alt w"></i>
                </div>
                {/* เบอร์โทร */}
                <div className="col-11 w">{dataNUser.user_tel}</div>
              </div>
              <div className="row div22-2 la">
                <div className="col-1">
                  <i className="fas fa-map-marker-alt w"></i>
                </div>
                <div className="col-11 w">
                  <b>ที่อยู่ปัจจุบัน : </b>
                  <label>{dataNUser.us_com_address}&nbsp;</label>
                  <label>ตำบล {dataNUser.user_subdistrict}&nbsp;</label>
                  <label>อำเภอ {dataNUser.user_district}&nbsp;</label>
                  <label>จังหวัด {dataNUser.user_province}&nbsp;&nbsp;</label>
                  <label>รหัสไปรษณีย์ {dataNUser.user_postcode}&nbsp;</label>
                </div>
              </div>
              <div className="row div22-2 la">
                <div className="col-1">
                  <i className="fas fa-map-marker-alt w"></i>
                </div>
                <div className="col-11 w">
                  <b>ภูมิลำเนา : </b>
                  <label>{dataNUser.us_com_address}&nbsp;</label>
                  <label>ตำบล {dataNUser.us_com_subdistrict}&nbsp;</label>
                  <label>อำเภอ {dataNUser.us_com_district}&nbsp;</label>
                  <label>จังหวัด {dataNUser.us_com_province}&nbsp;&nbsp;</label>
                  <label>รหัสไปรษณีย์ {dataNUser.us_com_postcode}&nbsp;</label>
                </div>
              </div>
              <div className="row div22-2 la">
                <h4 className="col-12 w b">Social</h4>
                <div className="row">
                  {/* facebook */}
                  <a
                    className="col-6"
                    id="1"
                    href={
                      "https://www.facebook.com/" + dataNUser.us_com_facebook
                    }
                  >
                    <i className="fab fa-facebook w"></i>
                    <label className="w ml">{dataNUser.us_com_facebook}</label>
                  </a>
                  {/* youtube */}
                  <a
                    className="col-6"
                    href={
                      "https://www.youtube.com/channel/" +
                      dataNUser.us_com_youtube
                    }
                  >
                    <i className="fab fa-youtube w"></i>
                    <label className="w ml">{dataNUser.us_com_youtube}</label>
                  </a>
                  {/* github */}
                  <a
                    className="col-6"
                    href={"https://github.com/" + dataNUser.us_com_github}
                  >
                    <i className="fab fa-github w "></i>
                    <label className="w ml">{dataNUser.us_com_github}</label>
                  </a>
                  {/* linkedin */}
                  <a
                    className="col-6"
                    href={
                      "https://www.linkedin.com/in/" + dataNUser.us_com_linkedin
                    }
                  >
                    <i className="fab fa-linkedin w"></i>
                    <label className="w ml">{dataNUser.us_com_linkedin}</label>
                  </a>
                </div>
              </div>
              <div className="row la">
                <h4 className="col-12 w">
                  <b>Education</b>
                </h4>
                {education.map((row) => (
                  <div className="col-12" key={row.usl_id}>
                    <p />
                    {/* map data study */}
                    <label className="w">
                      <b>{row.usl_name}</b>
                    </label>
                    <p className="w">{row.usl_at}</p>
                    <label className="gray">
                      GPAX : {row.usl_gpax} Year of study : {row.usl_end}-{" "}
                      {row.usl_province}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6 div2-2">
              {/* box right */}
              <div className="div22-1">
                <h4 className="bgs">EXPERIENCE</h4>
                <div className="line" />
              </div>
              {experience.map((row) => (
                <div className="div22-11" key={row.use_id}>
                  <p className="b">
                    {row.use_company}, {row.use_province}
                  </p>
                  <label>{row.use_occupation}</label>
                  <br />
                  <label className="gray">
                    <DateStartEnd start={row.use_start} end={row.use_end} />
                  </label>
                  <br />
                  <label>{row.use_job_detail}</label>
                </div>
              ))}
              <div className="div22-1 div22-11">
                <h4 className="bgs">SKILLS COLLECT</h4>
                <div className="line" />
              </div>
              <div>
                <p className="b">Prototype and design</p>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <CustomContentProgressbar percentage={92.52}>
                    <div>
                      <img
                        height={50}
                        alt="logo"
                        src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png"
                      />
                    </div>
                  </CustomContentProgressbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {userEmail && (
        <>
          <UserDashboard />
          <Button variant="contained" onClick={() => handleClick()}>
            Logout
          </Button>
          <p>UserResume : {userEmail}</p>
        </>
      )}
    </Sidebar>
  );
}