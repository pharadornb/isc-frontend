import React, { useState, useEffect } from "react";
import { TextField, Grid, InputAdornment } from "@mui/material";
import axios from "axios";
import moment from "moment";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";

export default function Personal(props) {
  const [dataNUser, setDataNUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const UserProfiles = () => {
    axios
      .post("resume/user_profile", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(dataNUser);
          setDataNUser(res.data[0]);
          
          setLoading(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    UserProfiles();
  },[]);

  const [selectedFile, setSelectedFile] = useState("");
  const isFilePicked = useState(props.isFilePicked);
  // console.log(isFilePicked);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
        setSelectedFile(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  

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
    convertBase64(props.selectedFile);
    const profiles = selectedFile.split(",");
    // console.log(profiles[1]);

    // const params = JSON.stringify({
    //   user_email: dataNUser.user_email,
    //   user_profile: profiles[1],
    //   user_tel: dataNUser.user_tel,
    //   user_dob: dataNUser.user_dob,
    //   user_address: dataNUser.user_address,
    //   user_subdistrict: dataNUser.user_subdistrict,
    //   user_district: dataNUser.user_district,
    //   user_province: dataNUser.user_province,
    //   user_postcode: dataNUser.user_postcode,
    //   user_slogan: dataNUser.user_slogan,
    //   us_firstname: dataNUser.us_firstname,
    //   us_lastname: dataNUser.us_lastname,
    //   us_com_address: dataNUser.us_com_address,
    //   us_com_subdistrict: dataNUser.us_com_subdistrict,
    //   us_com_district: dataNUser.us_com_district,
    //   us_com_province: dataNUser.us_com_province,
    //   us_com_postcode: dataNUser.us_com_postcode,
    //   us_com_github: dataNUser.us_com_github,
    //   us_com_linkedin: dataNUser.us_com_linkedin,
    //   us_com_facebook: dataNUser.us_com_facebook,
    //   us_com_youtube: dataNUser.us_com_youtube
    // });

    // console.log(params);

    if (isFilePicked[0] === true) {
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
            console.log(dataNUser);
            UserProfiles();
          }
        })
        .catch((err) => console.log(err));
      console.log("Push image");
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
            console.log(dataNUser);
            UserProfiles();
          }
        })
        .catch((err) => console.log(err));

      console.log("No image");
    }
  };

  return (
    <>
      {loading === false && <CircularProgress />}
      {loading === true && (
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
          <DialogActions>
            <button onClick={handleSave} className="btn btn-success">
              <i className="fas fa-save"></i> บันทึก
            </button>
          </DialogActions>
        </>
      )}
    </>
  );
}
