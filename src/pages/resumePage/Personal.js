// import React, { useState, useEffect } from "react";
// import { TextField, Grid, InputAdornment } from "@mui/material";
// import axios from "axios";
// import moment from "moment";
// import DialogActions from "@mui/material/DialogActions";
// import CircularProgress from "@mui/material/CircularProgress";

// export default function Personal(props) {
//   const [dataNUser, setDataNUser] = useState([]);
  

//   const UserProfiles = () => {
//     axios
//       .post("resume/user_profile", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           // console.log(dataNUser);
//           setDataNUser(res.data[0]);
          
//           setLoading(true);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     UserProfiles();
//   },[]);

//   const [selectedFile, setSelectedFile] = useState("");
//   const isFilePicked = useState(props.isFilePicked);
//   // console.log(isFilePicked);

  

//   return (
//     <>
      
//     </>
//   );
// }
