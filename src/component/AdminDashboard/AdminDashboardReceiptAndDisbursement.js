import React, { useState } from "react";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

function AdminDashboardReceiptAndDisbursement(){
    const classes = useStyles();

    const originalRows3 = [
        { types: "219534875446", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", amount_money: "1000", transaction_date: "03/03/12 22:43", disbursement_status: "รอตรวสอบ" },
        { types: "219534875447", froms: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", amount_money: "200", transaction_date: "03/03/12 22:43", disbursement_status: "รอตรวสอบ" },
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
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center"><label><b>ประเภท</b></label></TableCell>
                            <TableCell align="center"><label><b>สถานะ</b></label></TableCell>
                            <TableCell align="center"><label><b>จาก</b></label></TableCell>
                            <TableCell align="center"><label><b>จำนวนยอดเงิน</b></label></TableCell>
                            <TableCell align="center"><label><b>วันที่ทำรายการ</b></label></TableCell>
                            <TableCell align="center"><label><b>สถานะเบิกจ่าย</b></label></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows3.map((row) => (
                            <TableRow key={row.types}> 
                                <TableCell ><label>{row.types}</label></TableCell>
                                <TableCell align="center"><label>{row.status}</label></TableCell>
                                <TableCell align="right">
                                    <label class="design_td2"><label>{row.froms}</label></label>
                                </TableCell>
                                <TableCell align="right"><label>{row.amount_money}</label></TableCell>
                                <TableCell align="center"><label>{row.transaction_date}</label></TableCell>
                                <TableCell align="right">
                                    <Button variant="warning">{row.disbursement_status}</Button>{' '}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default AdminDashboardReceiptAndDisbursement;