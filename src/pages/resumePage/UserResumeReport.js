import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import moment from "moment";
import "moment/locale/en-au";

import { Button, Modal,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomContentProgressbar from "./CustomContentProgressbar";
// import AlertDialogSlide from "./AlertDialogSlide";
import CircularProgress from "@mui/material/CircularProgress";

// import Logo from "../../img/logo2.PNG";

export default function UserResumeReport(props) {
  const [dataNUser, setDataNUser] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skilltypes, setSkillTypes] = useState([]);
  const [userSkill, setUserSkill] = useState([]);

  const [show, setShow] = useState(false);
  const [dataSkill, setDataSkill] = useState([])

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  useEffect(() => {
    const UserDatas = () => {
      const params = JSON.stringify({
        serialKey: props.userEmail,
      });

      try {
        axios
          .post("resume/user_profile", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data[0]);
              setDataNUser(res.data[0]);
              setLoading(true);
            }
          });
      } catch (err) {
        console.log(err);
        setLoading(true);
      }

      try {
        axios
          .post("resume/user_education", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data);
              setEducation(res.data);
              setLoading1(true);
            }
          });
      } catch (err) {
        console.log(err);
        setLoading1(true);
      }

      try {
        axios
          .post("resume/user_experince", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data);
              setExperience(res.data);
              setLoading2(true);
            }
          });
      } catch (err) {
        console.log(err);
        setLoading2(true);
      }

      try {
        axios
          .post("skill/skill_types", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data);
              setSkillTypes(res.data);
              setLoading3(true);
            }
          });
      } catch (err) {
        console.log(err);
        setLoading3(true);
      }

      try {
        axios
          .post("skill/userSkill", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data);
              setUserSkill(res.data);
              setLoading4(true);
            }
          });
      } catch (err) {
        console.log(err);
        setLoading4(true);
      }
    };

    UserDatas();
  }, [props.userEmail]);

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
    return massage.toString();
  };

  const AvatarImage = (props) => {
    const profile = props.user_profile;
    var user_profile = "";

    if (profile) {
      user_profile = "data:image/jpeg;base64," + profile;
    }
    return (
      <>
        <Avatar
          alt={props.us_firstname}
          src={user_profile}
          sx={{ width: 200, height: 200 }}
        />
      </>
    );
  };

  
  const handleClose = () => setShow(false);

