import { useEffect, useState, useMemo } from "react";
import { TextField, Avatar } from "@mui/material";
import axios from "axios";
import PaginationTable from "../../component/SkillComponent/PaginationTable";
import SearchTable from "../../component/SkillComponent/SearchTable";
import HeaderTable from "../../component/SkillComponent/HeaderTable";
import { Table, Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import CustomContentProgressbar from "./CustomContentProgressbar";
// import { textAlign } from "@mui/system";

export default function SkillRequire(props) {
  const [position_Require] = useState(props.position_Require[props.index]); // setPositionRequire

  // Select API SkillRequire
  // const [dataSkills] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);

  const [comments, setComments] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [showLoading, setShowLoading] = useState(false)
  const ITEMS_PER_PAGE = 5;

  var [ucre_detail, setDatail] = useState(position_Require.ucre_detail);
  var [ucre_occupation, setOccupation] = useState(
    position_Require.ucre_occupation
  );
  var [ucre_salary, setSalary] = useState(position_Require.ucre_salary);

  const [open, setOpen] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const [getskill, setSkill] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);

  // -----------------------------------------------------------------------------------

  useEffect(() => {
    if (position_Require.ucre_id !== "") {
      const params = JSON.stringify({
        ucre_id: position_Require.ucre_id,
      });

      axios
        .post("resume/companySkillRequire", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res2) => {
          if (res2.status === 200) {
            setData(res2.data);
            console.log(res2.data);
            setLoading2(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
    }

    ViewSkills();
  }, [position_Require.ucre_id]);
  // End funtion SkillRequire

  // ---------------------------------------------------------------------

  const Again = () => {
    setLoading2(true);
    setLoading1(true);
    console.log("Delete DataNew");
    for (let i = 0; i < dataNew.length; i++) {
      const vals = [...dataNew];
      console.log(vals);

      vals.splice(0, 1);
      setDataNew(vals);

      if (position_Require.ucre_id !== "") {
        const params = JSON.stringify({
          ucre_id: position_Require.ucre_id,
        });

        axios
          .post("resume/companySkillRequire", params, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res2) => {
            if (res2.status === 200) {
              setData(res2.data);
              console.log(res2.data);
              setLoading2(false);
              setLoading1(false);
            }
          })
          .catch((err) => console.log(err));
      } else {
      }
    }
  };

  //-----------------------------------------------------------------------
  const ViewSkills = () => {
    axios
      .post("skill/viewSkill", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
        // setShowLoading(false)
      })
      .catch((err) => console.log(err));
  };

  // ------------------------------------------------------------------------------------------

  const headers = [
    { name: "สัญลักษณ์", field: "skill_logo", sortable: false },
    { name: "ชื่อทักษะ", field: "skill_name", sortable: false },
    { name: "โดย", field: "uc_name_profile", sortable: false },
    { name: "กลุ่มทักษะ", field: "skill_type_name", sortable: false },
    { name: "เวลาทดสอบ(นาที)", field: "skill_time", sortable: false },
    { name: "ระดับทักษะ", field: "skill_hard", sortable: false },
    { name: "ราคา(บาท)", field: "skill_credit", sortable: false },
    { name: "เพิ่มลงคลังทักษะ", field: "", sortable: false },
  ];

  // -----------------------------------------------------------------------------------------

  const skillStoreData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.skill_name.toLowerCase().includes(search.toLowerCase()) ||
          comment.skill_type_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search]);

  // ----------------------------------------------------------------------------------------------

  const handleChangeNew = (e) => {
    const { name, value } = e.target;

    console.log(name + " " + value);

    if (name === "ucre_occupation") {
      setOccupation(value);
      console.log(name);
    } else if (name === "ucre_salary") {
      setSalary(value);
      console.log(name);
    } else if (name === "ucre_detail") {
      setDatail(value);
      console.log(name);
    }

    setOpen(true);
  };

  // ---------------------------------------------------------------------------------------------

  const handleClickOpen = (skill_id, user_profile, skill_logo, skill_name) => {
    setLoading1(true);

    setLgShow(false);

    Swal.fire({
      title: "คะแนนที่คุณคาดหวัง",
      input: "number",
      inputAttributes: {
        min: 0,
        max: 100,
      },
      showCancelButton: true,
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(result.value);
        Swal.fire({
          title: `คะแนนที่คุณต้องการ<br/>${result.value} คะแนน<br/>ของวิชา ${skill_name}`,
          imageUrl: `data:image/jpeg;base64,${user_profile}`,
          imageHeight: 100,
          imageWidth: 100,
          imageClass: "inImge",
          animation: false,
        });

        dataNew.push({
          skill_id: skill_id,
          user_profile: user_profile,
          skill_logo: skill_logo,
          skill_name: skill_name,
          ucrs_point: parseInt(result.value),
        });
        // console.log(dataNew);
        setLoading1(false);
        setLgShow(false);
        setOpen(true);
        // setDataNew(dataNew);
      }
    });
  };

  // ------------------------------------------------------------------------

  const deleteSkill = (index, status) => {
    // console.log(status);
    if (status === "new") {
      // console.log(status);
      // console.log(index);
      const val = [...dataNew];

      val.splice(index, 1);
      setDataNew(val);
      // console.log(val);
    } else if (status === "old") {
      // console.log(status);

      const params = JSON.stringify({
        skill: [
          {
            skill_id: data[index].skill_id,
            ucrs_point: data[index].ucrs_point,
            ucrs_isdelete: "yes",
            ucrs_id: data[index].ucrs_id,
          },
        ],
      });

      console.log(params);

      axios
        .post("resume/updateDeleteSkill", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // setData(res2.data);

            // setLoading2(false);
            const val = [...data];
            val.splice(index, 1);
            setData(val);
            console.log("Delete Skill !!!!");
            setOpen(true);
          }
        })
        .catch((err) => console.log(err));

      // End Else IF Check = old
    }
  };

  // -------------------------------------------------------------------------------------

  const skillData = (skilldata) => {
    // console.log(skilldata);
    setSkill(skilldata);

    const params = JSON.stringify({
      skill_id: skilldata.skill_id,
    });

    // console.log(JSON.parse(params));

    axios
      .post("skill/viewSkillAttritude", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.obj);
          setDataSkill(res.data.obj);
          setLgShow(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // ---------------------------------------------------------------------------------

  const handleSubmit = () => {
    if (props.page === "new") {
      //addCompanyPosition---------------
      const params1 = JSON.stringify({
        position: [
          {
            ucre_occupation: ucre_occupation,
            ucre_detail: ucre_detail,
            ucre_salary: ucre_salary,
          },
        ],
      });

      // console.log(JSON.parse(params1));

      axios
        .post("resume/addCompanyPosition", params1, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Add Position!!!!");
            // addPositionSkill-----------------------
            for (let i = 0; i < dataNew.length; i++) {
              const params2 = JSON.stringify({
                ucre_occupation: ucre_occupation,
                ucre_detail: ucre_detail,
                skill: [
                  {
                    skill_id: dataNew[i].skill_id,
                    ucrs_point: parseInt(dataNew[i].ucrs_point),
                  },
                ],
              });

              // console.log(JSON.parse(params2));

              axios
                .post("resume/addPositionSkill", params2, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    console.log("Add Position Skill !!!!");
                    setOpen(false);
                  }
                })
                .catch((err) => console.log(err));
            }
            Again();

            Swal.fire("บันทึกเรียบร้อย", "ขอบคุณที่ใช้บริการ", "success");
            //End Select API addPositionSkill
          }
        })
        .catch((err) => console.log(err));

      //End Select API addCompanyPosition
    } else if (props.page === "old") {
      // ------------------------------------------------------------------

      const params1 = JSON.stringify({
        position: [
          {
            ucre_occupation: ucre_occupation,
            ucre_detail: ucre_detail,
            ucre_salary: ucre_salary,
            ucre_isdelete: "no",
            ucre_id: position_Require.ucre_id,
          },
        ],
      });

      // console.log(JSON.parse(params1));

      axios
        .post("resume/updateDeletePosition", params1, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Add Position!!!!");
            // addPositionSkill-----------------------
            if (dataNew.length !== 0) {
              for (let i = 0; i < dataNew.length; i++) {
                const params2 = JSON.stringify({
                  ucre_occupation: ucre_occupation,
                  ucre_detail: ucre_detail,
                  skill: [
                    {
                      skill_id: dataNew[i].skill_id,
                      ucrs_point: parseInt(dataNew[i].ucrs_point),
                    },
                  ],
                });

                // console.log(JSON.parse(params2));

                axios
                  .post("resume/addPositionSkill", params2, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      console.log("Add Position Skill !!!!");

                      setOpen(false);
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }

            Again();
            Swal.fire("บันทึกเรียบร้อย", "ขอบคุณที่ใช้บริการ", "success");
            //End Select API addPositionSkill
          }
        })
        .catch((err) => console.log(err));

      //End Select API addCompanyPosition
    }
  };

  return (
    <div className="col-12 ">
      {" "}
      {/*Skill Require */}
      <div className="m10">
        <div className="row">
          <label
            className="col-md-6 col-lg-3 txtBoxRequire"
            style={{ textAlign: "right" }}
          >
            ตำเเหน่งงาน :{" "}
          </label>
          <div className="col-md-6 col-lg-3">
            <TextField
              id="outlined-basic"
              label="Position"
              name="ucre_occupation"
              variant="outlined"
              margin="normal"
              value={ucre_occupation}
              onChange={(newValue) => handleChangeNew(newValue)}
            />
          </div>
          <label
            className="col-md-6 col-lg-3 txtBoxRequire"
            style={{ textAlign: "right" }}
          >
            เงินประจำเดือน :
          </label>
          <div className="col-md-6 col-lg-3">
            <TextField
              id="outlined-basic"
              label="Salary"
              name="ucre_salary"
              margin="normal"
              variant="outlined"
              value={ucre_salary}
              onChange={(newValue) => handleChangeNew(newValue)}
            />
          </div>
          <div className="col-12">
            <br />
          </div>
          <label className="col-12">
            <b>รายละเอียดงาน</b>
          </label>
          <div className="col-12">
            <TextField
              id="outlined-multiline-flexible"
              label="Job Detail"
              fullWidth
              multiline
              name="ucre_detail"
              maxRows={4}
              margin="normal"
              value={ucre_detail}
              onChange={(newValue) => handleChangeNew(newValue)}
            />
          </div>
          <div className="col-12">
            <br />
          </div>
        </div>

        <div className="row borderBox overflow-auto" align={"center"}>
          {/* {props.ucre_id} */}
          {loading2 === false &&
            data.map((rows, index) => (
              <label
                className="col-sm-4 col-md-3 col-lg-1 boxSkilsRequire p-relative"
                style={{ width: 120 }}
                key={index}
              >
                <i
                  className="fas fa-minus-circle deleteItem"
                  onClick={() => deleteSkill(index, "old")}
                />
                <span className="txtShow">Old</span>
                <div>
                  <Avatar
                    alt={rows.skill_name}
                    className="avatarL"
                    src={`data:image/jpeg;base64,${rows.user_profile}`}
                    sx={{ width: 20, height: 20 }}
                  />
                  <CustomContentProgressbar percentage={rows.ucrs_point}>
                    <Avatar
                      alt={rows.skill_name}
                      // className="maginLeftRight-center"
                      src={`data:image/jpeg;base64,${rows.skill_logo}`}
                      sx={{ width: 75, height: 75, mt: 11.8 }}
                    />
                  </CustomContentProgressbar>
                </div>
                <p style={{ marginTop: 100 }}>{rows.skill_name}</p>
              </label>
            ))}
          {loading1 === false &&
            dataNew.map((rows, index) => (
              <label
                className="col-sm-4 col-md-3 col-lg-1 boxSkilsRequire p-relative"
                style={{ width: 120 }}
                key={index}
              >
                <div>
                  <i
                    className="fas fa-minus-circle deleteItem"
                    onClick={() => deleteSkill(index, "new")}
                  />
                  <span className="txtShow1">New</span>
                  <Avatar
                    alt={rows.skill_name}
                    className="avatarL"
                    src={`data:image/jpeg;base64,${rows.user_profile}`}
                    sx={{ width: 20, height: 20 }}
                  />
                  <CustomContentProgressbar percentage={rows.ucrs_point}>
                    <Avatar
                      alt={"ddd"}
                      // className="maginLeftRight-center"
                      src={`data:image/jpeg;base64,${rows.skill_logo}`}
                      sx={{ width: 75, height: 75, mt: 11.8 }}
                    />
                  </CustomContentProgressbar>
                </div>
                <p style={{ marginTop: 100 }}>{rows.skill_name}</p>
              </label>
            ))}
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <div className="row">
              <div className="col-md-4" align={"left"}>
                <p style={{ fontSize: "24px" }}>
                  <i className="fab fa-slack" style={{ fontSize: "1em" }} />
                  <b> เลือกทักษะ</b>
                </p>
              </div>
              <div className="col-md-8 d-flex flex-row-reverse">
                <SearchTable
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="col-12 overflow-auto">
              <Table className="table table-striped">
                <HeaderTable headers={headers} />
                <tbody>
                  {skillStoreData.map((comment, index) => (
                    <tr key={comment.skill_id}>
                      <td style={{ pointerEvents: "none" }}>
                        <label className="margin-auto">
                          <Avatar
                            alt={comment.skill_name}
                            src={`data:image/jpeg;base64,${comment.skill_logo}`}
                            sx={{ width: 50, height: 50 }}
                          />
                        </label>
                      </td>
                      <td>{comment.skill_name}</td>
                      <td>{comment.uc_name}</td>
                      <td>{comment.skill_type_name}</td>
                      <td>{comment.skill_time}</td>
                      <td>
                        {comment.skill_hard === 1 && <p>ค่อนข้างง่าย</p>}
                        {comment.skill_hard === 2 && <p>ง่าย</p>}
                        {comment.skill_hard === 3 && <p>ปานกลาง</p>}
                        {comment.skill_hard === 4 && <p>ค่อนข้างยาก</p>}
                        {comment.skill_hard === 5 && <p>ยาก</p>}
                      </td>
                      <td>{comment.skill_credit}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            skillData(comment);
                          }}
                        >
                          <i className="fas fa-plus-circle" /> เพิ่ม
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <PaginationTable
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <div className="col-12 txtAlignLeft">
            <button
              type="submit"
              disabled={open === true ? false : true}
              className={
                open === true ? "btn btn-success" : "btn btn-secondary"
              }
              onClick={handleSubmit}
            >
              <i className="far fa-save" /> บันทึกเอกสาร
            </button>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div className="container">
            <div className="row">
              <div className="col-2">
                <div style={{ textAlign: "center" }}>
                  <label>
                    <Avatar
                      alt={getskill.skill_name}
                      className="avatarDialogR"
                      src={`data:image/jpeg;base64,${getskill.skill_logo}`}
                      style={{ maxWidth: 60, maxHeight: 60 }}
                    />
                  </label>
                  <div>
                    <b>{getskill.skill_name}</b>
                  </div>
                </div>
              </div>
              <div className="col-10">
                <div>
                  <h3 className="R-txtName">{getskill.uc_name}</h3>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <label className="col-3">
                <b>ชื่อทักษะ:</b> {getskill.skill_name}
              </label>
              <label className="col-5">
                <b>กลุ่มทักษะ:</b> {getskill.skill_type_name}
              </label>
              <label className="col-4">
                <b>ระดับทักษะ:</b> {getskill.skill_hard === 1 && "ค่อนข้างง่าย"}
                {getskill.skill_hard === 2 && "ง่าย"}
                {getskill.skill_hard === 3 && "ปานกลาง"}
                {getskill.skill_hard === 4 && "ค่อนข้างยาก"}
                {getskill.skill_hard === 5 && "ยาก"}
              </label>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="box-title-R">
                  <label className="design-R">
                    <b>รายละเอียดทักษะ</b>
                  </label>
                  <div className="line-R" />
                </div>

                <ul>
                  <li className="txt-R">{getskill.skill_detail}</li>
                </ul>
              </div>
              <div className="col-12">
                <div className="box-title-R">
                  <label className="design-R">
                    <b>ตัวชี้วัดเเบบทดสอบ</b>
                  </label>
                  <div className="line-R" />
                </div>
              </div>
              <div className="col-12">
                <ol>
                  {dataSkill.map((row, index) => (
                    <li className="txt-R" key={index}>
                      {" "}
                      {row.skill_exam_objective}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLgShow(false)}>
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleClickOpen(
                getskill.skill_id,
                getskill.user_profile,
                getskill.skill_logo,
                getskill.skill_name
              )
            }
          >
            เพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
