import { Grid, TextField, Link } from "@mui/material";
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { DeleteForever, AddCircle} from "@mui/icons-material";

export default function Experience(props) {
  const [resume_experince_update, setExperience] = useState(props.experience);
  const [resume_experince_add, setExperince_Add] = useState([]);
  const d = new Date();

  const handleChange = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...resume_experince_update];

    if (name === "use_occupation") {
      values[i].use_occupation = value;
    } else if (name === "use_company") {
      values[i].use_company = value;
    } else if (name === "use_province") {
      values[i].use_province = value;
    } else if (name === "use_job_detail") {
      values[i].use_job_detail = value;
    }

    setExperience(values);
  };

  const handleChange2 = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...resume_experince_add];

    if (name === "use_occupation") {
      values[i].use_occupation = value;
    } else if (name === "use_company") {
      values[i].use_company = value;
    } else if (name === "use_province") {
      values[i].use_province = value;
    } else if (name === "use_job_detail") {
      values[i].use_job_detail = value;
    }

    setExperince_Add(values);
  };

  const handleChangeAdd = () => {
    const newContacts = {
      use_occupation: "",
      use_company: "",
      use_province: "",
      use_start: d,
      use_end: d,
      use_job_detail: ""
    };

    const newAddContacts = [...resume_experince_add, newContacts];

    setExperince_Add(newAddContacts);
  };

  const handleChangeDelete = (index) => {
    const values = [...resume_experince_update];
    const params = JSON.stringify({
      resume_experince_delete: [
        {
          use_id: values[index].use_id,
        },
      ],
    });
    // console.log(params);

    axios
      .post("resume/updateUserExperince", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(resume_experince_update);
        }
      })
      .catch((err) => console.log(err));

    if (values.length > 1) values.splice(index, 1); // splice(index, n, value) n=1 แทนที่ n=0 เพิ่ม value=ใส่่ข้อมูล

    setExperience(values);
  };

  const handleChangeDelete2 = (index) => {
    const values = [...resume_experince_add];
    // console.log(values.length);
    // if (values.length > 1)
    values.splice(index, 1); // splice(index, n, value) n=1 แทนที่ n=0 เพิ่ม value=ใส่่ข้อมูล
    // console.log(values);

    setExperince_Add(values);
  };

  const Setdate = (n, i, e) => {
    const values = [...resume_experince_update];
    // console.log(n + " " + i + ' ' + moment(e).format("YYYY-MM"));
    if (n === "use_start") {
      const startdate = moment(e).format("YYYY-MM-DD");
      if (moment(values[i].use_end).format("YYYY") > moment(e).format("YYYY")) {
        values[i].use_start = startdate;
      } else if (
        moment(values[i].use_end).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_end).format("MM") > moment(e).format("MM")) {
          values[i].use_start = startdate;
        } else if (
          moment(values[i].use_end).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_start = startdate;
        }
      }
    } else if (n === "use_end") {
      // values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
      const enddate = moment(e).format("YYYY-MM-DD");
      if (
        moment(values[i].use_start).format("YYYY") < moment(e).format("YYYY")
      ) {
        values[i].use_end = enddate;
      } else if (
        moment(values[i].use_start).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_start).format("MM") < moment(e).format("MM")) {
          values[i].use_end = enddate;
        } else if (
          moment(values[i].use_start).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_end = enddate;
        }
      }
    }

    setExperience(values);
    // console.log(experience);
  };


  const Setdate2 = (n, i, e) => {
    const values = [...resume_experince_add];
    // console.log(n + " " + i + ' ' + moment(e).format("YYYY-MM"));
    if (n === "use_start") {
      if (moment(values[i].use_end).format("YYYY") > moment(e).format("YYYY")) {
        values[i].use_start = moment(e).format("YYYY-MM-DD");
      } else if (
        moment(values[i].use_end).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_end).format("MM") > moment(e).format("MM")) {
          values[i].use_start = moment(e).format("YYYY-MM-DD");
        } else if (
          moment(values[i].use_end).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_start = moment(e).format("YYYY-MM-DD");
        }
      }
    } else if (n === "use_end") {
      // values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
      if (
        moment(values[i].use_start).format("YYYY") < moment(e).format("YYYY")
      ) {
        values[i].use_end = moment(e).format("YYYY-MM-DD");
      } else if (
        moment(values[i].use_start).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_start).format("MM") < moment(e).format("MM")) {
          values[i].use_end = moment(e).format("YYYY-MM-DD");
        } else if (
          moment(values[i].use_start).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_end = moment(e).format("YYYY-MM-DD");
        }
      }
    }

    setExperince_Add(values);
    // console.log(experience);
  };

  // console.log(experience);
  const handleSave2 = () => {
    const params = JSON.stringify({
      resume_experince_update,
      resume_experince_add,
    });

    // console.log(params);
    
      axios
      .post("resume/updateUserExperince", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("บันทึกเสร็จสิ้น");
        }
      })
      .catch((err) => console.log(err));
    
  };


  return (
    <>
      {resume_experince_update.map((rows, index) => (
        <Grid key={index}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="ตำแหน่งงาน"
                name="use_occupation"
                value={rows.use_occupation}
                onChange={(e) => handleChange(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="ชื่อบริษัท"
                name="use_company"
                value={rows.use_company}
                onChange={(e) => handleChange(e, index)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="จังหวัด"
                name="use_province"
                value={rows.use_province}
                onChange={(e) => handleChange(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                label="รายละเอียด"
                name="use_job_detail"
                value={rows.use_job_detail}
                onChange={(e) => handleChange(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  label="เดือนที่เริ่มทำงาน"
                  value={rows.use_start}
                  onChange={(e) => Setdate("use_start", index, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  label="เดือนที่สิ้นสุดทำงาน"
                  value={rows.use_end}
                  onChange={(e) => Setdate("use_end", index, e)}
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
                  onClick={() => handleChangeDelete(index)}
                />
              </Link>
            </Grid>
          </Grid>
          <hr />
        </Grid>
      ))}
      {resume_experince_add.map((rows, index) => (
        <Grid key={index}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="ตำแหน่งงาน"
                name="use_occupation"
                value={rows.use_occupation}
                onChange={(e) => handleChange2(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="ชื่อบริษัท"
                name="use_company"
                value={rows.use_company}
                onChange={(e) => handleChange2(e, index)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="จังหวัด"
                name="use_province"
                value={rows.use_province}
                onChange={(e) => handleChange2(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                label="รายละเอียด"
                name="use_job_detail"
                value={rows.use_job_detail}
                onChange={(e) => handleChange2(e, index)}
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  label="เดือนที่เริ่มทำงาน"
                  value={rows.use_start}
                  onChange={(e) => Setdate2("use_start", index, e)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  label="เดือนที่สิ้นสุดทำงาน"
                  value={rows.use_end}
                  onChange={(e) => Setdate2("use_end", index, e)}
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
                  onClick={() => handleChangeDelete2(index)}
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
        <button onClick={handleSave2} className="btn btn-success">
          <i className="fas fa-save"></i> บันทึก
        </button>
      </DialogActions>
    </>
  );
}
