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


function AdminDashboardCheckAccountEstablishmentTable() {
    const classes = useStyles();
    
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
                <label class="col-md-8"><b>ตรวจสอบบัญชีสถานประกอบการ</b></label>
                <div class="col-md-4">
                    <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        /> 
                </div>  
            </div>
            <div class="row tb">
                    <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center"><label><b>เลขจดทะเบียน</b></label></TableCell>
                            <TableCell align="center"><label><b>สถานะ</b></label></TableCell>
                            <TableCell align="center"><label><b>ชื่อสถานประกอบการ</b></label></TableCell>
                            <TableCell align="center"><label><b>ที่อยู่</b></label></TableCell>
                            <TableCell align="center"><label><b>วันที่เปิดบัญชี</b></label></TableCell>
                            <TableCell align="center"><label><b>จัดการบัญชี</b></label></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows1.map((row) => (
                            <TableRow key={row.registration_number}>
                                <TableCell ><label>{row.registration_number}</label></TableCell>
                                <TableCell align="center"><label>{row.status}</label></TableCell>
                                <TableCell align="right">
                                    <label class="design_td2"><label>{row.establishment_name}</label></label>
                                </TableCell>
                                <TableCell align="right"><label>{row.address}</label></TableCell>
                                <TableCell align="right"><label>{row.account_opening_date}</label></TableCell>
                                <TableCell align="center">
                                    <Button variant="warning">{row.manage_account}</Button>
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

export default AdminDashboardCheckAccountEstablishmentTable;