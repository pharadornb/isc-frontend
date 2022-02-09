import React, { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
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
import Personal from "./Personal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  // console.log(props.dataNUser);

  const [swap, setSwap] = useState("personal");
  const [open, setOpen] = React.useState(false);

  const [dataNUser, setDataNUser] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

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
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Userprofile();
  }, []);

  const editImageHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
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
                      <AvatarImage user_profile={dataNUser.user_profile} us_firstname={dataNUser.us_firstname} />
                    </label>

                    <div className="editImage">
                      <span className="idesing">
                        <i className="fas fa-pen-square"></i>
                      </span>
                    </div>

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
                <Personal
                  dataNUser={dataNUser}
                  selectedFile={selectedFile}
                  isFilePicked={isFilePicked}
                />
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
