import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import SearchTable from "./SearchTable";
import HeaderTable from "./HeaderTable";
import Avatar from "@mui/material/Avatar";
import PaginationTable from "./PaginationTable";
import Loader from "../configComponent/Loader";
import Swal from "sweetalert2";

export default function SkillUserTable() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false)

    const ITEMS_PER_PAGE = 5;

    const handleClickOpen = (index) => {
        Swal.fire({
            title: 'ยืนยัน',
            html: "<b>ชื่อทักษะ : </b>" + skillStoreData[index].skill_name +
                "&nbsp;&nbsp;<b>โดย : </b>" + skillStoreData[index].uc_name +
                "<br/><b>เวลาทดสอบ : </b>" + skillStoreData[index].skill_time + "<b> นาที</b>",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Start'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/skill/exam/" + skillStoreData[index].skill_id;
            }
        })
    };

    const headers = [
        {name: "สัญลักษณ์", field: "skill_logo", sortable: false},
        {name: "ชื่อทักษะ", field: "skill_name", sortable: false},
        {name: "โดย", field: "uc_name", sortable: false},
        {name: "เวลาทดสอบ(นาที)", field: "skill_time", sortable: false},
        {name: "ระดับทักษะ", field: "skill_credit", sortable: false},
        {name: "คะแนนเฉลี่ย(%)", field: "skill_credit", sortable: false},
        {name: "รับบริการ", field: "", sortable: false}
    ];

    useEffect(() => {
        const getData = () => {

            setShowLoading(true)
            localStorage.clear();

            axios.post('skill/yourSkill', {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setComments(res.data);
                setShowLoading(false)
            }).catch(err => {
                setShowLoading(false)
                console.log(err)
            })
        };

        getData();
    }, []);

    const skillStoreData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment => comment.skill_name.toLowerCase().includes(search.toLowerCase())
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4" align={'left'}>
                        <p style={{fontSize: '24px'}}><i className="fab fa-slack"
                                                         style={{fontSize: '1em'}}/><b> คลังทักษะของคุณ</b></p>
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
                    {skillStoreData.length > 0 ? (
                        skillStoreData.map((comment, index) => (
                            <tr key={index}>
                                <td style={{pointerEvents: 'none', justifyContent: "center", display: "flex"}}><Avatar
                                    alt={comment.skill_name} src={`data:image/jpeg;base64,${comment.skill_logo}`}
                                    sx={{width: 50, height: 50}}/></td>
                                <td>{comment.skill_name}</td>
                                <td>{comment.uc_name}</td>
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
                                    {comment.user_skill_update === null ?
                                        <p>ยังไม่ได้รับคะแนน</p>
                                        :
                                        <p>{comment.user_skill_point}</p>
                                    }
                                </td>
                                <td>
                                    {comment.user_skill_update === null ?
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => handleClickOpen(index)}><i
                                            className="far fa-check-square"/> ใหม่
                                        </button>
                                        :
                                        <p>
                                            -
                                        </p>
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>
                                <p className="text-center">ไม่มีข้อมูล</p>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {skillStoreData.length > ITEMS_PER_PAGE &&
                    <PaginationTable
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                }
            </div>
        </Loader>
    )
}