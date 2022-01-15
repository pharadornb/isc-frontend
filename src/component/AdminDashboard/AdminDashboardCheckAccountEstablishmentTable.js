import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { SettingsBrightness } from "@mui/icons-material";

const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });


function AdminDashboardCheckAccountEstablishmentTable() {
    const classes = useStyles();
    const [btns, setBtns] = useState('');

    const originalRows1 = [
      { registration_number: "219534875446", establishment_name: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", address: "267/17, ไพรบึง, ศรีสะเกษ", account_opening_date: "03/03/12 22:43", manage_account: "รอตรวสอบ" },
      { registration_number: "219534875447", establishment_name: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", address: "267/17, ไพรบึง, ศรีสะเกษ", account_opening_date: "03/03/12 22:43", manage_account: "รอตรวสอบ" },
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
                                <td align="center"><label>{row.status}</label></td>
                                <td align="right">
                                    <label class="design_td2"><label>{row.establishment_name}</label></label>
                                </td>
                                <td align="right"><label>{row.address}</label></td>
                                <td align="right"><label>{row.account_opening_date}</label></td>
                                <td align="center" onLoad={onCheck(row.manage_account)}>                  
                                   
                                    {
                                        row.manage_account === 'อนุมัติ' && 
                                        <>
                                            <button class="btn btn-outline-success" variant="warning">{row.manage_account}</button>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </table>
            </div>
        </>
    )
}

export default AdminDashboardCheckAccountEstablishmentTable;