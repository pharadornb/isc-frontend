import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import SearchTable from "../SkillComponent/SearchTable";
import HeaderTable from "../SkillComponent/HeaderTable";
import Avatar from "@mui/material/Avatar";
import PaginationTable from "../SkillComponent/PaginationTable";
import Loader from "../configComponent/Loader";
import Table from "react-bootstrap/table";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function SkillManageComponent() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [count, setCount] = useState(0);
    const [attritude, setAttritude] = useState([]);
    const [skillDetail, setSkillDetail] = useState();
    const [skillName, setSkillName] = useState("");
    const [skillBy, setSkillBy] = useState("");
    const [skillId, setSkillId] = useState("");
    const [skillStatus, setSkillStatus] = useState("");

    const ITEMS_PER_PAGE = 10;

    const headers = [
        {name: "ว/ด/ป. เสนอ", field: "skill_create", sortable: false},
        {name: "", field: "skill_logo", sortable: false},
        {name: "ชื่อทักษะ", field: "skill_name", sortable: false},
        {name: "โดย", field: "uc_name_profile", sortable: false},
        {name: "สาธารณะ", field: "skill_isvalid", sortable: false},
        {name: "จัดการสถานะ", field: "", sortable: false}
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

    const handleClickOpen = (skillId, skillDetail, SkillName, SkillBy, skillValid) => {
        setShowLoading(true)
        const params = JSON.stringify({
            skill_id: skillId,
        });

        axios.post('skill/viewSkillAttritude', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.status === 202){
                setCount(res.data.count[0].count_exam_skill);
                setAttritude(res.data.obj);
                setSkillDetail(skillDetail);
                setSkillName(SkillName);
                setSkillBy(SkillBy);
                setSkillId(skillId);
                setSkillStatus(skillValid);
                setShowLoading(false);
                setShow(true);
            }else if(res.status === 404){
                setShow(false);
            }
        }).catch(err => {
            console.log(err);
            setShow(false);
        })
    };

    const publishSkill = (id, status) => {
        setShowLoading(true)
        const params = JSON.stringify({
            skill_id: id,
            skill_isvalid: status
        });

        axios.post('skill/publishSkill', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.status === 200){
                setShowLoading(false);
                setShow(false);
                window.location.reload();
            }
        }).catch(err => {
            console.log(err);
            setShow(false);
        })
    }

    return (
        <Loader show={showLoading}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4" align={'left'}>
                        <p style={{fontSize: '24px'}}><i className="fa-solid fa-list-check"
                                                         style={{fontSize: '1em'}}/><b> อนุมัติทักษะเสนอของบริษัท</b>
                        </p>
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
                    {skillStoreData.map((comment) => (
                        <tr key={comment.skill_id}>
                            <td>{moment(comment.skill_create).format('L LT')}</td>
                            <td><Avatar
                                alt={comment.skill_name} src={`data:image/jpeg;base64,${comment.skill_logo}`}
                                sx={{width: 50, height: 50}}/></td>
                            <td>{comment.skill_name}</td>
                            <td>{comment.uc_name}</td>
                            <td>
                                {
                                    comment.skill_isvalid === 'yes'
                                        ?
                                        <button type="button" className="btn btn-success disabled">
                                            <i className="fa-solid fa-globe"/> Public
                                        </button>
                                        :
                                        <button type="button" className="btn btn-danger disabled">
                                            <i className="fa-solid fa-lock"/> Private
                                        </button>
                                }
                            </td>
                            <td>
                                <button type="button" className="btn btn-outline-primary"
                                        onClick={() => handleClickOpen(comment.skill_id, comment.skill_detail, comment.skill_name, comment.uc_name, comment.skill_isvalid)}>
                                    <i className="fa-solid fa-recycle"/> เปลี่ยน
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal show={show} size="lg" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>จัดการแสดงผลสาธารณะ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <b>ชื่อทักษะ :</b> {skillName}<br/>
                            <b>โดย :</b> {skillBy}<br/>
                            <b>รายละเอียดทักษะ :</b> {skillDetail}<br/>
                            <b>จำนวนข้อการวัดทักษะ :</b> {count}<br/>
                            ******************************************************<br/>
                        </p>

                        {attritude.map((data) => (
                            <p key={data.skill_exam_id}>
                                <b>หัวข้อโจทย์ : </b>{data.skill_exam_head}<br/>
                                <b>รายละเอียดโจทย์(เพิ่มเติม) : </b>{data.skill_exam_detail}<br/>
                                <b>ตัวชี้วัดโจทย์ : </b>{data.skill_exam_objective}<br/>

                            </p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            ปิดหน้าต่าง
                        </Button>
                        {skillStatus === 'yes'
                            ?
                            <Button variant="danger" onClick={() => publishSkill(skillId, 'no')}>
                                ปิดสาธารณะ
                            </Button>
                            :
                            <Button variant="success" onClick={() => publishSkill(skillId, 'yes')}>
                                เปิดสาธารณะ
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
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