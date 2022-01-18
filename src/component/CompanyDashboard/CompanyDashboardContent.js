import React from "react";

import '../../css/CompanyDashboard.css';

import AddIcon from '../../img/Add.png';
import TimeIcon from '../../img/Time.png';
import BugIcon from '../../img/Wallet.png';
import bgShow from '../../img/morning 1.png';

import CommunicationSkillIcon from '../../img/think-icon.PNG';
import MorningIcon from '../../img/money2.PNG';
import TimeIcon2 from '../../img/Time2.png';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CompanyDashboardContent(){
    return(
        <>
            <div className="boxC-01">
                <img src={TimeIcon}></img>
                <label className="txt1-1"><p>22:22:30</p></label>
                <img src={AddIcon}></img>
                <img src={BugIcon}></img>
                <label className="txt1-1"><p>200</p></label>
                <img src={AddIcon}></img>
            </div>
            <div className="boxC-02">
                <img src={bgShow} className="boxC-02-01"></img>
                <div className="row">
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={CommunicationSkillIcon} className="inBoxC101"></img>
                                <label className="inBoxC102"><b>คลังทักษะสร้าง</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>5</b></label>
                                <a href="#" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={MorningIcon} className="inBoxC101"></img>
                                <label className="inBoxC102"><b>กระเป๋าเงิน</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>200</b></label>
                                <a href="#" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ld">
                        <div className="inBoxC">
                            <div className="inBoxC1">
                                <img src={TimeIcon2} className="inBoxC101"></img>
                                <label className="inBoxC102"><b>เวลาค้นคงเหลือ</b></label>
                            </div>
                            <div className="row inBoxC2">
                                <label className="col-6 inBoxC201"><b>22:22:30</b></label>
                                <a href="#" className="col-6 inBoxC202"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="boxC-03">
                
            </div>
        </>
    )
}