
import React from "react";
import Select from 'react-select'


import '../../css/AdminDashboard/AdminDashboardContent.css';
import logo from '../../img/Tecnau-green-web1.png';

import Box from './AdminDashboardBox'
import Tables from './AdminDashboardTable'

export default function AdminDashboardContent (){
   const options = [
       {value: '555', label: 'coco'},
       {value: '555', label: 'coco2'},
    ]

   
    
    return(
        <section>    
            <article>
                <div className="top_bg"></div>
                <div className="mid_bg">
                    <div className="box_img_content">
                        <img className="img_design" src={logo} alt="Logo" width={"100%"} height={230} />
                        <div className="boxTxt">
                            <p className="txt1">สวัสดีตอนเช้า</p>
                            <p className="txt2">ผู้ดูแลระบบ iSC01</p>
                            <p className="txt3">iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</p>
                        </div>
                    </div>
                    <div className="row box_row2">
                        <div className="col-md-8"></div>
                        <div className="col-md-4"><Select options={options} /></div>
                    </div>
                    <div className="row box_row3">
                        <Box/>
                    </div>
                    <div className="row box_row4">
                        <Tables/>
                    </div>
                </div>
            </article>
        </section>
    )
}