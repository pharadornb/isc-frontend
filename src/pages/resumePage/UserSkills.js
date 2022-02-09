import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomContentProgressbar from "./CustomContentProgressbar";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

export default function UserSkill() {
  const [userSkill, setUserSkill] = useState([]);
  const [skilltypes, setSkillTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const UserSkillandTypeData = () => {
    try {
      axios
        .post("skill/skill_types", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setSkillTypes(res.data);
            setLoading2(true);
          }
        });
    } catch (err) {
      console.log(err);
    }

    try {
      axios
        .post("skill/userSkill", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setUserSkill(res.data);
            setLoading(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserSkillandTypeData();
  }, []);



  // console.log(userSkill);
  // console.log(skilltypes);

  const onShowHides = (e, index) => {
    // console.log(e + " " + j);
    var userskillishide = userSkill[index].user_skill_ishide;
    const user_skill_id = userSkill[index].user_skill_id;

    // console.log(userskillishide + " " + user_skill_id);

    if (userskillishide === "yes") {
      userskillishide = "no";
    } else if (userskillishide === "no") {
      userskillishide = "yes";
    }

    // console.log(userskillishide + " " + user_skill_id);

    const params = JSON.stringify({
      resume_skill_hide: [
        {
          user_skill_ishide: userskillishide,
          user_skill_id: user_skill_id,
        },
      ],
    });

    console.log(params);

    axios
      .post("resume/updateUserSkill", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          UserSkillandTypeData();
          console.log(userSkill);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid>
      {loading2 === false && <CircularProgress />}
      {skilltypes.map((rows1, i) => (
        <Grid container spacing={2} sx={{ p: 2 }} key={i}>
          <Grid item xs={3}>
            <b>{rows1.skill_type_name}</b>
          </Grid>
          <Grid item xs={9}>
            {loading === false && <CircularProgress />}
            <Grid container spacing={2} sx={{ p: 2 }}>
              {userSkill.map((rows2, j) => (
                <div key={j}>
                  {rows1.skill_type_name === rows2.skill_type_name && (
                    <Grid item xs={3}>
                      {rows2.user_skill_ishide === "no" && (
                        <div className="col-3 Progressbox ">
                          <CustomContentProgressbar
                            percentage={rows2.user_skill_point}
                          >
                            <div>
                              <img
                                className="Sizeimg1"
                                alt={rows2.skill_name}
                                src={`data:image/jpeg;base64,${rows2.skill_logo}`}
                              />
                            </div>
                          </CustomContentProgressbar>
                          <div>
                            <span className="txtname">{rows2.skill_name}</span>
                            <img
                              src={`data:image/jpeg;base64,${rows2.user_profile}`}
                              alt={rows2.skill_name}
                              style={{
                                width: "20px",
                                height: "20px",
                                overflow: "hidden",
                              }}
                            />
                          </div>
                          <label>
                            <a
                              className="P_showSkilk"
                              href="##"
                              onClick={(e) => onShowHides(e, j)}
                            >
                              {rows2.user_skill_ishide === "no" && (
                                <i className="fas fa-eye"></i>
                              )}
                              {rows2.user_skill_ishide === "yes" && (
                                <i className="fas fa-eye-slash"></i>
                              )}
                            </a>
                          </label>
                        </div>
                      )}

                      {rows2.user_skill_ishide === "yes" && (
                        <div className="col-3 Progressbox alpha-image">
                          <CustomContentProgressbar
                            percentage={rows2.user_skill_point}
                          >
                            <div>
                              <img
                                className="Sizeimg1"
                                alt={rows2.skill_name}
                                src={`data:image/jpeg;base64,${rows2.skill_logo}`}
                              />
                            </div>
                          </CustomContentProgressbar>
                          <div>
                            <span className="txtname">{rows2.skill_name}</span>
                            <img
                              src={`data:image/jpeg;base64,${rows2.user_profile}`}
                              alt={rows2.skill_name}
                              style={{
                                width: "20px",
                                height: "20px",
                                overflow: "hidden",
                              }}
                            />
                          </div>
                          <label>
                            <a
                              className="P_showSkilk"
                              href="##"
                              onClick={(e) => onShowHides(e, j)}
                            >
                              {rows2.user_skill_ishide === "no" && (
                                <i className="fas fa-eye"></i>
                              )}
                              {rows2.user_skill_ishide === "yes" && (
                                <i className="fas fa-eye-slash"></i>
                              )}
                            </a>
                          </label>
                        </div>
                      )}
                    </Grid>
                  )}
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
