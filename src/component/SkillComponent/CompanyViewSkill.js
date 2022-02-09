import React, {useEffect, useState, useMemo} from "react";
import HeaderTable from "./HeaderTable"
import PaginationTable from "./PaginationTable"
import SearchTable from "./SearchTable"
import axios from "axios";
import Loader from "../configComponent/Loader";
import Avatar from "@mui/material/Avatar";
import moment from "moment";

export default function CompanyViewSkill() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false)

    const ITEMS_PER_PAGE = 10;

    const headers = [
        {name: "สัญลักษณ์", field: "skill_logo", sortable: false},
        {name: "ชื่อทักษะ", field: "skill_name", sortable: false},
        {name: "กลุ่มทักษะ", field: "skill_type_name", sortable: false},
        {name: "เวลาทดสอบ(นาที)", field: "skill_time", sortable: false},
        {name: "ระดับทักษะ", field: "skill_hard", sortable: false},
        {name: "วันที่สร้างทักษะ", field: "skill_create", sortable: false},
        {name: "จัดการ", field: "", sortable: false}
    ];

    useEffect(() => {
        const getData = () => {

            setShowLoading(true)

            axios.post('skill', {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                // console.log(res.data)
                setComments(res.data);
                setShowLoading(false)
            }).catch(err =>
                console.log(err)
            )
        };

        getData();
    }, []);
    
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment => comment.skill_name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.skill_type_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search]);

    return (
        <Loader show={showLoading}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4" align={'left'}>
                        <p style={{fontSize: '24px'}}><i className="fas fa-table"
                                                         style={{fontSize: '1em'}}/><b> คลังเก็บทักษะที่สร้าง</b></p>
                    </div>
                    <div className="col-md-8 d-flex flex-row-reverse">
                        <SearchTable onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                        />
                    </div>
                </div>

                <table className="table table-striped">
                    <HeaderTable headers={headers}/>
                    <tbody>
                    {commentsData.map(comment => (
                        <tr key={comment.skill_id}>
                            <td style={{pointerEvents: 'none', justifyContent: "center", display: "flex"}}><Avatar
                                alt={comment.skill_name} src={`data:image/jpeg;base64,${comment.skill_logo}`}
                                sx={{width: 50, height: 50}}/></td>
                            <td>{comment.skill_name}</td>
                            <td>{comment.skill_type_name}</td>
                            <td>{comment.skill_time}</td>
                            <td>
                                {comment.skill_hard === 1 &&
                                    <p>ค่อนข้างง่าย</p>
                                }
                                {comment.skill_hard === 2 &&
                                    <p>ง่าย</p>
                                }
                                {comment.skill_hard === 3 &&
                                    <p>ปานกลาง</p>
                                }
                                {comment.skill_hard === 4 &&
                                    <p>ค่อนข้างยาก</p>
                                }
                                {comment.skill_hard === 5 &&
                                    <p>ยาก</p>
                                }
                            </td>
                            <td>
                                {moment(comment.skill_create).format('L')} {moment(comment.skill_create).format('LT')}
                            </td>
                            <td>
                                <button type="button" className="btn btn-warning"><i className="fas fa-edit"/></button>
                                &nbsp;&nbsp;
                                <button type="button" className="btn btn-danger"><i className="fas fa-trash"/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationTable
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </Loader>
    );
}