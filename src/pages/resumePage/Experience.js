import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

export default function Experience(props) {
  const [experience, setExperience] = useState(props.experience);

  const handleChange = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...experience];

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

  const Setdate = (n, i, e) => {
    const values = [...experience];
    // console.log(n + " " + i + ' ' + moment(e).format("YYYY-MM"));
    if (n === "use_start") {
      if (moment(values[i].use_end).format("YYYY") > moment(e).format("YYYY")) {
        values[i].use_start = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
      } else if (
        moment(values[i].use_end).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_end).format("MM") > moment(e).format("MM")) {
          values[i].use_start = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
        } else if (
          moment(values[i].use_end).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_start = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
        }
      }
    } else if (n === "use_end") {
      // values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
      if (
        moment(values[i].use_start).format("YYYY") < moment(e).format("YYYY")
      ) {
        values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
      } else if (
        moment(values[i].use_start).format("YYYY") === moment(e).format("YYYY")
      ) {
        if (moment(values[i].use_start).format("MM") < moment(e).format("MM")) {
          values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
        } else if (
          moment(values[i].use_start).format("MM") === moment(e).format("MM")
        ) {
          values[i].use_end = moment(e).format("YYYY-MM-DDT00:00:00.000Z");
        }
      }
    }

    setExperience(values);
    console.log(experience);
  };

  console.log(experience);

  return (
    <>
      {experience.map((rows, index) => (
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          </Grid>
        </Grid>
      ))}
    </>
  );
}
