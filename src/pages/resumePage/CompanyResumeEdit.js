import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";
import Swal from "sweetalert2";
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
const thai = require("thai-data");

export default function CompanyResumeEdit() {
  const [ProfileGeneral, setProfileGeneral] = useState([]);
  const [dates, setDates] = useState('');
  const [loading1, setLoading1] = useState(false);

  const [zipCode, setZipCode] = useState("");
  const [subDistrict, setSubDistrict] = useState(Array);
  const [subDistrictSelect, setSubDistrictSelect] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [isDisabledSubDistrictSelect, setIsDisabledSubDistrictSelect] =
    useState(true);
  const [image, setImage] = useState('');
  

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
            console.log(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // End funtion PositionRequire
  }

  const SkillRequire = () => {
    // Select API SkillRequire
    try {
      axios
        .post("resume/companySkillRequire", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    // End funtion SkillRequire
  }

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
    //SkillRequire();
    PositionRequire();
    SelectCompanyData();
  }, []);

  const handleChangeNew = (newValue) => {
    var values = [...ProfileGeneral];
    var { name, value } = newValue.target;

    // console.log(value+" "+name);
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
    } else if (name === "user_postcode") {
      values[0].user_postcode = value;
    } else if (name === "user_district") {
      values[0].user_district = value;
    } else if (name === "user_subdistrict") {
      values[0].user_subdistrict = value;
    } else if (name === "uc_type") {
      values[0].uc_type = value;
    }

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

    if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' ){
      console.log("true type " + file.type);
      if(file.size < 50000){
        console.log("true size " + file.size);
        const reader = new FileReader();
        // console.log(file);
        reader.onload = function(e) {
          let binaryData = e.target.result;
          let base64String = window.btoa(binaryData);
          func(base64String);
          
        };
    
        let image = reader.readAsBinaryString(file);
        console.log(reader);
        return image;
        // values[0].user_profile = profiles[1];
       
        // console.log(file.name);
        
        // console.log(values[0].user_profile);
        // setProfileGeneral(values);
      }else{
        console.log("false size " + file.size);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload a file smaller than 50 KB!',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
        // window.alert("Please upload a file smaller than 50 KB");
      }
    }else{
      console.log("false type " + file.type);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File does not support. You must use .png or .jpg!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
      // window.alert("File does not support. You must use .png or .jpg ");
    }
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // setPage("genaral");
    window.location = "/resume_company";
  };
  return (
    <FormControl onSubmit={() => handleSubmit}>
      {loading1 === false && <CircularProgress />}
      {loading1 === true && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-4 ">
                <label htmlFor="imagefile">
                  {image ? <SetImageLog user_profile={image} /> : <SetImageLog user_profile={ProfileGeneral[0].user_profile} />}
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
                      disabled = {ProfileGeneral[0].uc_name.length === 100 ? false : true}
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
              <div className="col-lg-8 maginBottom20"></div>
              <div className="col-md-12 col-lg-4 maginBottom20 sdd">
                <div className="row bg-while marginleft20 ">
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
                        value={dates !== '' ? dates : ProfileGeneral[0].user_dob}
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
              <div className="col-md-12 col-lg-8 sdd maginBottom20">
                <div className="row bg-while sdd">
                  <div className="col-lg-12 sdd">
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
                      }}
                    />
                  </div>
                  <div className="col-md-12 col-lg-4 sdd">
                    <select
                      onChange={(e) => {
                        onSetDistrict(e.target.value);
                      }}
                      value={subDistrictSelect}
                      disabled={zipCode.length === 5 ? false : true}
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
            </div>
          </div>
          <div className="container">
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="p-relative">
                    <label className="title-Position-require p-absolute">Position require</label>
                    <div className="line "></div>
                  </div>
                </div>
                <div className="col-12"><br/><br/></div>
              </div>
              <div className="row">
                <div className="col-12 bg-while">
                  {/* In-Box-Position */}
                  <div className="row">
                    <label className="col-md-6 col-lg-3 txtBoxRequire" style={{textAlign: "right"}}>ตำเเหน่งงาน : </label>
                    <TextField
                      className="col-md-6 col-lg-3"
                      id="outlined-basic"
                      label="Position"
                      name="da"
                      variant="outlined"
                      margin="normal"
                      // value={province}
                      // onChange={(newValue) => handleChangeNew(newValue)}
                    />
                    <label className="col-md-6 col-lg-3 txtBoxRequire" style={{textAlign: "right"}}>เงินประจำเดือน :</label>
                    <TextField
                      className="col-md-6 col-lg-3"
                      id="outlined-basic"
                      label="Salary"
                      name="da"
                      margin="normal"
                      variant="outlined"
                      // value={province}
                      // onChange={(newValue) => handleChangeNew(newValue)}
                    />
                    <div className="col-12"><br/></div>
                    <label className="col-12"><b>รายละเอียดงาน</b></label>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Job Detail"
                      className="col-12"
                      fullWidth
                      multiline
                      // name="uc_detail"
                      maxRows={4}
                      margin="normal"
                      // value={ProfileGeneral[0].uc_detail}
                      onChange={(newValue) => handleChangeNew(newValue)}
                    />
                    <div className="col-12"><br/></div>
                    <div className="col-12 "  > {/*Skill Require */}
                      <div className="row borderBox overflow-auto" align={"center"}>
                        <label className="col-sm-4 col-md-3 col-lg-1 boxSkilsRequire p-relative">
                          <Avatar
                              alt={'ddd'}
                              className="avatarL"
                              src={`data:image/jpeg;base64,`}
                              sx={{ width: 20, height: 20 }}
                            />
                          <Avatar
                            alt={'ddd'}
                            // className="maginLeftRight-center"
                            src={`data:image/jpeg;base64,`}
                            sx={{ width: 50, height: 50 }}
                          />
                          <p>5555</p>
                        </label>
                        <label className="col-sm-5 col-md-3 col-lg-1 boxSkilsRequire p-relative">
                          <Avatar
                              alt={'ddd'}
                              className="avatarL"
                              src={`data:image/jpeg;base64,`}
                              sx={{ width: 20, height: 20 }}
                            />
                          <Avatar
                            alt={'ddd'}
                            // className="maginLeftRight-center"
                            src={`data:image/jpeg;base64,`}
                            sx={{ width: 50, height: 50 }}
                          />
                          <p>5555</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </>
      )}
      <input type="submit" onClick={handleSubmit} />
    </FormControl>
  );
}
