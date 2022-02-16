import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import axios from "axios";
import moment from "moment";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  TextField,
  InputAdornment,
  // DialogActions,
  CircularProgress,
} from "@mui/material";

import {
  AccountCircle,
  MenuBook,
  AssignmentInd,
  FactCheck,
} from "@mui/icons-material";



import BoxsStudy from "./BoxsStudy";
import Experience from "./Experience";
import UserSkill from "./UserSkills";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  // console.log(props.dataNUser);

  const [swap, setSwap] = useState("personal");
  const [open, setOpen] = React.useState(false);

  const [dataNUser, setDataNUser] = useState([]);

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Userprofile = () => {
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
            setLoading(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Userprofile();
  }, []);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setSelectedFile(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const editImageHandler = (event) => {
    
    convertBase64(event.target.files[0]);
    // setSelectedFile(profiles[1]);
    setIsFilePicked(true);
    // console.log(selectedFile);
    return (selectedFile, isFilePicked);
  };

  const AvatarImage = (props) => {
    const profile = props.user_profile;
    var user_profile = "";

    if(profile){
      user_profile = "data:image/jpeg;base64," + profile;
    }
    
    return(
      <Avatar
        alt={props.us_firstname}
        sx={{ width: 200, height: 200, margin: "auto" }}
        src={user_profile}
      />
    )
  }

  

  

  const handleChange = (valueNew) => {
    const { name, value } = valueNew.target;

    setDataNUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // console.log(dataNUser);
  };

  //Save API--------------------------
  const handleSave = () => {
    
    // console.log(profiles[1]);

    // console.log(params);

    if (isFilePicked === true) {
      const profiles = selectedFile.split(",");

      const params = JSON.stringify({
        user_email: dataNUser.user_email,
        user_profile: profiles[1],
        user_tel: dataNUser.user_tel,
        user_dob: moment(dataNUser.user_dob).format("YYYY-MM-DD"),
        user_address: dataNUser.user_address,
        user_subdistrict: dataNUser.user_subdistrict,
        user_district: dataNUser.user_district,
        user_province: dataNUser.user_province,
        user_postcode: dataNUser.user_postcode,
        user_slogan: dataNUser.user_slogan,
        us_firstname: dataNUser.us_firstname,
        us_lastname: dataNUser.us_lastname,
        us_com_address: dataNUser.us_com_address,
        us_com_subdistrict: dataNUser.us_com_subdistrict,
        us_com_district: dataNUser.us_com_district,
        us_com_province: dataNUser.us_com_province,
        us_com_postcode: dataNUser.us_com_postcode,
        us_com_github: dataNUser.us_com_github,
        us_com_linkedin: dataNUser.us_com_linkedin,
        us_com_facebook: dataNUser.us_com_facebook,
        us_com_youtube: dataNUser.us_com_youtube,
      });


      axios
        .post("/resume/updateUserGeneral", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(dataNUser);
            // Userprofile();
            window.location = './resume_user';
          }
        })
        .catch((err) => console.log(err));
      // console.log("Push image");
      // console.log(params);
    } else {
      const params = JSON.stringify({
        user_email: dataNUser.user_email,
        user_tel: dataNUser.user_tel,
        user_dob: moment(dataNUser.user_dob).format("YYYY-MM-DD"),
        user_profile: dataNUser.user_profile,
        user_address: dataNUser.user_address,
        user_subdistrict: dataNUser.user_subdistrict,
        user_district: dataNUser.user_district,
        user_province: dataNUser.user_province,
        user_postcode: dataNUser.user_postcode,
        user_slogan: dataNUser.user_slogan,
        us_firstname: dataNUser.us_firstname,
        us_lastname: dataNUser.us_lastname,
        us_com_address: dataNUser.us_com_address,
        us_com_subdistrict: dataNUser.us_com_subdistrict,
        us_com_district: dataNUser.us_com_district,
        us_com_province: dataNUser.us_com_province,
        us_com_postcode: dataNUser.us_com_postcode,
        us_com_github: dataNUser.us_com_github,
        us_com_linkedin: dataNUser.us_com_linkedin,
        us_com_facebook: dataNUser.us_com_facebook,
        us_com_youtube: dataNUser.us_com_youtube,
      });

      axios
        .post("/resume/updateUserGeneral", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log("200");
            // Userprofile();
            window.location = './resume_user';
          }
        })
        .catch((err) => console.log(err));

      console.log("No image");

      console.log(params);
    }

    
  };

  const OldYears = () => {
    const dateDob = moment(dataNUser.user_dob).format('YYYY');
    const datenow = new Date().getFullYear();
    var dob = parseInt(datenow) - parseInt(dateDob);

    return(
      <TextField
                id="outlined-basic"
                label="อายุ"
                value={dob}
                style={{ width: 80 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ปี</InputAdornment>
                  ),
                }}
                disabled
              />
    )
  }

  return (
    <>
      <button className="btns" onClick={handleClickOpen}>
        <i className="fas fa-pencil-alt"></i> แก้ไข resume
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"xl"}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <b className="list-group-item list-group-item-warning mb10">
            <i className="fas fa-user-edit"></i> แก้ไขข้อมูลใน Resume
          </b>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ width: 1000 }}>
            <Grid item xs={4}>
              <List>
                <ListItem align="center">
                  <div className="divBoxAvata ">
                    <label htmlFor="upload" className="actionImage">
                      {selectedFile.length !== 0 ? <Avatar alt={dataNUser.us_firstname} sx={{ width: 200, height: 200, margin: "auto" }} src={selectedFile}  /> : <AvatarImage user_profile={dataNUser.user_profile} us_firstname={dataNUser.us_firstname} /> }
                      <div className="editImage">
                        <span className="idesing">
                          <i className="fas fa-pen-square"></i>
                        </span>
                      </div>
                    </label>
                    <input
                      type={"file"}
                      name="file"
                      id="upload"
                      accept="image/png, image/jpeg"
                      onChange={editImageHandler}
                    />
                  </div>
                </ListItem>
                {swap !== "personal" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action list-group-item-dark b"
                    onClick={() => setSwap("personal")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="ข้อมูลส่วนตัว" />
                    </ListItemButton>
                  </ListItem>
                )}

                {swap === "personal" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action active b"
                    onClick={() => setSwap("personal")}
                    active
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="ข้อมูลส่วนตัว" />
                    </ListItemButton>
                  </ListItem>
                )}
                {swap === "study" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action active b"
                    onClick={() => setSwap("study")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <MenuBook />
                      </ListItemIcon>
                      <ListItemText primary="การศึกษา" />
                    </ListItemButton>
                  </ListItem>
                )}
                {swap !== "study" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action list-group-item-dark b"
                    onClick={() => setSwap("study")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <MenuBook />
                      </ListItemIcon>
                      <ListItemText primary="การศึกษา" />
                    </ListItemButton>
                  </ListItem>
                )}

                {swap === "experience" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action active b"
                    onClick={() => setSwap("experience")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <AssignmentInd />
                      </ListItemIcon>
                      <ListItemText primary="ประสบการณ์" />
                    </ListItemButton>
                  </ListItem>
                )}
                {swap !== "experience" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action list-group-item-dark b"
                    onClick={() => setSwap("experience")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <AssignmentInd />
                      </ListItemIcon>
                      <ListItemText primary="ประสบการณ์" />
                    </ListItemButton>
                  </ListItem>
                )}

                {swap === "userSkill" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action active b"
                    onClick={() => setSwap("userSkill")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <FactCheck />
                      </ListItemIcon>
                      <ListItemText primary="คลังทักษะ" />
                    </ListItemButton>
                  </ListItem>
                )}
                {swap !== "userSkill" && (
                  <ListItem
                    disablePadding
                    className="list-group-item list-group-item-action list-group-item-dark b"
                    onClick={() => setSwap("userSkill")}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <FactCheck />
                      </ListItemIcon>
                      <ListItemText primary="คลังทักษะ" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Grid>
            <Grid item xs={8}>
              {swap === "personal" && (
                <>
                {loading === false && <CircularProgress />}
                {loading === true && 
                  <>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="ชื่อ"
                          name="us_firstname"
                          value={dataNUser.us_firstname}
                          onChange={handleChange}
                          required
                          focused
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="นามสกุล"
                          name="us_lastname"
                          value={dataNUser.us_lastname}
                          onChange={handleChange}
                          required
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="วันเกิด"
                          type={"date"}
                          name="user_dob"
                          value={moment(dataNUser.user_dob).format("YYYY-MM-DD")}
                          onChange={(e) =>
                            setDataNUser({
                              ...dataNUser,
                              user_dob: e.target.value,
                            })
                          }
                          focused
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <OldYears />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="อีเมล์"
                          value={dataNUser.user_email}
                          name="user_email"
                          onChange={handleChange}
                          focused
                          disabled
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="โทร"
                          value={dataNUser.user_tel}
                          name="user_tel"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          fullWidth
                          label="คติประจำใจ"
                          name="user_slogan"
                          value={dataNUser.user_slogan}
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="ที่อยู่ปัจจุบัน"
                          value={dataNUser.user_address}
                          name="user_address"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="จังหวัด"
                          value={dataNUser.user_province}
                          name="user_province"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="อำเภอ"
                          value={dataNUser.user_district}
                          name="user_district"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="ตำบล"
                          value={dataNUser.user_subdistrict}
                          name="user_subdistrict"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="รหัสไปรษณีย์"
                          value={dataNUser.user_postcode}
                          name="user_postcode"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="ภูมิลำเนา"
                          value={dataNUser.us_com_address}
                          name="us_com_address"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="จังหวัด"
                          value={dataNUser.us_com_province}
                          name="us_com_province"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="อำเภอ"
                          value={dataNUser.us_com_district}
                          name="us_com_district"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="ตำบล"
                          value={dataNUser.us_com_subdistrict}
                          name="us_com_subdistrict"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="รหัสไปรษณีย์"
                          value={dataNUser.us_com_postcode}
                          name="us_com_postcode"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Facebook"
                          value={dataNUser.us_com_facebook}
                          name="us_com_facebook"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="YouTube"
                          value={dataNUser.us_com_youtube}
                          name="us_com_youtube"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="GitHub"
                          value={dataNUser.us_com_github}
                          name="us_com_github"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="LinkedIn"
                          value={dataNUser.us_com_linkedin}
                          name="us_com_linkedin"
                          onChange={handleChange}
                          focused
                        />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <button onClick={handleSave} className="btn btn-success">
                        <i className="fas fa-save"></i> บันทึก
                      </button>
                    </DialogActions>
                  </>
                }
                </>
              )}
              {swap === "study" && <BoxsStudy education={props.education} />}
              {swap === "experience" && (
                <Experience experience={props.experience} />
              )}
              {swap === "userSkill" && <UserSkill />}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btn btn-outline-dark">
            <i className="fas fa-times-circle"></i> ยกเลิก
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
