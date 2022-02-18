import React from "react";
import moment from "moment";

import "../../css/AdminDashboard/AdminDashboardContent.css";
import logo from "../../img/Tecnau-green-web1.png";

import Box from "./AdminDashboardBox";
import Tables from "./AdminDashboardTable";

export default function AdminDashboardContent() {


  const Hello = () => {
    const a = moment().format("a");
    const h = moment().format("h");
    console.log(h);
    if (a === "am") {
      return "สวัสดีตอนเช้า";
    } else if (a === "pm") {
      if (h > 0 && h <= 6) return "สวัสดีตอนบ่าย";
      else if (h > 6 && h <= 12) return "สวัสดีตอนเย็น";
      else return "สวัสดี Error!!!";
    } else {
      return "สวัสดี Error!!!";
    }
    // console.log(parseInt(hh));
  };

  return (
    <section>
      <article>
        <div className="top_bg" />
        <div className="mid_bg">
          <div className="box_img_content">
            <img
              className="img_design"
              src={logo}
              alt="Logo"
              width={"100%"}
              height={230}
            />
            <div className="boxTxt">
              <p className="txt1">
                <Hello />
              </p>
              <p className="txt2">ผู้ดูแลระบบ</p>
              <p className="txt3">
                iT SKILL COLLECT บริการสะสมคลังทักษะด้านไอที
              </p>
            </div>
          </div>
          <div className="row box_row3">
            <Box />
          </div>
          <div className="row box_row4">
            <Tables />
          </div>
        </div>
      </article>
    </section>
  );
}
