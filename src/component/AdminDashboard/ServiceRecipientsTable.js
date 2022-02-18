// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import SearchBar from "material-ui-search-bar";
// import Button from "react-bootstrap/Button";
// import { Modal } from "react-bootstrap";
// import CoinWalletImg from "../../img/Coin Wallet.png";
// import NoCoinWalletImg from "../../img/Vector.png";

// export default function ReceiptsCompanyTable() {
//   // Const

//   // const [uid, setuid] = useState('');
//   const [data, setData] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [show1, setShow1] = useState(false);
//   const [searched, setSearched] = useState("");
//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = (statement_id) => {
//     const params = JSON.stringify({
//       statement_id,
//     });

//     axios
//       .post("summarize_admin/reciveUserById", params, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           //   console.log(res.data);
//           setRows(res.data);
//         }
//       })
//       .catch((err) => console.log(err));

//     setShow1(true);
//   };

//   const FormatTDate = (props) => {
//     const datetimes = moment(props.data).format("DD/MM/YYYY HH:mm:ss");
//     return datetimes;
//   };

//   // select API function

//   const listtable = () => {
//     try {
//       axios
//         .post("summarize_admin/reciveUser", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//         .then((res) => {
//           if (res.status === 200) {
//             // console.log(res.data);
//             setData(res.data);
//           }
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     listtable();
//   }, []);

//   const CheckStatus = (props) => {
//     const status = props.status;

//     if (status === "yes") {
//       return (
//         <label className="btn btn-success lc">
//           <b>ผ่านการรับเงิน</b>
//         </label>
//       );
//     } else if (status === "no") {
//       return (
//         <label className="btn btn-danger lc">
//           <b>ไม่ผ่านการรับเงิน</b>
//         </label>
//       );
//     } else {
//       return <b>ไม่มีข้อมูล</b>;
//     }
//   };

//   const requestSearch = (searchedVal) => {
//     const filteredRows3 = data.filter((row) => {
//       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     setData(filteredRows3);
//   };

//   const cancelSearch = () => {
//     setSearched("");
//     requestSearch(searched);
//   };

//   const CheckAccuracys = (prop) => {
//     // console.log(prop.sid);
//     if (prop.sid === "yes") {
//       return (
//         <>
//           <img src={CoinWalletImg} alt="logo"></img>
//           <b> ได้รายรับจาก:</b>
//         </>
//       );
//     } else if (prop.sid === "no") {
//       return (
//         <>
//           <img src={NoCoinWalletImg} alt="logo"></img>
//           <b> ไม่มีรายรับจาก:</b>
//         </>
//       );
//     } else {
//       return "No data!!!";
//     }
//   };

//   return (
//     <>
//       <div className="row tb">
//         <label className="col-md-8">
//           <b className="bm">รายการรับจากผู้รับริการ</b>
//         </label>
//         <div className="col-md-4">
//           <SearchBar
//             value={searched}
//             onChange={(searchVal) => requestSearch(searchVal)}
//             onCancelSearch={() => cancelSearch()}
//           />
//         </div>
//       </div>
//       <div className="row tb overflow-auto">
//         <table className="" aria-label="simple table">
//           <thead>
//             <tr>
//               <th align="center">
//                 <label>
//                   <b>สถานะ</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>จาก</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>จำนวนยอดเงิน</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>วันที่ทำรายการ</b>
//                 </label>
//               </th>
//               <th align="center">
//                 <label>
//                   <b>สถานะเบิกจ่าย</b>
//                 </label>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row.statement_create}>
//                 <td align="center">
//                   <CheckStatus status={row.statement_issuccess} />
//                 </td>
//                 <td align="right">
//                   <label className="design_td2">
//                     <label>{row.name}</label>
//                   </label>
//                 </td>
//                 <td align="right">
//                   <label>{row.statement_price}</label>
//                 </td>
//                 <td align="center">
//                   <label>
//                     <FormatTDate data={row.statement_create} />
//                   </label>
//                 </td>
//                 <td align="right">
//                   <button
//                     className="btn btn-outline-primary"
//                     variant="warning"
//                     onClick={() => handleShow1(row.statement_id)}
//                   >
//                     <i className="far fa-check-circle"></i> รายละเอียด
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal show={show1} onHide={handleClose1} animation={false} size="lg">
//         {rows.map((row) => (
//           <div key={row.statement_code}>
//             <Modal.Header closeButton>
//               {/* <Modal.Title>{row.statement_issuccess}</Modal.Title> */}
//               <Modal.Title>
//                 <CheckAccuracys sid={row.statement_issuccess} /> {row.name}
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <div className="row">
//                 <label className="col-4">
//                   <b>ชื่อ: </b>
//                   {row.name}
//                 </label>
//                 <label className="col-8">
//                   <b>รหัสรายการอ้างอิง: </b>
//                   {row.statement_code}
//                 </label>
//                 <label className="col-4">
//                   <b>สถานะการโอน: </b> {row.statement_name}
//                 </label>
//                 <label className="col-8">
//                   <b>ยอดเงินรับสุทธิ: {row.statement_price} บาท </b>
//                 </label>
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="btn btn-danger" onClick={handleClose1}>
//                 <i className="fas fa-times-circle"></i> ปิด
//               </Button>
//             </Modal.Footer>
//           </div>
//         ))}
//       </Modal>
//     </>
//   );
// }
