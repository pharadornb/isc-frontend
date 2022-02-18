import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../../css/CompanyDashboard.css";
import bgShow from "../../img/morning 1.png";
import CommunicationSkillIcon from "../../img/think-icon.PNG";
import MorningIcon from "../../img/money2.PNG";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment";
import "moment/locale/th";
import { Table } from "react-bootstrap";
import PaginationTable from "../../component/SkillComponent/PaginationTable";
import SearchTable from "../../component/SkillComponent/SearchTable";
import Swal from "sweetalert2";

export default function CompanyDashboardContent() {
  const [datacount1, setDatacount1] = useState([]);
  const [datacount2, setDatacount2] = useState([]);

  const [yourSkillByUser, setYourSkillByUser] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;

  const UpdateCount = () => {
    try {
      axios
        .post("summarize_company/count", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            setDatacount1(res.data.skill_data[0].skill);
            setDatacount2(res.data.your_skill_data[0].your_skill);
          }
        });
      // setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const DatayourSkillByUser = () => {
    try {
      axios
        .post("skill/yourSkillByUser", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setYourSkillByUser(res.data);
          }
        });
      // setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const Hello = () => {
    const a = moment().format("a");
    const h = moment().format("h");
    console.log(h);
    if (a === "am") {
      return "สวัสดีตอนเช้า";
    } else if (a === "pm") {
      if (h > 0 && h <= 6) return "สวัสดีตอนบ่าย";
      else if (h > 6 && h <= 12) return "สวัสดีตอนเย็น";
      else return "สวัสดี Error!!!";
    } else {
      return "สวัสดี Error!!!";
    }
    // console.log(parseInt(hh));
  };

  useEffect(() => {
    UpdateCount();
    DatayourSkillByUser();
  }, []);

  const SkillByUser = useMemo(() => {
    let computedComments = yourSkillByUser;

    if (search) {
      computedComments = computedComments.filter((comment) =>
        comment.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [yourSkillByUser, currentPage, search]);

  const header = [
    { name: "อันดับ" },
    { name: "ชื่อผู้รับบริการ" },
    { name: "ชื่อทักษะ" },
    { name: "คะแนนทักษะ" },
    { name: "Resume User" },
  ];

  const onCheckUser = (key) => {
      if(key !== "" || key !== null){
        window.location="/resume_user/"+ key;
      }else{
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่พบข้อมูลของผู้บริการ....!'
          })
      }
  }

  return (
    <div className="boxC-02">
      <div className="container ">
        <div className="boxC-02-00">
          <img src={bgShow} className="boxC-02-01" alt="Trulli"></img>
          <div className="boxC-02-01-00">
            <label className="boxC-02-01-txt1">
              <Hello />
            </label>
            <br></br>
            <label className="boxC-02-01-txt2">ยินดีต้อนรับเข้าสู่บริการ </label>
            <br></br>
            <label className="boxC-02-01-txt3">
              iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 ld">
            <div className="inBoxC">
              <div className="inBoxC1">
                <img
                  src={CommunicationSkillIcon}
                  className="inBoxC101"
                  alt="Trulli"
                ></img>
                <label className="inBoxC102">
                  <b>คลังทักษะสร้าง</b>
                </label>
              </div>
              <div className="row inBoxC2">
                <label className="col-6 inBoxC201">
                  <b>{datacount1}</b>
                </label>
                <a href="##" className="col-6 inBoxC202">
                  <ArrowForwardIosIcon style={{ fontSize: 50 }} />
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 ld">
            <div className="inBoxC">
              <div className="inBoxC1">
                <img src={MorningIcon} className="inBoxC101" alt="Trulli"></img>
                <label className="inBoxC102">
                  <b>คลังสะสมทักษะของคุณ</b>
                </label>
              </div>
              <div className="row inBoxC2">
                <label className="col-6 inBoxC201">
                  <b>{datacount2}</b>
                </label>
                <a href="##" className="col-6 inBoxC202">
                  <ArrowForwardIosIcon style={{ fontSize: 50 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="boxCompanyByUser overflow-auto">
                <h3 className="FLeft pLeft-Right"><b>ผู้รับบริการล่าสุด</b></h3>
              <div className="inputSearchCo">
                <SearchTable
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="BClear "/>
              <Table>
                <thead>
                  <tr>
                    {header.map((rows, index) => (
                      <th key={index}> {rows.name} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SkillByUser.map((rows, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{rows.name === null ? <label style={{ color: 'red' }}>ไม่มีข้อมูล</label> : rows.name }</td>
                      <td>{rows.skill_name}</td>
                      <td>{rows.user_skill_point}</td>
                      <td>
                        <button className="btn btn-outline-secondary" onClick={()=>onCheckUser(rows.user_key)}>
                          <b>ตรวจสอบ Rusume</b>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PaginationTable
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
