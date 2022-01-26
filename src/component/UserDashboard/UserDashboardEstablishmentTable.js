import { useState } from "react";

export default function CompanyDashboardEstablishmentTable(){

    const dataTables = [
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด", skills: "java, backend"},
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด2", skills: "java, backend2"},
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด3", skills: "java, backend3"},
    ];

    const [rows] = useState(dataTables);

    return(
        <tbody>
            {rows.map((data) => (
                <tr key={data.compaName}>
                    <td>
                        <img src="##" alt="Trulli"></img>
                        {data.compaName}
                    </td>
                    <td>
                        {data.skills}
                    </td>
                    <td>
                        <button className="btn btn-outline-dark">รายละเอียด</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}