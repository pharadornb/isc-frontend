import { TextField, Grid, Link } from "@mui/material";
import { DeleteForever, AddCircle } from "@mui/icons-material";
import { useState } from "react";
const thai = require("thai-data");

export default function BoxsStudy(props) {
  const [education, setEducation] = useState(props.education);

  const handleChangeAdd = (e) => {
    console.log(education);
    const values = [...education];
    console.log(values);

    const newContact = {
      usl_at: "",
      usl_end: 2022,
      usl_gpax: null,
      usl_name: "",
      usl_province: "",
      usl_start: 2022,
    };
    // console.log(newContacts);
    const newAddContacts = [...education, newContact];
    setEducation(newAddContacts);
  };

  const handleChangeDelete = (e) => {
    // console.log(education[e]);
    const values = [...education];
    // console.log(values.length);
    if (values.length > 1) values.splice(e, 1); // splice(index, n, value) n=1 แทนที่ n=0 เพิ่ม value=ใส่่ข้อมูล
    // console.log(values);

    setEducation(values);
  };

  const handleChange = (valueNew, i) => {
    const { name, value } = valueNew.target;
    const values = [...education];

    if (name === "usl_name") {
      values[i].usl_name = value;
    } else if (name === "usl_at") {
      values[i].usl_at = value;
    } else if (name === "usl_province") {
      values[i].usl_province = value;
    } else if (name === "usl_gpax") {
      values[i].usl_gpax = value;
    }else if (name === "usl_start") {
      values[i].usl_start = value;
    } else if (name === "usl_end") {
      values[i].usl_end = value;
    }

    setEducation(values);
  };

  const dateSet = (events) => {

  }

  return (
    <>
      {education.map((rows, i) => (
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
              <TextField
                fullWidth
                id="outlined-basic"
                label="ปีเริ่มการศึกษา"
                name="usl_start"
                value={rows.usl_start}
                onChange={(e) => handleChange(e, i)}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="เดือนที่สิ้นสุดทำงาน"
                name="usl_end"
                value={rows.usl_end}
                onChange={e => handleChange(e,i )}
                focused
              />
            </Grid>
            <Grid item xs={1}>
              <Link href="#" underline="none">
                <DeleteForever
                  fontSize="large"
                  onClick={() => handleChangeDelete(i)}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Link href="#" underline="none">
            <AddCircle color="success" onClick={() => handleChangeAdd()} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
