import { TextField, Grid, Link } from "@mui/material";
import { DeleteForever, AddCircle } from "@mui/icons-material";
import React, { useState } from "react";
import moment from "moment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";

// const thai = require("thai-data");

export default function BoxsStudy(props) {
  const [resume_education_update, setEducation] = useState(props.education);
  const date = new Date().getFullYear();
  const [resume_education_add, setNewData] = useState([]);

  const handleChangeAdd = (e) => {
    //console.log(education);
    // const values = [...education];
    // console.log(values);

    //console.log(date);

    const newContact = {
      usl_at: "",
      usl_end: date,
      usl_gpax: 0,
      usl_name: "",
      usl_province: "",
      usl_start: date
    };

    // console.log(newContact);
    const newAddContacts = [...resume_education_add, newContact];

    // console.log(newAddContacts);
    setNewData(newAddContacts);
  };

  const handleChangeDelete = (index) => {
    
    const values = [...resume_education_update];
    // console.log(values[index]);
    // console.log(values.length);
    
    // console.log(index);

    const params = JSON.stringify({
      resume_education_delete: [{
        usl_id: values[index].usl_id
      }]
    });
    // console.log(params);
    
    axios
      .post("resume/updateUserEducation", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(resume_education_update);
        }
      })
      .catch((err) => console.log(err));

    if (values.length > 1) values.splice(index, 1); // splice(index, n, value) n=1 แทนที่ n=0 เพิ่ม value=ใส่่ข้อมูล

    setEducation(values);
  };

  const handleChangeDelete2 = (e) => {
    // console.log(education[e]);
    const values = [...resume_education_add];
    // console.log(values.length);
    // if (values.length > 1) 
    values.splice(e, 1); // splice(index, n, value) n=1 แทนที่ n=0 เพิ่ม value=ใส่่ข้อมูล
    // console.log(values);

    setNewData(values);
  };

  const handleChange = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...resume_education_update];

    if (name === "usl_name") {
      values[i].usl_name = value;
    } else if (name === "usl_at") {
      values[i].usl_at = value;
    } else if (name === "usl_province") {
      values[i].usl_province = value;
    } else if (name === "usl_gpax") {
      values[i].usl_gpax = value;
    }

    setEducation(values);
  };

  const handleChange2 = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...resume_education_add];

    if (name === "usl_name") {
      values[i].usl_name = value;
    } else if (name === "usl_at") {
      values[i].usl_at = value;
    } else if (name === "usl_province") {
      values[i].usl_province = value;
    } else if (name === "usl_gpax") {
      values[i].usl_gpax = value;
    }

    setNewData(values);
  };

  const Setdate = (n, i, e) => {
    const values = [...resume_education_update];

    // console.log(n + " " + i + ' ' + moment(e).format("YYYY"));
    if (n === "usl_start") {
      const startdateYear = parseInt(moment(e).format("YYYY"));
      // const enddateYear = parseInt(moment(values[i].usl_end).format("YYYY"));
      // console.log(startdateYear + " " + enddateYear);
      values[i].usl_start = startdateYear;
      setEducation(values);
    } else if (n === "usl_end") {
      // const startdateYear = parseInt(moment(values[i].usl_start).format("YYYY"));
      const enddateYear = parseInt(moment(e).format("YYYY"));

      values[i].usl_end = enddateYear;
      setEducation(values);
    }

    // console.log(education);
  };

  const Setdate2 = (n, i, e) => {
    const values = [...resume_education_add];

    // console.log(n + " " + i + ' ' + moment(e).format("YYYY"));
    if (n === "usl_start") {
      const startdateYear = parseInt(moment(e).format("YYYY"));
      // const enddateYear = parseInt(moment(values[i].usl_end).format("YYYY"));
      // console.log(startdateYear + " " + enddateYear);

      values[i].usl_start = startdateYear;
    } else if (n === "usl_end") {
      // const startdateYear = parseInt(
      //   moment(values[i].usl_start).format("YYYY")
      // );
      const enddateYear = parseInt(moment(e).format("YYYY"));

      values[i].usl_end = enddateYear;
    }

    setNewData(values);
    // console.log(education);
  };

  // Add / Edit Data in API
  const handleSave = () => {
    console.log(resume_education_update);

    const params = JSON.stringify({
      resume_education_update,
      resume_education_add,

    });
    // console.log(params);

    axios
      .post("resume/updateUserEducation", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(resume_education_update);
        }
      })
      .catch((err) => console.log(err));

    setEducation(resume_education_update);
  };

  return (
    <>
      {/* Education Show Data */}
      {resume_education_update.map((rows, i) => (
        <Grid key={i}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="วุฒิที่ได้รับ"
                name="usl_name"
                value={rows.usl_name}
                onChange={(e) => handleChange(e, i)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="สถานที่ศึกษา"
                name="usl_at"
                value={rows.usl_at}
                onChange={(e) => handleChange(e, i)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="จังหวัด"
                name="usl_province"
                value={rows.usl_province}
                onChange={(e) => handleChange(e, i)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="เกรดเฉลี่ย"
                name="usl_gpax"
                value={rows.usl_gpax}
                onChange={(e) => handleChange(e, i)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="เดือนที่เริ่มทำงาน"
                  value={rows.usl_start.toString()}
                  onChange={(e) => Setdate("usl_start", i, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="เดือนที่สิ้นสุดทำงาน"
                  value={rows.usl_end.toString()}
                  onChange={(e) => Setdate("usl_end", i, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <Link href="##" underline="none">
                <DeleteForever
                  fontSize="large"
                  onClick={() => handleChangeDelete(i)}
                />
              </Link>
            </Grid>
          </Grid>
          <hr />
        </Grid>
      ))}
      {/* Education Show Data Now */}
      {resume_education_add.map((rows, i) => (
        <Grid key={i}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="วุฒิที่ได้รับ"
                name="usl_name"
                value={rows.usl_name}
                onChange={(e) => handleChange2(e, i)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="สถานที่ศึกษา"
                name="usl_at"
                value={rows.usl_at}
                onChange={(e) => handleChange2(e, i)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="จังหวัด"
                name="usl_province"
                value={rows.usl_province}
                onChange={(e) => handleChange2(e, i)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="เกรดเฉลี่ย"
                name="usl_gpax"
                value={rows.usl_gpax}
                onChange={(e) => handleChange2(e, i)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="เดือนที่เริ่มทำงาน"
                  value={rows.usl_start.toString()}
                  onChange={(e) => Setdate2("usl_start", i, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="เดือนที่สิ้นสุดทำงาน"
                  value={rows.usl_end.toString()}
                  onChange={(e) => Setdate2("usl_end", i, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <Link href="##" underline="none">
                <DeleteForever
                  fontSize="large"
                  onClick={() => handleChangeDelete2(i)}
                />
              </Link>
            </Grid>
          </Grid>
          <hr />
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Link href="##" underline="none">
            <AddCircle color="success" onClick={() => handleChangeAdd()} />
          </Link>
        </Grid>
      </Grid>
      <DialogActions>
        <button onClick={handleSave} className="btn btn-success">
          <i className="fas fa-save"></i> บันทึก
        </button>
      </DialogActions>
    </>
  );
}
