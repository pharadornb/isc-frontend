import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

import PayImg from "../../img/Pay.png";
// import CoinWalletImg from '../../img/Coin Wallet.png';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AdminDashboardReceiptAndDisbursement() {
  const clases = useStyles();

  const [rows3, setRows3] = useState([]);
  const [dataShow, setDataShow] = useState([]);
  const [searched, setSearched] = useState("");

  const [show, setShow] = useState(false);
  // const [show1, setShow1] = useState(false);
  const [ucrtid, setUcrtid] = useState("");
  const [selects, setSelect] = useState("");

  const onListCount = async () => {
    try {
      await axios
        .post("summarize_admin/payCompany", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            //   console.log(res.data);
            setRows3(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onListCount();
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const changestatus = () => {
    // console.log(selects + "5555" + ucrtid);
    const ucrt_status = selects;
    const ucrt_id = ucrtid;
    //เปลี่ยนสถานะ
    if (selects !== "" && ucrtid !== "") {
      const params = JSON.stringify({
        ucrt_status,
        ucrt_id,
      });

      axios
        .post("summarize_admin/payCompanyUpdateStatus", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
    setSelect("");
    onListCount();

    setShow(false);
  };
  const handleShow = (ucrt_id) => {
    const params = JSON.stringify({
      ucrt_id,
    });

    axios
      .post("summarize_admin/payCompanyById", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          //   console.log(res.data);
          setDataShow(res.data);
        }
      })
      .catch((err) => console.log(err));
    setUcrtid(ucrt_id);

    setShow(true);
  };

  // const handleClose1 = () => setShow1(false);
  // const handleShow1 = () => setShow1(true);

  const requestSearch = (searchedVal) => {
    const filteredRows3 = rows3.filter((row) => {
      return row.uc_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows3(filteredRows3);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const CheckStatus = (props) => {
    const status = props.status;

    if (status === "success") {
      return (
        <label className="btn btn-success lb">
          <b>เบิกจ่ายสำเร็จ</b>
        </label>
      );
    } else if (status === "reject") {
      return (
        <label className="btn btn-danger lb">
          <b>ไม่ผ่าน</b>
        </label>
      );
    } else if (status === "send") {
      return (
        <label className="btn btn-warning lb">
          <b>รอตรวจสอบ</b>
        </label>
      );
    } else if (status === "accept") {
      return (
        <label className="btn btn-info lb">
          <b>ผ่าน</b>
        </label>
      );
    } else {
      return <b>ไม่มีข้อมูล</b>;
    }
  };

  const onClickSelect = (val) => {
    // console.log(val);
    setSelect(val);
    //console.log(selects + "3333");
  };

  // CheclSelection
  const CheckSelects = (props) => {
    const checks = props.status;
    //setSelect(checks);

    if (checks === "accept") {
      return (
        <select
          name="listvalue"
          onChange={(e) => onClickSelect(e.target.value)}
        >
          <option value={"accept"}>ผ่านการตรวจสอบ</option>
          <option value={"send"}>รอตรวจสอบ</option>
          <option value={"reject"}>ไม่ผ่านการตรวจสอบ</option>
          <option value={"success"}>เบิกจ่ายสำเร็จ</option>
        </select>
      );
    } else if (checks === "send") {
      return (
        <select
          name="listvalue"
          onChange={(e) => onClickSelect(e.target.value)}
        >
          <option value={"send"}>รอตรวจสอบ</option>
          <option value={"accept"}>ผ่านการตรวจสอบ</option>
          <option value={"reject"}>ไม่ผ่านการตรวจสอบ</option>
          <option value={"success"}>เบิกจ่ายสำเร็จ</option>
        </select>
      );
    } else if (checks === "reject") {
      return (
        <select
          name="listvalue"
          onChange={(e) => onClickSelect(e.target.value)}
        >
          <option value={"reject"}>ไม่ผ่านการตรวจสอบ</option>
          <option value={"accept"}>ผ่านการตรวจสอบ</option>
          <option value={"send"}>รอตรวจสอบ</option>
          <option value={"success"}>เบิกจ่ายสำเร็จ</option>
        </select>
      );
    } else if (checks === "success") {
      return (
        <select
          name="listvalue"
          onChange={(e) => onClickSelect(e.target.value)}
        >
          <option value={"success"}>เบิกจ่ายสำเร็จ</option>
          <option value={"accept"}>ผ่านการตรวจสอบ</option>
          <option value={"send"}>รอตรวจสอบ</option>
          <option value={"reject"}>ไม่ผ่านการตรวจสอบ</option>
        </select>
      );
    } else {
      return "error";
    }
  };

  const FormatTDate = (props) => {
    const datetimes = moment(props.data).format("DD/MM/YYYY HH:mm:ss");
    return datetimes;
  };

  return (
    <>
      <div className="row tb">
        <label className="col-md-8">
          <b className="bm">รายการรับและเบิกจ่าย</b>
        </label>
        <div className="col-md-4">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
      </div>
      <div className="row tb">
        <table className={clases.table} aria-label="simple table">
          <thead>
            <tr>
              <th align="center">
                <label>
                  <b>สถานะ</b>
                </label>
              </th>
              <th align="center">
                <label>
                  <b>ให้</b>
                </label>
              </th>
              <th align="center">
                <label>
                  <b>จำนวนยอดเงิน</b>
                </label>
              </th>
              <th align="center">
                <label>
                  <b>วันที่ทำรายการ</b>
                </label>
              </th>
              <th align="center">
                <label>
                  <b>สถานะเบิกจ่าย</b>
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows3.map((row) => (
              <tr key={row.ucrt_create}>
                <td align="center">
                  <CheckStatus status={row.ucrt_status} />
                </td>
                <td align="right">
                  <label className="design_td2">
                    <label>{row.uc_name}</label>
                  </label>
                </td>
                <td align="right">
                  <label>{row.ucrt_money}</label>
                </td>
                <td align="center">
                  <label>
                    <FormatTDate data={row.ucrt_create} />
                  </label>
                </td>
                <td align="right">
                  <button
                    className="btn btn-outline-success"
                    variant="warning"
                    onClick={() => handleShow(row.ucrt_id)}
                  >
                    <i className="far fa-check-circle"></i> เปลี่ยนสถานะ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        {dataShow.map((row) => (
          <div key={row.uc_bank_no}>
            <Modal.Header closeButton>
              <Modal.Title>
                <img src={PayImg} alt="logo"></img>
                <b> รายการเบิกจ่ายให้:</b> {row.uc_name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <label className="col-4">
                  <b>เลขจดทะเบียน: </b>
                  {row.uc_register}
                </label>
                <label className="col-8">
                  <b>ชื่อบริษัท: </b>
                  {row.uc_name}
                </label>
                <label className="col-4">
                  <b>เลขบัญชี: </b>
                  {row.uc_bank_no}
                </label>
                <label className="col-8">
                  <b>เจ้าของบัญชี: </b>
                  {row.uc_bank_name}
                </label>
                <label className="col-4">
                  <b>ธนาคาร: </b>
                  {row.uc_bank}
                </label>
                <label className="col-8">
                  <b>สาขา: </b>
                  {row.uc_branch_bank}
                </label>
                <label className="col-4">
                  <b>ยอดเงินเบิกออก: </b>
                  {row.ucrt_money} บาท
                </label>
                <label className="col-4">
                  <b>สถานะ: </b>
                  <CheckSelects status={row.ucrt_status} />
                </label>
                <label className="col-4">
                  <b>ต้องการใบกำกับภาษี: </b>ใช่
                </label>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="btn btn-success" onClick={() => changestatus()}>
                <i className="fas fa-check-circle"></i> เปลี่ยนสถานะ
              </Button>
            </Modal.Footer>
          </div>
        ))}
      </Modal>
    </>
  );
}

export default AdminDashboardReceiptAndDisbursement;
