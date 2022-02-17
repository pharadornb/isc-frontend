import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import CustomContentProgressbar from "./CustomContentProgressbar";
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(prop) {
  const [open, setOpen] = React.useState(false);
  const [loading3, setLoading3] = useState(false);
  const [companySkillRequire, setCompanySkillRequire] = useState([]);
  const companyPositionRequire= React.useState(prop.companyPositionRequire);

    // console.log(companySkillRequire);

    

    useEffect(() => {
      const PositionRequire = () => {
        try {
            const params = JSON.stringify({
                ucre_id: companyPositionRequire[0].ucre_id
            });
    
            axios
            .post("resume/companySkillRequire",params, {
                headers: {
                "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res.data);
                    setCompanySkillRequire(res.data);
                    setLoading3(true);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

        PositionRequire();

    },[companyPositionRequire]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ImageLogo = (props) => {
    var user_profile = "";
    if(props.user_profile){
        user_profile = "data:image/jpeg;base64," + props.user_profile;
    }
    return(
        <img
            src={user_profile}
            alt={props.skill_name}
            style={{
                width: "20px",
                height: "20px",
                overflow: "hidden",
            }}
        />
    )
}

const ImageLogoSklil = (props) => {
    var skill_logo = "";
    if(props.skill_logo){
        skill_logo = "data:image/jpeg;base64," + props.skill_logo;
    }
    return(
        <img
            className="Sizeimg1"
            alt={props.skill_name}
            src={skill_logo}
        />
    )
}

  return (
    <div>
      <a href='###' className='float-right magintop20 uuu' onClick={handleClickOpen} ><b>Read more 🡢</b></a>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={'md'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <b>{companyPositionRequire[0].ucre_occupation} @{prop.uc_name}</b><hr/>
        </DialogTitle>
        <DialogContent>
          <div className='box-header-text'>
            <label className='title-box-arlert'>เงินประจำเดือน</label>
            <div className='line-boxC'></div>
          </div>
          <div className='magintop20 arlert02'>
            {companyPositionRequire.length > 0 ? (companyPositionRequire[0].ucre_salary) : "ไม่มีข้อมูล" }
          </div>
          <div className='box-header-text'>
            <label className='title-box-arlert'>ทักษะที่ต้องการ</label>
            <div className='line-boxC'></div>
          </div>
          <div className='magintop20 arlert02'>
            {companySkillRequire.length > 0 ? (loading3 === false && <CircularProgress disableShrink />) : "ไม่มีข้อมูล"}
            {companySkillRequire.map((rows, i) => 
                    (
                        <div className='box-skill-alert' key={i}>
                            <CustomContentProgressbar
                                percentage={rows.ucrs_point}
                            >
                                <div>
                                    <ImageLogoSklil skill_logo={rows.skill_logo} skill_name={rows.skill_name} />
                                </div>
                            </CustomContentProgressbar>
                            <div className="box-center">
                                <span className="txtname">{rows.skill_name}</span>
                                <ImageLogo user_profile={rows.user_profile} skill_name={rows.skill_name} />
                            </div>
                        </div>
                    )
                )}
          </div>
          <div className='both1' />
          <div className='box-header-text'>
            <label className='title-box-arlert'>ลักษณะงาน</label>
            <div className='line-boxC'></div>
          </div>
          <div className='magintop20 arlert02'>
              {companyPositionRequire[0].ucre_detail}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="medium" onClick={handleClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}