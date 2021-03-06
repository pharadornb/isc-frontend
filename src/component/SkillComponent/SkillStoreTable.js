import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import SearchTable from "./SearchTable";
import HeaderTable from "./HeaderTable";
import Avatar from "@mui/material/Avatar";
import PaginationTable from "./PaginationTable";
import Loader from "../configComponent/Loader";
import Swal from "sweetalert2";
import Table from "react-bootstrap/table";

export default function SkillStoreTable() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false)

    const ITEMS_PER_PAGE = 7;

    const handleClickOpen = (index) => {
        Swal.fire({
            title: 'ยืนยัน',
            html: "<b>ชื่อทักษะ : </b>" + skillStoreData[index].skill_name +
                "&nbsp;&nbsp;<b>โดย : </b>" + skillStoreData[index].uc_name +
                "<br/><b>เวลาทดสอบ : </b>" + skillStoreData[index].skill_time + "<b> นาที</b>" +
                "&nbsp;&nbsp;<b>ราคา : </b>" + skillStoreData[index].skill_credit + "<b> บาท</b>" +
                "<br/><b>รายละเอียด : </b>" + skillStoreData[index].skill_detail,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enroll'
        }).then((result) => {
            if (result.isConfirmed) {

                setShowLoading(true)
                const params = JSON.stringify({
                    skill_id: skillStoreData[index].skill_id
                })

                axios.post('skill/enrollSkill', params, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(() => {
                    setShowLoading(false)
                    Swal.fire(
                        'ลงทะเบียนทักษะ ' + skillStoreData[index].skill_name + ' สำเร็จ',
                        'เพิ่มข้อมูลลงคลังทักษะของคุณเรียบร้อยแล้ว',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload()
                        }
                    })
                }).catch(err => {
                    console.log(err)
                    setShowLoading(false)
                })
            }
        })
    };

    const headers = [
        {name: "สัญลักษณ์", field: "skill_logo", sortable: false},
        {name: "ชื่อทักษะ", field: "skill_name", sortable: false},
        {name: "โดย", field: "uc_name_profile", sortable: false},
        {name: "กลุ่มทักษะ", field: "skill_type_name", sortable: false},
        {name: "เวลาทดสอบ(นาที)", field: "skill_time", sortable: false},
        {name: "ระดับทักษะ", field: "skill_hard", sortable: false},
        {name: "ราคา(บาท)", field: "skill_credit", sortable: false},
        {name: "เพิ่มลงคลังทักษะ", field: "", sortable: false}
    ];

    useEffect(() => {
        const getData = () => {

            setShowLoading(true)

            axios.post('skill/viewSkill', {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setComments(res.data);
                setShowLoading(false)
            }).catch(err =>
                console.log(err)
            )
        };

        getData();
    }, []);

    const skillStoreData = useMemo(() => {
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
                        <p style={{fontSize: '24px'}}><i className="fab fa-slack"
                                                         style={{fontSize: '1em'}}/><b> เลือกทักษะ</b></p>
                    </div>
                    <div className="col-md-8 d-flex flex-row-reverse">
                        <SearchTable onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                        />
                    </div>
                </div>

                <Table className="table table-striped mt-2" responsive>
                    <HeaderTable headers={headers}/>
                    <tbody>
                    {skillStoreData.map((comment, index) => (
                        <tr key={comment.skill_id}>
                            <td><Avatar
                                alt={comment.skill_name} src={`data:image/jpeg;base64,${comment.skill_logo}`}
                                sx={{width: 50, height: 50}}/></td>
                            <td>{comment.skill_name}</td>
                            <td>{comment.uc_name}</td>
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
                            <td>{comment.skill_credit}</td>
                            <td>
                                <button type="button" className="btn btn-success"
                                        onClick={() => handleClickOpen(index)}><i
                                    className="far fa-check-square"/> เพิ่ม
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <PaginationTable
                    total={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </Loader>
    )
}