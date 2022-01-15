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

function AdminDashboardCheckOpenSkillTable() {
    const classes = useStyles();
    
    const originalRows2 = [
        { skillName: "219534875446", by: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", number_measurements: "267/17, ไพรบึง, ศรีสะเกษ", skill_opening_date: "03/03/12 22:43", manage_skill: "รอตรวสอบ" },
        { skillName: "219534875447", by: "บริษัท เอสเอสเอส กัดจำ", status: "ตรวจสอบ", number_measurements: "267/17, ไพรบึง, ศรีสะเกษ", skill_opening_date: "03/03/12 22:43", manage_skill: "รอตรวสอบ" },
      ];

    const [rows2, setRows2] = useState(originalRows2);
    const [searched, setSearched] = useState("");
    
    const requestSearch = (no, searchedVal) => {
         /* Search Table 2 */
            const filteredRows2 = originalRows2.filter((row) => {
                return row.skillName.toLowerCase().includes(searchedVal.toLowerCase());
              });
            setRows2(filteredRows2);    
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

    return(
        <>
        <div class="row tb">
            <label class="col-md-8"><b class="bm">ตรวจสอบการเปิดทักษะ</b></label>
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
                        <TableCell align="center"><label><b>ชื่อทักษะ</b></label></TableCell>
                        <TableCell align="center"><label><b>สถานะ</b></label></TableCell>
                        <TableCell align="center"><label><b>โดย</b></label></TableCell>
                        <TableCell align="center"><label><b>จำนวนข้อวัดผล</b></label></TableCell>
                        <TableCell align="center"><label><b>วันที่เปิดทักษะ</b></label></TableCell>
                        <TableCell align="center"><label><b>จัดการทักษะ</b></label></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows2.map((row) => (
                        <TableRow key={row.skillName}>
                            <TableCell ><label>{row.skillName}</label></TableCell>
                            <TableCell align="center"><label>{row.status}</label></TableCell>
                            <TableCell align="right">
                                <label class="design_td2"><label>{row.by}</label></label>
                            </TableCell>
                            <TableCell align="right"><label>{row.number_measurements}</label></TableCell>
                            <TableCell align="center"><label>{row.skill_opening_date}</label></TableCell>
                            <TableCell align="right">
                                <Button variant="warning">{row.manage_skill}</Button>{' '}
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

export default AdminDashboardCheckOpenSkillTable;