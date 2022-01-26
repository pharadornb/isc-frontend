import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/AdminDashboard/AdminDashboardBox.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import MessageIcon from '@mui/icons-material/Message';


function AdminDashboardBox(){
    const [countUser, setCountUser] = useState([]);
    const [countCo, setCountCo] = useState([]);
    const [countSkill, setCountSkill] = useState([]);
    const [countStatement, setCountStatement] = useState([]);

    const onListCount = async () => {
        try{
          await axios
          .post("summarize_admin/count", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(res => {
            if (res.status === 200) {
            //   console.log(res.data.statement);
              setCountUser(res.data.user);
              setCountCo(res.data.company);
              setCountSkill(res.data.skill);
              setCountStatement(res.data.statement);
            }
          });
          }catch (err){
            console.log(err);
          }
      }
    
      useEffect(() => {
        onListCount();
      },[]);
    
    return(
        <>
 
        <div class="col-md-3">
            <div class='box b1'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดผู้รับบริการ</b></label>
                    <label class="textbox_style2">{countUser.map((s) => (<>{s.users_service_count}</>))}</label>
                    <label class="textbox_style1">คน</label>
                </div>
                <div class="inbox_right">
                    <AccountCircleIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class='box b2'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดสถานประกอบการ</b></label>
                    <label class="textbox_style2">{countCo.map((s) => (<>{s.users_company_count}</>))}</label>
                    <label class="textbox_style1">แห่ง</label>
                </div>
                <div class="inbox_right">
                    <BusinessIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>
        
        <div class="col-md-3">
            <div class='box b3'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดคลังทักษะ</b></label>
                    <label class="textbox_style2">{countSkill.map((ss) => (<>{ss.skill_count}</>))}</label>
                    <label class="textbox_style1">ทักษะ</label>
                </div>
                <div class="inbox_right">
                    <MessageIcon style={{fontSize: 60}} />
                </div>
            </div>
        </div>
        
        <div class="col-md-3">
            <div class='box b4'>
                <div class="inbox_left">
                    <label class="textbox_style1"><b>ยอดรายรับบริการ</b></label>
                    <label class="textbox_style2">{countStatement.map((sss) => (<>{sss.statement_price}</>))}</label>
                    <label class="textbox_style1">บาท</label>
                </div>
                <div class="inbox_right">
                    <AccountBalanceWalletIcon style={{fontSize: 60}} />
                </div>
            </div>    
        </div>


        </>
    )
}

export default AdminDashboardBox;