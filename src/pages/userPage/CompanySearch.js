import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../component/configComponent/SidebarChild";
import axios from "axios";
import PaginationTable from "../../component/SkillComponent/PaginationTable";
import SearchTable from "../../component/SkillComponent/SearchTable";
// import HeaderTable from "../../component/SkillComponent/HeaderTable";
import { Table } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
// import { Avatar } from "@mui/material";

export default function CompanySearch() {
  const [searchPositionCompany, setSearchPositionCompany] = useState([]);
  const [searchProfileCompany, setSearchProfileCompany] = useState([]);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [totalItems2, setTotalItems2] = useState(0);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [search2, setSearch2] = useState("");

  const ITEMS_PER_PAGE = 5;

  const headers = [
    { name: "อันดับ" },
    { name: "ชื่อบริษัท" },
    { name: "อาชีพ" },
    { name: "เงินเดือน" },
    { name: "" },
  ];

  const headers2 = [
    { name: "อันดับ" },
    { name: "ชื่อบริษัท" },
    { name: "ประเภทงาน" },
    { name: "สถานที่" },
    { name: "" },
  ];

  const PositionCompany = useMemo(() => {
    let computedComments = searchPositionCompany;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.uc_name.toLowerCase().includes(search.toLowerCase()) ||
          comment.ucre_occupation.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [searchPositionCompany, currentPage, search]);

  const ProfileCompany = useMemo(() => {
    let computedComments2 = searchProfileCompany;

    if (search2) {
      computedComments2 = computedComments2.filter(
        (comment) =>
          comment.uc_name.toLowerCase().includes(search2.toLowerCase()) ||
          comment.uc_type.toLowerCase().includes(search2.toLowerCase())
      );
    }

    setTotalItems2(computedComments2.length);

    return computedComments2.slice(
      (currentPage2 - 1) * ITEMS_PER_PAGE,
      (currentPage2 - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [searchProfileCompany, currentPage2, search2]);

  const SearchProfileCompany = () => {
    axios
      .post("resume/searchProfileCompany", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchProfileCompany(res.data);
        setLoading1(false);
      })
      .catch((err) => console.log(err));
  };

  const SearchPositionCompany = () => {
    axios
      .post("resume/searchPositionCompany", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchPositionCompany(res.data);
        setLoading2(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    SearchProfileCompany();
    SearchPositionCompany();
  }, []);

  
  const handleGoResume1 = (uc_id) => {
    window.location = "/resume/company/"+uc_id;
  }

  const handleGoResume2 = (uc_id) => {
    window.location = "/resume/company/"+uc_id;
  }

  return (
    <Sidebar mark={"companySearch"}>
      <div class="container">
        <div class="row">
          <div className="col-lg-4"></div>
          <div className="col-md-12 col-lg-8 d-flex flex-row-reverse">
            <SearchTable
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="col-lg-12">
            <br />
          </div>
          <div className="col-lg-12 overflow-auto">
            <Table className="table table-striped">
              {/* <HeaderTable headers={headers} /> */}
              <thead>
                <th style={{ textAlign: "center" }}>{headers[0].name}</th>
                <th style={{ textAlign: "center" }}>{headers[1].name}</th>
                <th style={{ textAlign: "center" }}>{headers[2].name}</th>
                <th style={{ textAlign: "center" }}>{headers[3].name}</th>
                <th style={{ textAlign: "center" }}>{headers[4].name}</th>
              </thead>
              <tbody>
                {loading2 === true ? <tr><td colspan="5"><CircularProgress /></td></tr> : 
                  PositionCompany.map((comment, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${comment.user_profile}`}
                        alt={comment.uc_name}
                        style={{ width: 20, height: 20 }}
                      />
                      {comment.uc_name}
                    </td>
                    <td>{comment.ucre_occupation}</td>
                    <td>{comment.ucre_salary}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => handleGoResume1(comment.uc_id)}
                      >
                        <i className="fas fa-info-circle" /> รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationTable
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage2}
              onPageChange={(page) => setCurrentPage2(page)}
            />
          </div>

          <div className="col-lg-4"></div>
          <div className="col-md-12 col-lg-8 d-flex flex-row-reverse">
            <SearchTable
              
              onSearch={(value) => {
                setSearch2(value);
                setCurrentPage2(1);
              }}
            />
          </div>
          <div className="col-lg-12">
            <br />
          </div>
          <div className="col-lg-12 overflow-auto">
            <Table className="table table-striped">
              {/* <HeaderTable headers={headers} /> */}
              <thead>
                <th style={{ textAlign: "center" }}>{headers2[0].name}</th>
                <th style={{ textAlign: "center" }}>{headers2[1].name}</th>
                <th style={{ textAlign: "center" }}>{headers2[2].name}</th>
                <th style={{ textAlign: "center" }}>{headers2[3].name}</th>
                <th style={{ textAlign: "center" }}>{headers2[4].name}</th>
              </thead>
              <tbody>
              {loading1 === true ? <tr><td colspan="5"><CircularProgress /></td></tr> : 
                ProfileCompany.map((comment, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${comment.user_profile}`}
                        alt={comment.uc_name}
                        style={{ width: 20, height: 20 }}
                      />
                      {comment.uc_name}
                    </td>
                    <td>{comment.uc_type}</td>
                    <td>
                      {comment.user_district}, {comment.user_province}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => handleGoResume2(comment.uc_id)}
                      >
                        <i className="fas fa-info-circle" /> รายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationTable
              total={totalItems2}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage2}
              onPageChange={(page) => setCurrentPage2(page)}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
