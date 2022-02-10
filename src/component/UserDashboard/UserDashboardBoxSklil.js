import React, { useState } from "react";

import JavaIcon from "../../img/JavaIcon.png";
import StarIcon from "../../img/star.PNG";

export default function CompanyDashboardBoxSklil() {
  const DataArrays = [
    {
      img: JavaIcon,
      name: "Java : Language Programing1",
      star: 5,
      persen: "94%",
    },
    {
      img: JavaIcon,
      name: "Java : Language Programing2",
      star: 5,
      persen: "42%",
    },
    {
      img: JavaIcon,
      name: "Java : Language Programing3",
      star: 5,
      persen: "56%",
    },
    {
      img: JavaIcon,
      name: "Java : Language Programing4",
      star: 5,
      persen: "82%",
    },
  ];

  const [datas] = useState(DataArrays);

  return (
    <>
      <div className="container">
        <div className="row">
          {datas.map((data, index) => (
              <div className="col-4 box-skills" key={index}>
                <img
                  src={data.img}
                  className="box-skills-in-img"
                  alt="Trulli"
                ></img>
                <label className="box-skills-in-txt">{data.name}</label>
                <p className="box-skills-in-2">
                  <img
                    src={StarIcon}
                    className="box-skills-in-imgstar"
                    alt="Trulli"
                  ></img>
                  {data.persen}
                </p>
                <button className="box-skills-in-btn">รายละเอียด</button>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}
