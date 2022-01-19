import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

import LogoIcon from '../../img/Logo1.PNG'

const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

function AdminDashboardCheckAccountEstablishmentTable() {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const originalRows1 = [
      { registration_number: "219534875446", establishment_name: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", address: "267/17, ไพรบึง, ศรีสะเกษ", account_opening_date: "03/03/12 22:43", manage_account: "รอตรวจสอบ" },
      { registration_number: "219534875447", establishment_name: "บริษัท เอสเอสเอส กัดจำ", status: "ไม่ผ่าน", address: "267/17, ไพรบึง, ศรีสะเกษ", account_opening_date: "03/03/12 22:43", manage_account: "รายละเอียด" },
      { registration_number: "219534875447", establishment_name: "บริษัท เอสเอสเอส กัดจำ", status: "ผ่าน", address: "267/17, ไพรบึง, ศรีสะเกษ", account_opening_date: "03/03/12 22:43", manage_account: "รายละเอียด" },
    ];

    const [rows1, setRows1] = useState(originalRows1);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        /* Search Table 1 */
            const filteredRows = originalRows1.filter((row) => {
                return row.registration_number.toLowerCase().includes(searchedVal.toLowerCase());
              });
            setRows1(filteredRows); 
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

    const OnCheckStatus = (props) => {
        const status = props.status;

        if(status === 'ผ่าน' || status === 'ผ่านการรับเงิน'){
            return <label class="btn btn-success lb"><b>ผ่าน</b></label>;
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
            return <button class="btn btn-outline-primary lb" variant="warning"><i class="fas fa-info-circle"></i> รายละเอียด</button>;
        }else{
            return <b>ไม่มีข้อมูล</b>;
        }
    }

    return (
        <>
           <div class="row tb">
                <label class="col-md-8"><b class="bm">ตรวจสอบบัญชีสถานประกอบการ</b></label>
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
                            <td align="center"><label><b>เลขจดทะเบียน</b></label></td>
                            <td align="center"><label><b>สถานะ</b></label></td>
                            <td align="center"><label><b>ชื่อสถานประกอบการ</b></label></td>
                            <td align="center"><label><b>ที่อยู่</b></label></td>
                            <td align="center"><label><b>วันที่เปิดบัญชี</b></label></td>
                            <td align="center"><label><b>จัดการบัญชี</b></label></td>
                        </tr>
                        {rows1.map((row) => (
                            <tr key={row.registration_number}>
                                <td ><label>{row.registration_number}</label></td>
                                <td align="center">
                                    <OnCheckStatus status={row.status} />
                                </td>
                                <td align="right">
                                    <label class="design_td2"><label>{row.establishment_name}</label></label>
                                </td>
                                <td align="right"><label>{row.address}</label></td>
                                <td align="right"><label>{row.account_opening_date}</label></td>
                                <td align="center" >
                                    <OnCheckAccount value={row.manage_account} />
                                </td>
                            </tr>
                        ))}
                    </table>
                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title><b>รายละเอียดบัญชีสถานประกอบการ:</b> บริษัท เอสเอสเอส กำจัด</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-6 setImg">
                                    <img alt="Trulli" src={LogoIcon} className="imgLogoStyle"></img>
                                </div>
                                <div className="col-md-6">
                                    <label><b>ชื่อ: </b>บริษัท เอสเอสเอส กำจัด</label><br></br>
                                    <label><b>เลขจดทะเบียน: </b>3911234514514</label><br></br>
                                    <label><b>ประเภทบริการ: </b>บริการซอฟต์แวร์แก่องค์กร</label><br></br>
                                    <label><b>อีเมล์: </b>hr.ssssss@gmail.com</label><br></br>
                                    <label><b>เบอร์โทรศัพท์  </b>094901503x</label>
                                </div>
                            </div>
                            <div className="row et_box2">
                                <label className="col-12"><b>รายละเอียด: </b>Lorem Ipsum is simply dummy text of the printing and typesetting is
industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</label>
                                <label className="col-12"><b>เว็บไซต์: </b>http://dadasd.com</label>
                                <label className="col-12"><b>วิสัยทัศน์: </b>Lorem Ipsum is simply dummy text of the printing and typesetting is text ever </label>
                                <label className="col-12"><b>ที่ตั้งบริษัท: </b>267 ม.17 บ้านหนองปิด ตำบลไพรบึง อำเภอไพรบึง จังหวัดศรีสะเกษ รหัสไปรษณีย์ 33180</label>
                                <label className="col-4"><b>วันก่อตั้ง: </b>16 กุมภาพันธ์ 2542</label>
                                <label className="col-3"><b>เบอร์โทรสาร: </b>094901503x</label>
                                <label className="col-5"><b>เลขบัญชี: </b>2144579875451x</label>
                                <label className="col-4"><b>เจ้าของบัญชี: </b>ภราดร บุญร่วม</label>
                                <label className="col-3"><b>ธนาคาร: </b>กรุงไทย</label>
                                <label className="col-5"><b>สาขา: </b>มหาวิทยาลัยแห่งเทคโนโลยีสุรนารี</label>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="btn btn-success" onClick={handleClose}>
                            <i class="fas fa-check-circle"></i> อนุมัติบัญชี
                        </Button>
                        <Button variant="btn btn-danger" onClick={handleClose}>
                        <i class="fas fa-times-circle"></i> ไม่อนุมัติบัญชี
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
            
            
        </>
    )
}

export default AdminDashboardCheckAccountEstablishmentTable;