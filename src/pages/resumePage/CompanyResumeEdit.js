import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import Swal from "sweetalert2";

import SkillRequire from "./SkillRequire";

// import moment from "moment";
import {
  Avatar,
  //   Input,
  TextField,
  // MenuItem,
  // InputLabel,
  // Select,
  FormControl,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

const thai = require("thai-data");

export default function CompanyResumeEdit() {
  const [ProfileGeneral, setProfileGeneral] = useState([]);
  const [position_Require, setPositionRequire] = useState([]);

  const [positionRequireNew, setPositionRequireNew] = useState([]);

  const [dates, setDates] = useState("");
  const [loading1, setLoading1] = useState(false);

  const [zipCode, setZipCode] = useState(0);
  const [subDistrict, setSubDistrict] = useState(Array);
  const [subDistrictSelect, setSubDistrictSelect] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [isDisabledSubDistrictSelect, setIsDisabledSubDistrictSelect] =
    useState(true);
  const [image, setImage] = useState("");

  const [open, setOpen] = useState(false);


  const onSetZipCode = (e) => {
    setSubDistrictSelect("");
    setDistrict("");
    setProvince("");
    
    if (/^\d{0,5}$/.test(e)) {
      setZipCode(e);
      if (thai.autoSuggestion(e).subDistrict) {
        setSubDistrict(thai.autoSuggestion(e).subDistrict);
        setIsDisabledSubDistrictSelect(false);
      } else {
        setIsDisabledSubDistrictSelect(true);
      }
    }
  };

  const autoSuggestion = (zipCode, subDistrict) => {
    setDistrict(thai.autoSuggestion(zipCode, subDistrict).districtName);
    setProvince(thai.autoSuggestion(zipCode, subDistrict).provinceName);
  };

  const onSetDistrict = (subDistrict) => {
    setSubDistrictSelect(subDistrict);
    autoSuggestion(zipCode, subDistrict);
  };

  const PositionRequire = () => {
    // Select API PositionRequire
    try {
      axios
        .post("resume/companyPositionRequire", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setPositionRequire(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // End funtion PositionRequire
  };

  const SelectCompanyData2 = () => {
    // Select API ProfileGeneral --------------
    try {
      axios
        .post("resume/companyProfileGeneral", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setProfileGeneral(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const SelectCompanyData = () => {
      // Select API ProfileGeneral --------------
      try {
        axios
          .post("resume/companyProfileGeneral", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              setProfileGeneral(res.data);

              setDates(res.data[0].user_dob);
              setZipCode(res.data[0].user_postcode);
              onSetZipCode(res.data[0].user_postcode);
              setSubDistrictSelect(res.data[0].user_subdistrict);
              autoSuggestion(
                res.data[0].user_postcode,
                res.data[0].user_subdistrict
              );

              setLoading1(true);
            }
          });
      } catch (err) {
        console.log(err);
      }
      // End funtion SelectCompanyData --------------------------------------------------------
    };

    // Select Function

    PositionRequire();
    SelectCompanyData();
  }, []);

  const handleChangeNew = (newValue) => {
    var values = [...ProfileGeneral];
    var { name, value } = newValue.target;

    console.log(value + " " + name);
    if (name === "uc_name") {
      values[0].uc_name = value;
    } else if (name === "user_slogan") {
      values[0].user_slogan = value;
    } else if (name === "user_tel") {
      values[0].user_tel = value;
    } else if (name === "uc_fax") {
      values[0].uc_fax = value;
    } else if (name === "uc_website") {
      values[0].uc_website = value;
    } else if (name === "uc_detail") {
      values[0].uc_detail = value;
    } else if (name === "user_address") {
      values[0].user_address = value;
    } else if (name === "uc_type") {
      values[0].uc_type = value;
    }
    setOpen(true);

    setProfileGeneral(values);
  };

  const SetImageLog = (props) => (
    <Avatar
      alt={ProfileGeneral[0].uc_name}
      className="maginLeftRight-center"
      src={`data:image/jpeg;base64,${props.user_profile}`}
      sx={{ width: 200, height: 200 }}
    />
  );

  async function readImage(e, func) {
    const file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      console.log("true type " + file.type);
      if (file.size < 50000) {
        console.log("true size " + file.size);
        const reader = new FileReader();
        // console.log(file);
        reader.onload = function (e) {
          let binaryData = e.target.result;
          let base64String = window.btoa(binaryData);
          func(base64String);
        };

        let image = reader.readAsBinaryString(file);
        console.log(reader);
        setOpen(true);
        return image;
      } else {
        console.log("false size " + file.size);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please upload a file smaller than 50 KB!",
        });
      }
    } else {
      console.log("false type " + file.type);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "File does not support. You must use .png or .jpg!",
      });
    }
  }

  const onAddData = () => {
    // const add = [...positionRequireNew];

    const addData = {
      ucre_id: "",
      ucre_detail: "",
      ucre_occupation: "",
      ucre_salary: 0
    };

    const newAddContacts = [...positionRequireNew, addData];

    setPositionRequireNew(newAddContacts);

    // positionRequireNew.push(addData);
  };

  // -------------------------------------------------------------------------------

  const onDeleteReport = (index, check) => {
    console.log(index + " " + check);

    if(check === 'old'){
      console.log(position_Require);

      const params = JSON.stringify({
        position: [
          {
            ucre_occupation: position_Require[index].ucre_occupation,
            ucre_detail: position_Require[index].ucre_detail,
            ucre_salary: position_Require[index].ucre_salary,
            ucre_isdelete: "yes",
            ucre_id: position_Require[index].ucre_id
          },
        ],
      });
  
      console.log(params);
  
      axios
        .post("resume/updateDeletePosition", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const val = [...position_Require];
            val.splice(index, 1);
            setPositionRequire(val);
            console.log("Delete Position!!!!");
          }
        })
        .catch((err) => console.log(err));
    }else if(check === 'new'){
      console.log(positionRequireNew);
      const val = [...positionRequireNew];

      val.splice(index, 1);
      setPositionRequireNew(val);
    }

    // window.location = "/resume_company"
  };

  // -------------------------------------------------------------------------------

  const handleSubmit = () => {
    // console.log(ProfileGeneral[0]);

    const params = JSON.stringify({
      user_tel: ProfileGeneral[0].user_tel,
      user_dob: moment(dates).format("YYYY-MM-DD"),
      user_address: ProfileGeneral[0].user_address,
      user_subdistrict: subDistrictSelect,
      user_district: district,
      user_province: province,
      user_postcode: zipCode,
      user_slogan: ProfileGeneral[0].user_slogan,
      uc_name: ProfileGeneral[0].uc_name,
      uc_register: ProfileGeneral[0].uc_register,
      uc_fax: ProfileGeneral[0].uc_fax,
      uc_detail: ProfileGeneral[0].uc_detail,
      uc_website: ProfileGeneral[0].uc_website,
      user_profile: image !== "" ? image : ProfileGeneral[0].user_profile
    });

    console.log(JSON.parse(params));

    try {
      axios
        .post("resume/UpdateCompanyResume", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            SelectCompanyData2();
            console.log("Data Update");
            Swal.fire(
              'บันทึกโปรไฟล์เรียบร้อย',
              'ขอบคุณที่ใช้บริการ',
              'success'
            )
            setOpen(false);
          }
        });
    } catch (err) {
      console.log(err);
    }

    // window.location = "/resume_company";
  };

  const onBack = () => {
    window.location='/resume_company';
  }  
  return (
    <FormControl>
      {loading1 === false ? (
        <CircularProgress />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-4 ">
              <label htmlFor="imagefile">
                {image ? (
                  <SetImageLog user_profile={image} />
                ) : (
                  <SetImageLog user_profile={ProfileGeneral[0].user_profile} />
                )}
                <input
                  type={"file"}
                  id={"imagefile"}
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={(event) => readImage(event, setImage)}
                />
              </label>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="row bg-while sdd">
                <div className="col-lg-12">
                  <TextField
                    id="outlined-basic"
                    label="Company Name"
                    fullWidth
                    disabled={
                      ProfileGeneral[0].uc_name.length === 100 ? true : false
                    }
                    name="uc_name"
                    value={ProfileGeneral[0].uc_name}
                    className="inputbox magintop20"
                    variant="outlined"
                    onChange={(newValue) => handleChangeNew(newValue)}
                  />
                </div>
                <div className="col-lg-12">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Slogan"
                    className="inputbox1 magintop20"
                    fullWidth
                    multiline
                    maxRows={4}
                    name="user_slogan"
                    margin="normal"
                    value={ProfileGeneral[0].user_slogan}
                    onChange={(newValue) => handleChangeNew(newValue)}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 maginBottom20"></div>
            <div className="col-lg-12 maginBottom20 bg-while">
              <div className="row">
                <div className="col-md-12 col-lg-4 maginBottom20 sdd">
                  <div className="row  marginleft20 ">
                    <div className="col-lg-12  maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Register ID"
                        fullWidth
                        name="uc_register"
                        variant="outlined"
                        disabled
                        value={ProfileGeneral[0].uc_register}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12  maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Job Type"
                        fullWidth
                        name="uc_type"
                        variant="outlined"
                        value={ProfileGeneral[0].uc_type}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12 maginBottom20">
                      {/* {ProfileGeneral[0].user_dob}
                    {moment(ProfileGeneral[0].user_dob).format('YYYY-MM-DD')} */}
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Date Dob"
                          value={
                            dates !== "" ? dates : ProfileGeneral[0].user_dob
                          }
                          onChange={(newValue) => {
                            setDates(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-lg-12  maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        fullWidth
                        name="user_email"
                        variant="outlined"
                        disabled
                        value={ProfileGeneral[0].user_email}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12 maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Tel"
                        fullWidth
                        name="user_tel"
                        variant="outlined"
                        value={ProfileGeneral[0].user_tel}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12 maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Fax"
                        fullWidth
                        name="uc_fax"
                        variant="outlined"
                        value={ProfileGeneral[0].uc_fax}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12 maginBottom20">
                      <TextField
                        id="outlined-basic"
                        label="Website"
                        fullWidth
                        name="uc_website"
                        variant="outlined"
                        value={ProfileGeneral[0].uc_website}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-md-12 col-lg-7">
                  <div className="row">
                    <div className="col-lg-12">
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Detail"
                        className="inputbox1"
                        fullWidth
                        multiline
                        name="uc_detail"
                        maxRows={4}
                        margin="normal"
                        value={ProfileGeneral[0].uc_detail}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-lg-12 sdd">
                      <TextField
                        id="outlined-basic"
                        label="Address"
                        fullWidth
                        name="user_address"
                        variant="outlined"
                        value={ProfileGeneral[0].user_address}
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-md-12 col-lg-3 sdd">
                      <TextField
                        id="outlined-basic"
                        label="Postcode"
                        fullWidth
                        name="user_postcode"
                        variant="outlined"
                        value={zipCode}
                        onChange={(e) => {
                          onSetZipCode(e.target.value);
                          setOpen(true);
                        }}
                      />
                    </div>
                    <div className="col-md-12 col-lg-4 sdd">
                      <select
                        onChange={(e) => {
                          onSetDistrict(e.target.value);
                          setOpen(true);
                        }}
                        value={subDistrictSelect}
                        // disabled={zipCode.length === 5 ? false : true}
                        className={`col-md-12 col-lg-4 form-select ${
                          !isDisabledSubDistrictSelect
                            ? "text-gray-700"
                            : "bg-gray-200 text-gray-500"
                        } selectStype `}
                        id="subDistrict"
                      >
                        <option
                          value=""
                          disabled={!isDisabledSubDistrictSelect ? true : false}
                        >
                          subDistrictSelect
                        </option>
                        {!isDisabledSubDistrictSelect &&
                          subDistrict.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                      </select>
                      {!isDisabledSubDistrictSelect && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                      )}
                    </div>
                    <div className="col-md-12 col-lg-4 sdd">
                      <TextField
                        id="outlined-basic"
                        label="District"
                        fullWidth
                        variant="outlined"
                        name="user_district"
                        focused
                        value={district}
                        disabled
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                    <div className="col-md-12 col-lg-4 sdd">
                      <TextField
                        id="outlined-basic"
                        label="Subdistrictress"
                        fullWidth
                        name="user_subdistrict"
                        variant="outlined"
                        value={province}
                        disabled
                        onChange={(newValue) => handleChangeNew(newValue)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 txtAlignLeft">
                  <button
                    type="submit"
                    className={open === false ? "btn btn-secondary" : "btn btn-success"}
                    disabled={open === false ? true : false}
                    onClick={handleSubmit}
                  >
                   <i className="fas fa-save"/> บันทึกโปรไฟล์
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 ">
              <div className="p-relative">
                <label className="title-Position-require p-absolute">
                  Position require
                </label>
                <div className="line "></div>
              </div>
            </div>
            <div className="col-12">
              <br />
              <br />
            </div>
          </div>

          <div className="row">
            {/*Skill Require */}
            {position_Require.map((rows, index) => (
              <div className="col-12 bg-while sdd">
                {/* In-Box-Position */}
                <div className="row">
                  <div className="col-12" style={{ textAlign: "right" }}>
                    <span style={{ color: "red" }}>
                      <i
                        className="fas fa-minus-circle"
                        onClick={() => onDeleteReport(index, 'old')}
                      />
                    </span>
                  </div>
                  <SkillRequire
                    key={index}
                    index={index}
                    page={"old"}
                    position_Require={position_Require}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* New Data */}
          <div className="row">
            {/*Skill Require */}

            {position_Require.length === 0
              ? positionRequireNew.map((rows, index) => (
                  <div className="col-12 bg-while sdd">
                    {/* In-Box-Position */}
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "right" }}>
                        <span style={{ color: "red" }}>
                          <i
                            className="fas fa-minus-circle"
                            onClick={() => onDeleteReport(index, 'new')}
                          />
                        </span>
                      </div>
                      <SkillRequire
                        key={index}
                        index={index}
                        page={"new"}
                        position_Require={positionRequireNew}
                      />
                    </div>
                  </div>
                ))
              : positionRequireNew.map((rows, index) => (
                  <div className="col-12 bg-while sdd">
                    {/* In-Box-Position */}
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "right" }}>
                        <span style={{ color: "red" }}>
                          <i
                            className="fas fa-minus-circle"
                            onClick={() => onDeleteReport(index, 'new')}
                          />
                        </span>
                      </div>
                      <SkillRequire
                        key={index}
                        index={index}
                        page={"new"}
                        position_Require={positionRequireNew}
                      />
                    </div>
                  </div>
                ))}
          </div>
          <div className="row">
            <div className="col-6" style={{ textAlign: "left" }}>
              <button type="button" class="btn btn-secondary" onClick={onBack}>กลับไปหน้า Resume</button>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <button type="button" class="btn btn-success" onClick={onAddData}>เพิ่มเอกสาร</button>
            </div>

            <div className="col-12">
              <br />
            </div>
          </div>
        </div>
      )}
    </FormControl>
  );
}
