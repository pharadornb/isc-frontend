import React from "react";

import '../../css/CompanyDashboard.css';

import ListIcon from "../../img/list-icon.PNG"
import MoneyIcon from "../../img/money.PNG"
import PustIcon from "../../img/pust-icon.PNG"
import logo from '../../img/Tecnau-green-web1.png';
import ThinkIcon from '../../img/think-icon.PNG';
import Moneys from '../../img/money2.PNG';
import ListIcon2 from '../../img/list-icon2.PNG';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BoxSklil from '../CompanyDashboard/CompanyDashboardBoxSklil';

export default function CompanyDashboardContent(){
    return (
        <>
        <div className="row1">
            <div className="colume-right1">
                <img src={MoneyIcon} className="img1"></img>
                <label className="colume-right1-1">5</label>
                <a href="#"><img src={PustIcon} className="img-pust"></img></a>
            </div>
            <div className="colume-right2">
                <img src={ListIcon} className="img1"></img>
                <label className="colume-right1-1">200</label>
                <a href="#"><img src={PustIcon} className="img-pust"></img></a>
            </div>
        </div>
        <div className="row2">
            <div className="row row2-2">
                <div className="col-md-10">
                    <img class="img_design" src={logo} alt="Logo" />
                </div>
                <div className="col-md-2">
                    <div className="side-view">
                        {/* Slider */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="box-design">
                        <img class="img-think-icon" src={ThinkIcon} alt="Logo" />
                        <label className="txt-to-icon">คลังสะสมทักษะ</label>
                        <div className="row2-border">
                            <p className="row2-txt1">52</p>
                            <a href="#" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="box-design">
                        <img class="img-think-icon" src={Moneys} alt="Logo" />
                        <label className="txt-to-icon">กระเป๋าเงิน</label>
                        <div className="row2-border">
                            <p className="row2-txt1">200</p>
                            <a href="#" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box-design">
                        <img class="img-think-icon" src={ListIcon2} alt="Logo" />
                        <label className="txt-to-icon">คลังทดสอบคงเหลือ</label>
                        <div className="row2-border">
                            <p className="row2-txt1">9</p>
                            <a href="#" className="row2-a"><ArrowForwardIosIcon style={{fontSize: 50}} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row cs">
                <div className="col-md-6">
                    <h2>คลังทักษะล่าสุด</h2>
                    <div className="box-skills-library">
                        {/*------ Box ------*/}
                        <BoxSklil/>
                        {/*-----------------*/}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>สถานประกอบการล่าสุด</h2>
                    <div className="box-latest-establishment">
                        {/*----- Table -----*/}

                        {/*-----------------*/}
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}