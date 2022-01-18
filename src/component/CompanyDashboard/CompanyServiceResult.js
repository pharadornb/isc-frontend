import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";

export default function CompanyServiceResult() {
    const datas = [
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
    ];

    const [rows, setRows] = useState(datas);

    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        /* Search Table 1 */
            const filteredRows = datas.filter((row) => {
                return row.registration_number.toLowerCase().includes(searchedVal.toLowerCase());
              });
            setRows(filteredRows); 
    };

    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };

   return (
    <>
        <div className="row">
            <div className="col-8"> </div>
            <div className="col-4">
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
            </div>
        </div>
        <div className="row">
            <table className="tables">
                <th>วันที่เข้ารับบริการ</th>
                <th>ชื่อทักษะบริการ</th>
                <th>ข้อมูลผู้รับบริการ</th>
                <th>ครั้งที่</th>
                <th>คะแนน</th>
                {rows.map((data) => (
                <tr>
                    <td>{data.date_service}</td>
                    <td>{data.service_skill_name}</td>
                    <td>{data.recipient_information}</td>
                    <td>{data.count}</td>
                    <td>{data.score}</td>
                </tr>
                ))}
            </table>
        </div>
    </>
   )
}
