import React, { useState } from 'react';

import JavaIcon from '../../img/JavaIcon.png';
import StarIcon from '../../img/star.PNG';

export default function CompanyDashboardBoxSklil() {

    const DataArrays = [
        {img: JavaIcon, name: "Java : Language Programing",star: 5, persen: "94%"},
        {img: JavaIcon, name: "Java : Language Programing",star: 5, persen: "42%"},
        {img: JavaIcon, name: "Java : Language Programing",star: 5, persen: "56%"},
        {img: JavaIcon, name: "Java : Language Programing",star: 5, persen: "82%"},
    ];
 
    const [datas] = useState(DataArrays);

    return(
        <>
        {datas.map((data) => (
        <div className="box-skills">
            <div className="box-skills-in">
                <img src={data.img} className="box-skills-in-img" alt="Trulli"></img>
                <label className="box-skills-in-txt">{data.name}</label>
                <p className="box-skills-in-2">
                    <img src={StarIcon} className="box-skills-in-imgstar" alt="Trulli"></img>
                    {data.persen}
                </p>
                <button className="box-skills-in-btn">รายละเอียด</button>
            </div>
        </div>
        ))}
        </>
    )
}