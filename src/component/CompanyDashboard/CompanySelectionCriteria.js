import { useState } from 'react';
import Popular from '../../img/Ellipse_212.png';


export default function CompanySelectionCriteria() {
    const box = [
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'ผ่านเกณฑ์: System designer, Programer'},
        {user: 'นาย ภราดร บุญร่วม', criteria: 'System designer, Programer'},
    ];

    const [listBox, setListBox] = useState(box);
    
    return(
        <>
        {listBox.map((cols) => (
            <div className="col-6 boxC03_inbox_box">
                <div className="boxC03_inbox_box1">
                    <img className="boxC03_inbox_box1_img" src={Popular}></img>
                    <p><b>{cols.user}</b></p>
                    <label><b>ผ่านเกณฑ์: </b>{cols.criteria}</label>
                    <a href="#" className="btn btn-success btn-style">btn-success</a>
                </div>
            </div>
        ))}
        </>
    )
}