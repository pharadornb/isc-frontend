import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

import PayImg from '../../img/Pay.png';
import CoinWalletImg from '../../img/Coin Wallet.png';

const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

function AdminDashboardReceiptAndDisbursement(){
    const classes = useStyles();

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const originalRows3 = [
        { types: "219534875446", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", amount_money: "1000", transaction_date: "03/03/12 22:43", disbursement_status: "รอตรวจสอบ" },
        { types: "219534875447", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ผ่านการรับเงิน", amount_money: "200", transaction_date: "03/03/12 22:43", disbursement_status: "รายละเอียด" },
    ];

    const [rows3, setRows3] = useState(originalRows3);
    const [searched, setSearched] = useState("");
    
    const requestSearch = (searchedVal) => {
            const filteredRows3 = originalRows3.filter((row) => {
                return row.skillName.toLowerCase().includes(searchedVal.toLowerCase());
              });
            setRows3(filteredRows3);
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
    
    const OnCheckStatus = (props) => {
        const status = props.status;

        if(status === 'ผ่าน' || status === 'ผ่านการรับเงิน'){
            return <label class="btn btn-success lb"><b>ผ่านการรับเงิน</b></label>;
        }else if(status === 'ไม่ผ่าน'){
            return <label class="btn btn-danger lb"><b>ไม่ผ่าน</b></label>;
        }else if(status === 'ตรวจสอบ'){
            return <label class="btn btn-warning lb"><b>รอตรวจสอบ</b></label>;
        }else{
            return <b>ไม่มีข้อมูล</b>
        }
    }

    const OnCheckAccount = (props) => {
        const value = props.value;

        if(value === 'รอตรวจสอบ'){
            return <button class="btn btn-outline-success lb" variant="warning" onClick={handleShow}><i class="far fa-check-circle"></i> อนุมัติ</button>;
        }else if(value === 'รายละเอียด'){
            return <button class="btn btn-outline-primary lb" variant="warning" onClick={handleShow1}><i class="fas fa-info-circle"></i> รายละเอียด</button>;
        }else{
            return <b>ไม่มีข้อมูล</b>;
        }
    }

    return(
        <>
            <div class="row tb">
                <label class="col-md-8"><b class="bm">รายการรับและเบิกจ่าย</b></label>
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
                            <td align="center"><label><b>ประเภท</b></label></td>
                            <td align="center"><label><b>สถานะ</b></label></td>
                            <td align="center"><label><b>จาก</b></label></td>
                            <td align="center"><label><b>จำนวนยอดเงิน</b></label></td>
                            <td align="center"><label><b>วันที่ทำรายการ</b></label></td>
                            <td align="center"><label><b>สถานะเบิกจ่าย</b></label></td>
                        </tr>
                        {rows3.map((row) => (
                            <tr key={row.types}> 
                                <td ><label>{row.types}</label></td>
                                <td align="center"><OnCheckStatus status={row.status} /></td>
                                <td align="right">
                                    <label class="design_td2"><label>{row.froms}</label></label>
                                </td>
                                <td align="right"><label>{row.amount_money}</label></td>
                                <td align="center"><label>{row.transaction_date}</label></td>
                                <td align="right">
                                    <OnCheckAccount value={row.disbursement_status} />
                                </td>
                            </tr>
                        ))}
                    </table>
            </div>
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                <Modal.Title><img src={PayImg} alt="logo"></img><b> รายการเบิกจ่ายให้:</b> บริษัท เอสเอสเอส กำจัด</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-4"><b>ชื่อ: </b>บริษัท เอสเอสเอส กำจัด</label>
                        <label className="col-4"><b>อีเมล์: </b>hr.ssssss@gmail.com</label>
                        <label className="col-4"><b>เบอร์โทรศัพท์: </b>094901503x</label>
                        <label className="col-4"><b>เลขบัญชี: </b>2144579875451x</label>
                        <label className="col-8"><b>เจ้าของบัญชี: </b>ภราดร บุญร่วม</label>
                        <label className="col-4"><b>ธนาคาร: </b>กรุงไทย</label>
                        <label className="col-8"><b>สาขา: </b>มหาวิทยาลัยแห่งเทคโนโลยีสุรนารี</label>
                        <label className="col-4"><b>ยอดเงินเบิกออก: </b>100 บาท</label>
                        <label className="col-4">
                            <b>สถานะ: </b>
                            <select name="listvalue">
                                <option value={0}>รอตรวจสอบ</option>
                                <option value={1}>ผ่านการตรวจสอบ</option>
                                <option value={2}>ไม่ผ่านการตรวจสอบ</option>
                                <option value={3}>เบิกจ่ายสำเร็จ</option>
                            </select>
                        </label>
                        <label className="col-4"><b>ต้องการใบกำกับภาษี: </b>ใช่</label>   
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-success" onClick={handleClose}>
                    <i class="fas fa-check-circle"></i> เปลี่ยนสถานะ
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show1} onHide={handleClose1} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><img src={CoinWalletImg} alt="logo"></img><b>รายการรับจาก: </b>ภราดร บุญร่วม</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label className="col-3"><b>ชื่อ: </b>นายภราดร บุญร่วม</label>
                        <label className="col-3"><b>อีเมล์: </b>king@gmail.com</label>
                        <label className="col-6"><b>เบอร์โทรศัพท์: </b>094901503x</label>
                        <label className="col-5"><b>รหัสรายการอ้างอิง: </b>2144579875451455656x</label>
                        <label className="col-7"><b>ชื่อรายการ: </b>Pay for user_id = 1</label>
                        <label className="col-12"><b>ยอดเงินรับสุทธิ: 100 บาท </b></label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-danger" onClick={handleClose1}>
                    <i class="fas fa-times-circle"></i> ปิด
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminDashboardReceiptAndDisbursement;