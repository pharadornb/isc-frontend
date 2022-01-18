import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

function AdminDashboardReceiptAndDisbursement(){
    const classes = useStyles();

    const originalRows3 = [
        { types: "219534875446", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", amount_money: "1000", transaction_date: "03/03/12 22:43", disbursement_status: "รอตรวจสอบ" },
        { types: "219534875447", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ผ่านการรับเงิน", amount_money: "200", transaction_date: "03/03/12 22:43", disbursement_status: "รายละเอียด" },
    ];

    const [rows3, setRows3] = useState(originalRows3);
    const [searched, setSearched] = useState("");
    
    const requestSearch = (no, searchedVal) => {
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
            return <button class="btn btn-outline-success lb" variant="warning">อนุมัติ</button>;
        }else if(value === 'รายละเอียด'){
            return <button class="btn btn-outline-primary lb" variant="warning">รายละเอียด</button>;
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
                            onChange={(searchVal) => requestSearch(2, searchVal)}
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
        </>
    )
}

export default AdminDashboardReceiptAndDisbursement;