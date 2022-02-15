import { useState } from 'react';
import Popular from '../../img/Ellipse_212.png';


export default function CompanySelectionCriteria() {
    const box = [
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer1'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer2'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer3'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'System designer, Programer'},
    ];

    const [listBox] = useState(box);
    
    return(
        <>
        {listBox.map((cols) => (
            <label className="col-md-12 col-lg-6 boxC03_inbox_box" key={cols.criteria}>
                <div className="boxC03_inbox_box1">
                    <img className="boxC03_inbox_box1_img" src={Popular} alt="Trulli"></img>
                    <p><b>{cols.user}</b></p>
                    <label><b>ผ่านเกณฑ์: </b>{cols.criteria}</label>
                    <a href='##' className="btn btn-success btn-style">รายละเอียด</a>
                </div>
            </label>
        ))}
        </>
    )
}