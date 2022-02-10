import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Sidebar from "../../component/configComponent/SidebarChild";
import "./CompanyResume.css";
import {
  ModeEdit,
  Apartment,
  Email,
  Language,
  Call,
  LocationOn,
} from "@mui/icons-material";
import {
  Avatar,
//   Input,
  TextField,
//   MenuItem,
//   InputLabel,
//   Select,
  FormControl,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import AlertDialogSlide from "./CompanyDialogSlide";
import EditIcon from "@mui/icons-material/Edit";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

// import Loading from '../../component/Loading';
import ProgressbarSkills from "./CompanyProgressbarSkills";

// const thai = require("thai-data");

export default function CompanyResume() {
  const { userEmail } = useParams();

  const [companyProfileGeneral, setCompanyProfileGeneral] = useState([]);
  const [companyPositionRequire, setCompanyPositionRequire] = useState([]);
  const [page, setPage] = useState("genaral");

  const [dates, setDates] = React.useState(companyProfileGeneral.user_slogan);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleClick = () => {
    sessionStorage.clear();
    window.location = "/";
  };

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
  };

  useEffect(() => {
    SelectCompanyData();
  }, []);

  const ImageLogoCompany = (props) => {
    var user_profile = "";
    if (props.user_profile) {
      user_profile = "data:image/jpeg;base64," + props.user_profile;
    }

    return (
      <>
        <Avatar
          alt={props.uc_name}
          src={user_profile}
          sx={{ width: 300, height: 300 }}
          className="AvatarLogo"
        />
      </>
    );
  };

  const DobCompany = (props) => {
    const dob = props.user_dob;
    var datedob = moment(dob).format("DD MMMM YYYY");
    const dates = new Date().getFullYear();
    var oldYear = parseInt(dates) - parseInt(moment(dob).format("YYYY"));
    return (
      <>
        {datedob}, {oldYear} year old
      </>
    );
  };

  const handleEdit = () => {
    setPage("edit");
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('55555');
      setPage("genaral");
  };

  const handleChange = (e) => {
    const values = [...companyProfileGeneral];
    const { value, name } = e.target;
    if (name === "uc_name") {
      setCompanyProfileGeneral(values.uc_name);
    }
  };



  return (
    <Sidebar mark={"company_resume"}>
      {!userEmail && (
        <>
          {/* <p>Company resume page</p> */}
          {/*<UserDashboard/>*/}
          {/*<Button variant="contained" onClick={() => handleClick()}>Logout</Button>*/}
          {/*<p>CompanyResume : {userEmail}</p>*/}

          {page === "genaral" && (
            <div className="bg-company-resume">
              {/* {loading === false && <Loading />} */}
              {/* Part 1 */}
              <div className="box-edit">
                <button className="Cbtns" onClick={handleEdit}>
                  <ModeEdit className="edit-pen" /> แก้ไข้
                </button>
              </div>
              <div className="left-48" />
              <div className="both" />

              <div className="container">
                {/* Part 2 */}
                <div className="row">
                  <div className="col-md-4 corner">
                    <ImageLogoCompany
                      uc_name={companyProfileGeneral.user_profile}
                      user_profile={companyProfileGeneral.user_profile}
                    />
                  </div>
                  <div className="col-md-8 corner">
                    <div className="Cbox-text">
                      <div className="text-message1">
                        {loading1 === false && (
                          <CircularProgress disableShrink />
                        )}
                        {companyProfileGeneral.uc_name}
                      </div>
                      <div className="text-message2">
                        “
                        {loading1 === false && (
                          <CircularProgress disableShrink />
                        )}
                        {companyProfileGeneral.user_slogan}”
                      </div>
                    </div>
                  </div>
                </div>
                {/* Part 3 */}
                <div className="row">
                  <div className="col-md-1" />
                  <div className="col-md-12 col-lg-4 left-Cbox">
                    <div className="row align20">
                      <div className="col-md-2">
                        <Apartment fontSize="large" className="scol" />
                      </div>
                      <div className="col-10">
                        <div className="scol">
                          {loading1 === false && (
                            <CircularProgress disableShrink />
                          )}
                          <DobCompany
                            user_dob={companyProfileGeneral.user_dob}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row align20">
                      <div className="col-md-2">
                        <Email fontSize="large" className="scol" />
                      </div>
                      <div className="col-md-10">
                        <div className="scol">
                          {loading1 === false && (
                            <CircularProgress disableShrink />
                          )}
                          {companyProfileGeneral.user_email}
                        </div>
                      </div>
                    </div>
                    <div className="row align20">
                      <div className="col-md-2">
                        <Call fontSize="large" className="scol" />
                      </div>
                      <div className="col-md-10">
                        <div className="scol">
                          {loading1 === false && (
                            <CircularProgress disableShrink />
                          )}
                          {companyProfileGeneral.user_tel},
                          {companyProfileGeneral.uc_fax}
                        </div>
                      </div>
                    </div>
                    <div className="row align20">
                      <div className="col-md-2">
                        <Language fontSize="large" className="scol" />
                      </div>
                      <div className="col-md-10">
                        <div className="scol">
                          {loading1 === false && (
                            <CircularProgress disableShrink />
                          )}
                          {companyProfileGeneral.uc_website}
                        </div>
                      </div>
                    </div>
                    <div className="row align20">
                      <div className="col-md-2">
                        <LocationOn fontSize="large" className="scol" />
                      </div>
                      <div className="col-md-10">
                        <div className="scol">
                          {loading1 === false && (
                            <CircularProgress disableShrink />
                          )}
                          {companyProfileGeneral.user_address}{" "}
                          {companyProfileGeneral.user_adduser_subdistrictress}{" "}
                          {companyProfileGeneral.user_district}{" "}
                          {companyProfileGeneral.user_province}{" "}
                          {companyProfileGeneral.user_postcode}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 left-Cbox">
                    <div className="scol align20">
                      {loading1 === false && <CircularProgress disableShrink />}
                      {companyProfileGeneral.uc_detail}
                    </div>
                  </div>
                  <div className="col-md-1" />
                </div>
              </div>
              <div className="container magintop">
                {/* Part 4 */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="Cbox-title-bg">
                      <p className="box-title">Position require</p>
                      <div className="lineC" />
                    </div>
                  </div>
                </div>

                <div className="row magin-top80-bottom40-paddig20">
                    {loading2 === false && <CircularProgress disableShrink />}
                  {companyPositionRequire.map((row, index) => (
                    <div className="col-sm-12 col-md-12 bg-while" key={index}>
                      <div className="container ">
                        <div className="row ">
                          <div className="col-sm-12 col-md-6">
                            <div className="textTitle">
                              {row.ucre_occupation}
                            </div>
                            <div className="textMessage">
                              <b>รายละเอียด:</b> {row.ucre_detail}
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            <div className="float-right maginBottom20">
                              <b>Skill Require</b>
                            </div>
                            <div className="both1" />
                            <ProgressbarSkills
                              ucre_id={row.ucre_id}
                              index={index}
                            />
                            <div className="both1" />
                            <AlertDialogSlide
                              companyPositionRequire={
                                companyPositionRequire[index]
                              }
                              uc_name={companyProfileGeneral.uc_name}
                            />
                            <div className="both1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {page === "edit" && (
            <div className="bg-edit">
              <div>
                <label className="co-edit">
                  <EditIcon /> <b>แก้ไขข้อมูลบริษัท</b>
                </label>
              </div>
              <div className="magintop20"></div>
              <FormControl onSubmit={() => handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-4 ">
                      <Avatar
                        alt="Remy Sharp"
                        className="maginLeftRight-center"
                        // src="/static/images/avatar/1.jpg"
                        sx={{ width: 200, height: 200 }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-8">
                      <div className="row bg-while sdd">
                        <div className="col-sm-12 col-md-12">
                          <TextField
                            id="outlined-basic"
                            label="Outlined"
                            fullWidth
                            value={companyProfileGeneral.uc_name}
                            className="inputbox magintop20"
                            pattern={"[A-Za-z]{3}"}
                            maxLength={11}
                            variant="outlined"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-sm-12 col-md-12">
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Slogan"
                            className="inputbox1 magintop20"
                            fullWidth
                            multiline
                            maxRows={4}
                            margin="normal"
                            value={companyProfileGeneral.user_slogan}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 maginBottom20"></div>
                    <div className="col-md-8 maginBottom20"></div>
                    <div className="col-md-12 col-lg-4 maginBottom20 sdd">
                      <div className="row bg-while marginleft20 ">
                        <div className="col-lg-12 maginBottom20">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label="Date Dob"
                              value={dates}
                              onChange={(newValue) => {
                                setDates(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField fullWidth {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="col-12  maginBottom20">
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            value={companyProfileGeneral.user_email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 maginBottom20">
                          <TextField
                            id="outlined-basic"
                            label="Tel"
                            fullWidth
                            variant="outlined"
                            value={companyProfileGeneral.user_tel}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 maginBottom20">
                          <TextField
                            id="outlined-basic"
                            label="Fax"
                            fullWidth
                            variant="outlined"
                            value={companyProfileGeneral.uc_fax}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-12 maginBottom20">
                          <TextField
                            id="outlined-basic"
                            label="Website"
                            fullWidth
                            variant="outlined"
                            value={companyProfileGeneral.uc_website}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-8 sdd maginBottom20">
                      <div className="row bg-while sdd">
                        <div className="col-12 sdd">
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Detail"
                            className="inputbox1"
                            fullWidth
                            multiline
                            maxRows={4}
                            margin="normal"
                            value={companyProfileGeneral.uc_detail}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-4 sdd">
                            <TextField
                                id="outlined-basic"
                                label="Address"
                                fullWidth
                                variant="outlined"
                                value={companyProfileGeneral.user_address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-3 sdd">
                          <TextField
                            id="outlined-basic"
                            label="Postcode"
                            fullWidth
                            variant="outlined"
                            value={companyProfileGeneral.user_postcode}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-4 sdd">
                            <TextField
                                id="outlined-basic"
                                label="Province"
                                fullWidth
                                variant="outlined"
                                value={companyProfileGeneral.user_province}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4 sdd">
                            <TextField
                                id="outlined-basic"
                                label="District"
                                fullWidth
                                variant="outlined"
                                value={companyProfileGeneral.user_district}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4 sdd">
                            {companyProfileGeneral.user_adduser_subdistrictress}
                            <TextField
                                id="outlined-basic"
                                label="Subdistrictress"
                                fullWidth
                                variant="outlined"
                                value={companyProfileGeneral.user_adduser_subdistrictress}
                                onChange={handleChange}
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="submit" onClick={handleSubmit} />
              </FormControl>
            </div>
          )}
        </>
      )}
      {userEmail && (
        <>
          {/*<UserDashboard/>*/}
          <Button variant="contained" onClick={() => handleClick()}>
            Logout
          </Button>
          <p>CompanyResume : {userEmail}</p>
        </>
      )}
    </Sidebar>
  );
}
