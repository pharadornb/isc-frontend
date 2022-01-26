import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
// import * as ReactBootStrap from 'react-bootstrap';

import LogoIcon from "../../img/Logo1.PNG";
// import Pagination from "../Pagination";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AdminDashboardCheckAccountEstablishmentTable() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [datas, setDatas] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [userId, setUserId] = useState('');
  // const [loading, setLoading] = useState(false);
  
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  const handleClose = () => setShow(false);

  const onSelectList = async () => {
    try{
      await axios
      .post("account/company", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        if (res.status === 200) {
          //console.log(res.data.user);
          setRows1(res.data.user);
        }
      });
      // setLoading(true);
      }catch (err){
        console.log(err);
      }
  }

  useEffect(() => {
    onSelectList();
  },[]);


  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPost = rows1.slice(indexOfFirstPost, indexOfLastPost);

  const handleShow = (user_id) => {
    const params = JSON.stringify({
        user_id
    });

    axios.post('account/companyById', params, {
        headers: {
            'Content-Type': 'application/json',
        }
      }).then(res => {
          if (res.status === 200) {
              // console.log(res.data.user)
              setDatas(res.data.user);
          }
      }).catch(err =>
          console.log(err)
      )
        setShow(true);
        setUserId(user_id);
    };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (user_id) => {
    const params = JSON.stringify({
        user_id
    });

    axios.post('account/companyById', params, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if (res.status === 200) {
            // console.log(res.data.user)
            setDatas(res.data.user);
        }
    }).catch(err =>
        console.log(err)
    )
    setShow1(true);

};

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    /* Search Table 1 */
    const filteredRows = rows1.filter((row) => {
      return row.establishment_name
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows1(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const OnCheckStatus = (props) => {
    const status = props.status;

    if (status === "yes") {
      return (
        <label class="btn btn-success lb">
          <b>ผ่าน</b>
        </label>
      );
    } else if (status === "no") {
      return (
        <label class="btn btn-danger lb">
          <b>ไม่ผ่าน</b>
        </label>
      );
    } else if (status === "wait") {
      return (
        <label class="btn btn-warning lb">
          <b>รอตรวจสอบ</b>
        </label>
      );
    } else {
      return <b>ไม่มีข้อมูล</b>;
    }
  };

  const OnCheckAccount = (props) => {
    const value = props.value;
    const user_id = props.user_id;

    if (value === "wait") {
      return (
        <button
          class="btn btn-outline-success lb"
          variant="warning"
          onClick={() => handleShow(user_id)}
        >
          <i class="far fa-check-circle"></i> อนุมัติ
        </button>
      );
    } else if (value === "no" || value === "yes") {
      return (
        <button
          class="btn btn-outline-primary lb"
          variant="warning"
          onClick={() => handleShow1(user_id)}
        >
          <i class="fas fa-info-circle"></i> รายละเอียด
        </button>
      );
    } else {
      return <b>ไม่มีข้อมูล</b>;
    }
  };

  const FormatTDate = (props) => {
    const datetimes = moment(props.data).format('DD/MM/YYYY HH:mm:ss');;
    return datetimes;
  }

  const SetImage = (props) => {
    const setimgname = "data:image/jpeg;base64," + props.photoName;
    return <img alt="Trulli" src={setimgname} className="imgLogoStyle"></img>;
  }

  const SetAllow = (user_id, status) => {
    const params = JSON.stringify({
      status,
      user_id
    });

    axios.post('account/allow_company', params, {
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(res => {
        if (res.status === 200) {
            console.log(res)
        }
    }).catch(err =>
        console.log(err)
    )
    setShow(false)
  }



  return (
    <>
      
      <div class="row tb">
        <label class="col-md-8">
          <b class="bm">ตรวจสอบบัญชีสถานประกอบการ</b>
        </label>
        <div class="col-md-4">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
      </div>
      <div class="row tb">
        <table className={classes.table} aria-label="simple table">
          <tr>
            <th align="center" className="th1">
              <label>
                <b>เลขจดทะเบียน</b>
              </label>
            </th>
            <th align="center" className="th2">
              <label>
                <b>สถานะ</b>
              </label>
            </th>
            <th align="center" className="th3">
              <label>
                <b>ชื่อสถานประกอบการ</b>
              </label>
            </th>
            <th align="center" className="th4">
              <label>
                <b>ที่อยู่</b>
              </label>
            </th>
            <th align="center" className="th5">
              <label>
                <b>วันที่เปิดบัญชี</b>
              </label>
            </th>
            <th align="center" className="th6">
              <label>
                <b>จัดการบัญชี</b>
              </label>
            </th>
          </tr>
          
          {rows1.map((row) => (
            <tr key={row.uc_name}>
              <td>
              
                <label>{row.uc_register}</label>
              </td>
              <td align="center">
                <OnCheckStatus status={row.uc_allow} />
              </td>
              <td align="right">
                <label class="design_td2">
                  <label>{row.uc_name}</label>
                </label>
              </td>
              <td align="right" className="td4">
                <label>บ้านเลขที่ {row.user_address} ตำบล {row.user_subdistrict} อำเภอ {row.user_district} จังหวัด {row.user_province} รหัสไปรษณีย์ {row.user_postcode} </label>
              </td>
              <td align="right">
                <label><FormatTDate data={row.uc_create}/></label>
              </td>
              <td align="center">
           
                <OnCheckAccount value={row.uc_allow} user_id={row.user_id} />
              </td>
            </tr>
          ))}
        </table>
        {/* <Pagination postsPerPage={postsPerPage} totalPosts={rows1.length} /> */}





        <Modal show={show} onHide={handleClose} size="lg">
          {datas.map((rows) => (
          <>
          <Modal.Header closeButton>
            <Modal.Title>
              <b>รายละเอียดบัญชีสถานประกอบการ:</b> บริษัท {rows.uc_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 setImg">
                <SetImage photoName={rows.user_profile} />
                
              </div>
              <div className="col-md-6">
                <label>
                  <b>ชื่อ: </b>บริษัท {rows.uc_name}
                </label>
                <br></br>
                <label>
                  <b>เลขจดทะเบียน: </b>{rows.uc_register}
                </label>
                <br></br>
                <label>
                  <b>ประเภทบริการ: </b>{rows.uc_type}
                </label>
                <br></br>
                <label>
                  <b>อีเมล์: </b>{rows.user_email}
                </label>
                <br></br>
                <label>
                  <b>เบอร์โทรศัพท์ </b>{rows.user_tel}
                </label>
              </div>
            </div>
            <div className="row et_box2">
              <label className="col-12">
                <b>รายละเอียด: </b>{rows.uc_detail}
              </label>
              <label className="col-12">
                <b>เว็บไซต์: </b>{rows.uc_website}
              </label>
              <label className="col-12">
                <b>วิสัยทัศน์: </b>{rows.user_slogan}
              </label>
              <label className="col-12">
                <b>ที่ตั้งบริษัท: </b>บ้านเลขที่ {rows.user_address} ตำบล/แขวง {rows.user_subdistrict} อำเภอ/เขต {rows.user_district} จังหวัด {rows.user_province} รหัสไปรษณีย์ {rows.user_postcode}
              </label>
              <label className="col-4">
                <b>วันก่อตั้ง: </b><FormatTDate data={rows.user_dob}/>
              </label>
              <label className="col-3">
                <b>เบอร์โทรสาร: </b>{rows.uc_fax}
              </label>
              <label className="col-5">
                <b>เลขบัญชี: </b>{rows.uc_bank_no}
              </label>
              <label className="col-4">
                <b>เจ้าของบัญชี: </b>{rows.uc_bank_name}
              </label>
              <label className="col-3">
                <b>ธนาคาร: </b>{rows.uc_bank}
              </label>
              <label className="col-5">
                <b>สาขา: </b>{rows.uc_branch_bank}
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-success" onClick={() => SetAllow(userId, 'yes')}>
              <i class="fas fa-check-circle"></i> อนุมัติบัญชี
            </Button>
            <Button variant="btn btn-danger" onClick={() => SetAllow(userId, 'no')}>
              <i class="fas fa-times-circle"></i> ไม่อนุมัติบัญชี
            </Button>
          </Modal.Footer>
           </>
          ))}
        </Modal>

        {/* modal 2*/}

        <Modal show={show1} onHide={handleClose1} size="lg">
        {datas.map((rows) => ( 
          <>
          <Modal.Header closeButton>
            <Modal.Title>
              <b>รายละเอียดบัญชีสถานประกอบการ:</b> บริษัท {rows.uc_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 setImg">
                <img alt="Trulli" src={LogoIcon} className="imgLogoStyle"></img>
              </div>
              <div className="col-md-6">
                <label>
                  <b>ชื่อ: </b>บริษัท {rows.uc_name}
                </label>
                <br></br>
                <label>
                  <b>เลขจดทะเบียน: </b>{rows.uc_register}
                </label>
                <br></br>
                <label>
                  <b>ประเภทบริการ: </b>{rows.uc_type}
                </label>
                <br></br>
                <label>
                  <b>อีเมล์: </b>{rows.user_email}
                </label>
                <br></br>
                <label>
                  <b>เบอร์โทรศัพท์ </b>{rows.user_tel}
                </label>
              </div>
            </div>
            <div className="row et_box2">
              <label className="col-12">
                <b>รายละเอียด: </b>{rows.uc_detail}
              </label>
              <label className="col-12">
                <b>เว็บไซต์: </b>{rows.uc_website}
              </label>
              <label className="col-12">
                <b>วิสัยทัศน์: </b>{rows.user_slogan}
              </label>
              <label className="col-12">
                <b>ที่ตั้งบริษัท: </b>บ้านเลขที่ {rows.user_address} ตำบล/แขวง {rows.user_subdistrict} อำเภอ/เขต {rows.user_district} จังหวัด {rows.user_province} รหัสไปรษณีย์ {rows.user_postcode}
              </label>
              <label className="col-4">
                <b>วันก่อตั้ง: </b><FormatTDate data={rows.user_dob}/>
              </label>
              <label className="col-3">
                <b>เบอร์โทรสาร: </b>{rows.uc_fax}
              </label>
              <label className="col-5">
                <b>เลขบัญชี: </b>{rows.uc_bank_no}
              </label>
              <label className="col-4">
                <b>เจ้าของบัญชี: </b>{rows.uc_bank_name}
              </label>
              <label className="col-3">
                <b>ธนาคาร: </b>{rows.uc_bank}
              </label>
              <label className="col-5">
                <b>สาขา: </b>{rows.uc_branch_bank}
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-danger" onClick={handleClose1}>
              <i class="fas fa-times-circle"></i> ปิด
            </Button>
          </Modal.Footer>
          </>
          ))}
        </Modal>
      </div>
    </>
  );
}

export default AdminDashboardCheckAccountEstablishmentTable;
