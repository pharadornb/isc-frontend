import { useState } from "react";

export default function CompanyDashboardEstablishmentTable(){

    const dataTables = [
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด", skills: "java, backend"},
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด", skills: "java, backend"},
        {imgs: "##", compaName: "บริษัท ซิสเต็ม วัน จำกัด", skills: "java, backend"},
    ];

    const [rows] = useState(dataTables);

    return(
        <>
            {rows.map((data) => (
                <tr>
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
        </>
    )
}