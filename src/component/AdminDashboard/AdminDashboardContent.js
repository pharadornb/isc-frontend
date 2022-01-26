
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
                <div className="top_bg" />
                <div class="mid_bg">
                    <div class="box_img_content">
                        <img class="img_design" src={logo} alt="Logo" width={"100%"} height={230} />
                        <div class="boxTxt">
                            <p class="txt1">สวัสดีตอนเช้า</p>
                            <p class="txt2">ผู้ดูแลระบบ iSC01</p>
                            <p class="txt3">iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที</p>
                        </div>
                    </div>
                    <div class="row box_row2">
                        <div class="col-md-8"></div>
                        <div class="col-md-4"><Select options={options} /></div>
                    </div>
                    <div class="row box_row3">
                        <Box/>
                    </div>
                    <div class="row box_row4">
                        <Tables/>
                    </div>
                </div>
            </article>
        </section>
    )
}