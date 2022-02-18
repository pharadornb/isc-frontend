// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import SearchBar from "material-ui-search-bar";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function AdminDashboardCheckOpenSkilltable() {
//   const classes = useStyles();

//   const originalRows2 = [
//     {
//       skillName: "219534875446",
//       by: "บริษัท เอสเอสเอส กัดจำ",
//       status: "ตรวจสอบ",
//       number_measurements: "267/17, ไพรบึง, ศรีสะเกษ",
//       skill_opening_date: "03/03/12 22:43",
//       manage_skill: "รอตรวจสอบ",
//     },
//     {
//       skillName: "219534875447",
//       by: "บริษัท HomePro กัดจำ",
//       status: "ผ่าน",
//       number_measurements: "267/17, ไพรบึง, ศรีสะเกษ",
//       skill_opening_date: "03/03/12 22:43",
//       manage_skill: "รายละเอียด",
//     },
//   ];

//   const [rows2, setRows2] = useState(originalRows2);
//   const [searched, setSearched] = useState("");

//   const requestSearch = (no, searchedVal) => {
//     /* Search table 2 */
//     const filteredRows2 = originalRows2.filter((row) => {
//       return row.by.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     setRows2(filteredRows2);
//   };

//   const cancelSearch = () => {
//     setSearched("");
//     requestSearch(searched);
//   };

//   const OnCheckStatus = (props) => {
//     const status = props.status;

//     if (status === "ผ่าน" || status === "ผ่านการรับเงิน") {
//       return (
//         <label className="btn btn-success lb">
//           <b>ผ่าน</b>
//         </label>
//       );
//     } else if (status === "ไม่ผ่าน") {
//       return (
//         <label className="btn btn-danger lb">
//           <b>ไม่ผ่าน</b>
//         </label>
//       );
//     } else if (status === "ตรวจสอบ") {
//       return (
//         <label className="btn btn-warning lb">
//           <b>รอตรวจสอบ</b>
//         </label>
//       );
//     } else {
//       return <b>ไม่มีข้อมูล</b>;
//     }
//   };

//   const OnCheckAccount = (props) => {
//     const value = props.value;

//     if (value === "รอตรวจสอบ") {
//       return (
//         <button className="btn btn-outline-success lb" variant="warning">
//           <i className="far fa-check-circle"></i> อนุมัติ
//         </button>
//       );
//     } else if (value === "รายละเอียด") {
//       return (
//         <button className="btn btn-outline-primary lb" variant="warning">
//           <i className="fas fa-info-circle"></i> รายละเอียด
//         </button>
//       );
//     } else {
//       return <b>ไม่มีข้อมูล</b>;
//     }
//   };

//   return (
//     <>
//       <div className="row tb ">
//         <label className="col-md-8">
//           <b className="bm">ตรวจสอบการเปิดทักษะ</b>
//         </label>
//         <div className="col-md-4">
//           <SearchBar
//             value={searched}
//             onChange={(searchVal) => requestSearch(2, searchVal)}
//             onCancelSearch={() => cancelSearch()}
//           />
//         </div>
//       </div>
//       <div className="row tb overflow-auto">
//         <table className={classes.table} aria-label="simple table">
//           <thead>
//             <tr>
//               <th align="center">
//                 <label>
//                   <b>ชื่อทักษะ</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>สถานะ</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>โดย</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>จำนวนข้อวัดผล</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>วันที่เปิดทักษะ</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>จัดการทักษะ</b>
//                 </label>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows2.map((row) => (
//               <tr key={row.by}>
//                 <td>
//                   <label>{row.skillName}</label>
//                 </td>
//                 <td align="center">
//                   <OnCheckStatus status={row.status} />
//                 </td>
//                 <td align="right">
//                   <label className="design_td2">
//                     <label>{row.by}</label>
//                   </label>
//                 </td>
//                 <td align="right">
//                   <label>{row.number_measurements}</label>
//                 </td>
//                 <td align="center">
//                   <label>{row.skill_opening_date}</label>
//                 </td>
//                 <td align="right">
//                   <OnCheckAccount value={row.manage_skill} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default AdminDashboardCheckOpenSkilltable;