async function onCheckDataSkills (n) {
  console.log(n + " " + props.userEmail);

  if(n !== null && props.userEmail !== ''){
    const params = JSON.stringify({
      skill_id: n,
      user_key: props.userEmail
    });
    // console.log(params)

    try {
     await axios
        .post("skill/viewSkillUser", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setDataSkill(res.data);
            // setLoading4(true);
            setShow(true);
            return dataSkill;
          }
        });
    } catch (err) {
      console.log(err);
    }
  }



}

  return (
    <div className="bg-resume">
     <div className="goo" />
      <div className="container">
        <div className="row div-2">
          <div className="col-md-6 div2-1">
            {/* box left */}
            <div className="row div21-1">
              <div className="col-md-5 div211-1">
                {/* image user */}
                {loading === false && <CircularProgress />}
                {loading === true && (
                  <AvatarImage
                    us_firstname={dataNUser.us_firstname}
                    user_profile={dataNUser.user_profile}
                  />
                )}
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
                <i className="fas fa-birthday-cake w" />
              </div>
              <div className="col-11 w">
                <SetDateTime dates={dataNUser.user_dob} />
              </div>
            </div>
            <div className="row div22-2 la">
              <div className="col-1">
                <i className="fas fa-envelope w" />
              </div>
              {/* อีเมล */}
              <div className="col-11 w">{dataNUser.user_email}</div>
            </div>
            <div className="row div22-2 la">
              <div className="col-1">
                <i className="fas fa-phone-alt w" />
              </div>
              {/* เบอร์โทร */}
              <div className="col-11 w">{dataNUser.user_tel}</div>
            </div>
            <div className="row div22-2 la">
              <div className="col-1">
                <i className="fas fa-map-marker-alt w" />
              </div>
              <div className="col-11 w">
                <b>ที่อยู่ปัจจุบัน : </b>
                <label>{dataNUser.user_address}&nbsp;</label>
                <label>ตำบล {dataNUser.user_subdistrict}&nbsp;</label>
                <label>อำเภอ {dataNUser.user_district}&nbsp;</label>
                <label>จังหวัด {dataNUser.user_province}&nbsp;&nbsp;</label>
                <label>รหัสไปรษณีย์ {dataNUser.user_postcode}&nbsp;</label>
              </div>
            </div>
            <div className="row div22-2 la">
              <div className="col-1">
                <i className="fas fa-map-marker-alt w" />
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
                  href={"https://www.facebook.com/" + dataNUser.us_com_facebook}
                >
                  <i className="fab fa-facebook w" />
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
                  <i className="fab fa-youtube w" />
                  <label className="w ml">{dataNUser.us_com_youtube}</label>
                </a>
                {/* github */}
                <a
                  className="col-6"
                  href={"https://github.com/" + dataNUser.us_com_github}
                >
                  <i className="fab fa-github w " />
                  <label className="w ml">{dataNUser.us_com_github}</label>
                </a>
                {/* linkedin */}
                <a
                  className="col-6"
                  href={
                    "https://www.linkedin.com/in/" + dataNUser.us_com_linkedin
                  }
                >
                  <i className="fab fa-linkedin w" />
                  <label className="w ml">{dataNUser.us_com_linkedin}</label>
                </a>
              </div>
            </div>
            <div className="row la">
              <h4 className="col-12 w">
                <b>Education</b>
              </h4>
              {education.length !== 0 ? (
                loading1 === false && (
                  <>
                    <br />
                    <br />
                    <CircularProgress />
                  </>
                )
              ) : (
                <p>ไม่มีข้อมูล</p>
              )}
              {education.map((row) => (
                <div className="col-12" key={row.usl_id}>
                  {/* <p /> */}
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
              <div>
                {" "}
                <br />
                <br />
              </div>
              {/* box EXPERIENCE */}
              <div className="div22-1">
                <h4 className="bgs topTitle2">EXPERIENCE</h4>
                <div className="line" />
              </div>
              <div>
                {" "}
                <br />
                <br />
              </div>
              <div>
                {experience.length !== 0 ? (
                  loading2 === false && (
                    <>
                      <br />
                      <br />
                      <CircularProgress />
                    </>
                  )
                ) : (
                  <p>ไม่มีข้อมูล</p>
                )}
              </div>
              {experience.map((row) => (
                <div className="setMarginEx" key={row.use_id}>
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
            </div>
          </div>
          <div className="col-md-6 div2-2">
            <div className="div22-1 div22-11">
              <h4 className="bgs topTitle">SKILLS COLLECT</h4>
              <div className="line" />
            </div>
            <div>{loading3 === false && <CircularProgress />}</div>
            <div className="row ">
              {skilltypes.map((row1) => (
                <div key={row1.skill_type_id} className="col-12">
                  <br />
                  <label className="b txttitle">{row1.skill_type_name}</label>
                  <br />
                  <br />
                  {loading4 === false && <CircularProgress />}
                  <div className="row">
                    {userSkill.map(
                      (row2) =>
                        row1.skill_type_name === row2.skill_type_name &&
                        row2.user_skill_ishide === "no" && (
                          <div
                            className="col-md-4 col-lg-3"
                            key={row2.user_skill_id}
                          >
                            <div className="styleboxskill moust" 
                            onClick={() => 
                            onCheckDataSkills(row2.skill_id)}>
                              <CustomContentProgressbar
                                percentage={row2.user_skill_point}
                              >
                                <div>
                                  <img
                                    className="Sizeimg"
                                    alt={row2.skill_name}
                                    src={`data:image/jpeg;base64,${row2.skill_logo}`}
                                  />
                                </div>
                              </CustomContentProgressbar>
                              <div className="box-center">
                                <span className="txtname">
                                  {row2.skill_name}
                                </span>
                                <img
                                  src={`data:image/jpeg;base64,${row2.user_profile}`}
                                  alt={row2.skill_name}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    overflow: "hidden",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container">
            <div className="row">
              <h5 className="col-lg-12"><b>{show === true ? dataSkill.obj[0].skill_exam_objective : "ไม่มีข้อมูล"}  </b></h5>
              <div className="col-lg-12"><b>หัวเรื่อง:</b> {show === true ?  dataSkill.sub[0].skill_exam_head : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>รายละเอียด:</b> {show === true ? dataSkill.sub[0].skill_exam_detail : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>วัตถุประสงค์:</b> {show === true ? dataSkill.sub[0].skill_exam_objective : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>รายละเอียด:</b> {show === true ? dataSkill.sub[0].user_ans_detail : "ไม่มีข้อมูล"}</div>
            </div>
            <div className="row">
              <div className="col-lg-12"><br/></div>
              <h5 className="col-lg-12"><b>{show === true ? dataSkill.obj[1].skill_exam_objective : "ไม่มีข้อมูล"}</b></h5>
              <div className="col-lg-12"><b>หัวเรื่อง:</b> {show === true ? dataSkill.sub[1].skill_exam_head : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>รายละเอียด:</b> {show === true ? dataSkill.sub[1].skill_exam_detail : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>วัตถุประสงค์:</b> {show === true ? dataSkill.sub[1].skill_exam_objective : "ไม่มีข้อมูล"}</div>
              <div className="col-lg-12"><b>รายละเอียด:</b> {show === true ? dataSkill.sub[1].user_ans_detail : "ไม่มีข้อมูล"}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
