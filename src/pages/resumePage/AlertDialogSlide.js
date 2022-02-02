import React, { useState } from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [swap, setSwap] = useState('personal');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="btns" onClick={handleClickOpen}>
        <i className="fas fa-pencil-alt"></i> แก้ไข resume
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={'xl'}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><b className="list-group-item list-group-item-warning"><i class="fas fa-user-edit"></i> แก้ไขข้อมูลใน Resume</b></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="dialogS">
                <div className="row">
                    <div className="col-4"> 
                        <ul>
                            <li className="list-group-item list-group-item-action list-group-item-dark b" onClick={() => setSwap('personal')}>ข้อมูลส่วนตัว</li>
                            <li className="list-group-item list-group-item-action list-group-item-dark b" onClick={() => setSwap('study')}>การศึกษา</li>
                            <li className="list-group-item list-group-item-action list-group-item-dark b">ประสบการณ์</li>
                            <li className="list-group-item list-group-item-action list-group-item-dark b">คลังทักษะ</li>
                        </ul>
                    </div>
                    <div className="col-8">
                        <form>
                        {swap === 'personal' &&
                        <>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">ชื่อ: </label>
                                <input className="col-3" type={'text'} value="ภราดร" />
                                <label className="col-3 b txtRight">นามสกุล: </label>
                                <input className="col-3" type={'text'} value={'บุญร่วม'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">วันเกิด :  </label>
                                <input className="col-3" type={'date'} />
                                <label className="col-2 b txtRight">อายุ: </label>
                                <input className="col-1" type={'number'} value={15} />
                                <label className="col-1 b">ปี</label>
                                <div className="col-3" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">อีเมล์ : </label>
                                <input className="col-3" type={'email'} value={'iloveyourgirlfreinds@isc.com'}/>
                                <label className="col-3 b txtRight">โทร : </label>
                                <input className="col-3" type={'text'} value={'094-9015032'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">คติประจำใจ : </label>
                                <textarea className="col-9">Aroud the world. I wanna tourist with my girlfriends. She so look beatiful very much it so great person to young</textarea>
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">ที่อยู่ปัจจุบัน : </label>
                                <input className="col-4" type={'text'} value={'267 ม.17 บ้านหนองปิด'} />
                                <label className="col-2 b txtRight">จังหวัด : </label>
                                <input className="col-3" type={'text'} value={'ศรีสะเกษ'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">อำเภอ : </label>
                                <input className="col-2" type={'text'} value={'ไพรบึง'} />
                                <label className="col-2 b txtRight">ตำบล : </label>
                                <input className="col-2" type={'text'} value={'ไพรบึง'} />
                                <label className="col-2 b txtRight">รหัสไปรษณีย์ : </label>
                                <input className="col-1" type={'text'} value={'33180'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">ภูมิลำเนา : </label>
                                <input className="col-4" type={'text'} value={'267 ม.17 บ้านหนองปิด'} />
                                <label className="col-2 b txtRight">จังหวัด : </label>
                                <input className="col-3" type={'text'} value={'ศรีสะเกษ'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">อำเภอ : </label>
                                <input className="col-2" type={'text'} value={'ไพรบึง'} />
                                <label className="col-2 b txtRight">ตำบล : </label>
                                <input className="col-2" type={'text'} value={'ไพรบึง'} />
                                <label className="col-2 b txtRight">รหัสไปรษณีย์ : </label>
                                <input className="col-1" type={'text'} value={'33180'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">Facebook : </label>
                                <input className="col-4" type={'text'} value={'fb.com/boonruam'} />
                                <label className="col-2 b txtRight">YouTube : </label>
                                <input className="col-3" type={'text'} value={'yt.com/boonruam'} />
                                <div className="col-1" />
                            </div>
                            <div className="row mb10">
                                <label className="col-2 b txtRight">GitHub : </label>
                                <input className="col-4" type={'text'} value={'github.com/boonruam'} />
                                <label className="col-2 b txtRight">LinkedIn : </label>
                                <input className="col-3" type={'text'} value={'linkedin.com/boonruam'} />
                                <div className="col-1" />
                            </div>
                        </>
                        }
                        {/* ----------------------------------study------------------------------------------------- */}
                        {swap === 'study' &&
                           <>
                           <div className="row mb10">
                               <label className="col-2 b txtRight">วุฒิที่ได้รับ : </label>
                               <input className="col-9" type={'text'} value="Bachelor of Engineering in Information Technology" />
                               <div className="col-1" />
                           </div>
                           <div className="row mb10">
                               <label className="col-2 b txtRight">สถานที่ศึกษา : </label>
                               <input className="col-4" type={'text'} value={'Suranaree University of Technology'} />
                               <label className="col-2 b txtRight">จังหวัด : </label>
                               <input className="col-3" type={'text'} value={'ศรีสะเกษ'} />
                               <div className="col-1" />
                           </div>
                           <div className="row mb10">
                               <label className="col-2 b txtRight">เกรดเฉลี่ย : </label>
                               <input className="col-1" type={'text'} value={'3.26'}/>
                               <label className="col-2 b txtRight">ปีเริ่มการศึกษา : </label>
                               <input className="col-2" type={'date'} />
                               <label className="col-2 b txtRight">ปีสิ้นสุดการศึกษา : </label>
                               <input className="col-2" type={'date'} />
                               <div className="col-1" />
                           </div>
                       </>
                        }
                        </form>
                    </div>
                </div>
            </div>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btn btn-outline-dark">ยกเลิก</button>
          <button onClick={handleClose} className="btn btn-success">บันทึก</button>
        </DialogActions>
      </Dialog>
    </>
  );
}
