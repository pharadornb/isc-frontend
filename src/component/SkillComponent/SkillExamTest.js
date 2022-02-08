import React, {useEffect, useMemo, useState} from "react";
import PaginationTable from "../userSkillComponent/PaginationTable";
import Loader from "../configComponent/Loader";
import axios from "axios";
import {useParams} from "react-router-dom";
import SkillExamChoice from "./SkillExamChoice";
import SkillExamHeader from "../userSkillComponent/skillExamHeader";

export default function SkillExamTest() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showLoading, setShowLoading] = useState(false)
    const {skillId} = useParams()
    const [skill, setSkill] = useState([]);

    const ITEMS_PER_PAGE = 1;

    useEffect(() => {
        const getData = () => {

            setShowLoading(true)
            const params = JSON.stringify({
                skill_id: skillId,
            });

            axios.post('skill/viewRandomExam', params, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status === 200) {
                    setComments(res.data.exam)
                    setSkill(res.data.skill)
                    setShowLoading(false)
                }
            }).catch((err) =>
                console.log(err)
            )
        };

        getData();
    }, [skillId]);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        setTotalItems(computedComments.length);

        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage]);

    return (
        <Loader show={showLoading}>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {skill.map(data => (
                            <td key={data.skill_id}>
                                <SkillExamHeader skillName={data.skill_name} skillLogo={data.skill_logo}
                                                 skillProfile={data.user_profile} skillUser={data.uc_name}
                                                 skillHard={data.skill_hard} skillTime={
                                    localStorage.getItem('time') ? localStorage.getItem('time') : data.skill_time
                                }
                                                 skillSum={comments.length}/>
                            </td>
                        ))}
                    </tr>
                    </thead>
                    {commentsData.map(data => (
                        <SkillExamChoice key={data.skill_exam_id} examId={data.skill_exam_id}
                                         examHead={data.skill_exam_head} examOption={data.skill_exam_option}
                                         examDetail={data.skill_exam_detail}/>
                    ))}
                </table>
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