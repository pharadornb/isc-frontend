import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import moment from "moment";
import axios from "axios";
import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  MenuBook,
  AssignmentInd,
  FactCheck,
} from "@mui/icons-material";

import BoxsStudy from "./BoxsStudy";
import Experience from "./Experience";
// import UserSkill from "./UserSkill";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  // console.log(props.dataNUser);
  const [open, setOpen] = React.useState(false);
  const [swap, setSwap] = useState("personal");

  

  const [dataNUser, setDataNUser] = useState([]);

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
            console.log(res.data[0]);
            setDataNUser(res.data[0]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Userprofile();
  }, []);

  const handleChange = (valueNew) => {
    const { name, value } = valueNew.target;

    // const values = [...dataNUser];

    // if (valueNew.target.name === "us_firstname") {
    //   values.us_firstname = valueNew.target.value;
    // }
    // setDataNUser(values);
    // const value = valueNew.target.value;
    // setData(value);
    // console.log(data);
    // console.log(valueNew.target);
    // if(name === 'user_dob'){
    //   console.log(moment(value).format("YYYY-MM-DDThh:mm:ss.000Z") + " 6666");
    //   setDataNUser(prevState => ({
    //       ...prevState,
    //       [name]: moment(value).format("YYYY-MM-DDThh:mm:ss.000Z")
    //   }));
    // }
    // console.log(name + " " + value);

    setDataNUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(dataNUser);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const setDate = (e) => {
  //     console.log(e);
  // }

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
                  <Avatar
                    alt="Remy Sharp"
                    sx={{ width: 200, height: 200, margin: "auto" }}
                    src={`data:image/jpeg;base64,${dataNUser.user_profile}`}
                  />
                </ListItem>
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
              </List>
            </Grid>
            <Grid item xs={8}>
              {swap === "personal" && (
                <>
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={6}>
                      {/* <input type="text" name="us_firstname" value={data} onChange={(e)=>handleChange("us_firstname", e)} /> */}
                      <TextField
                        fullWidth
                        label="ชื่อ"
                        name="us_firstname"
                        value={dataNUser.us_firstname}
                        onChange={handleChange}
                        required
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
                      <TextField
                        id="outlined-basic"
                        label="อายุ"
                        value={55}
                        style={{ width: 80 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">ปี</InputAdornment>
                          ),
                        }}
                        disabled
                      />
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
                </>
              )}
              {swap === "study" && <BoxsStudy education={props.education} />}
              {swap === "experience" && <Experience experience={props.experience}/>}
              {/* {swap === "userSkill" && <UserSkill userSkill={props.userSkill}/>} */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btn btn-outline-dark">
            ยกเลิก
          </button>
          <button onClick={handleClose} className="btn btn-success">
            บันทึก
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
