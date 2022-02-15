import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";

export default function CompanyServiceResult() {
    const datas = [
        { date_service: '09:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '10:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '11:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '12:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '13:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
        { date_service: '15:23 22 มกราคม 2564',service_skill_name: 'Java',recipient_information: 'ภราดร บุญร่วม', count: 1, score: 20 },
    ];

    const [rows, setRows] = useState(datas);

    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        /* Search Table 1 */
            const filteredRows = datas.filter((data) => {
                return data.date_service.toLowerCase().includes(searchedVal.toLowerCase());
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
            <div className="col-md-12 col-lg-4">
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <br/>
            </div>
        </div>
        <div className="row overflow-auto">
            <table className="col-lg-12 tables">
                <thead>
                    <tr>
                        <th>วันที่เข้ารับบริการ</th>
                        <th>ชื่อทักษะบริการ</th>
                        <th>ข้อมูลผู้รับบริการ</th>
                        <th>ครั้งที่</th>
                        <th>คะแนน</th>
                    </tr>
                </thead>
                <tbody>
                {rows.map((data) => (
                
                <tr key={data.date_service}>
                    <td>{data.date_service}</td>
                    <td>{data.service_skill_name}</td>
                    <td>{data.recipient_information}</td>
                    <td>{data.count}</td>
                    <td>{data.score}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>
   )
}
