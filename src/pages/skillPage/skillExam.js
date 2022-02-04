import React from "react";
import {useParams} from "react-router-dom";
import Sidebar from '../../component/configComponent/SidebarChild'
import SkillExamTest from "../../component/SkillComponent/SkillExamTest";

export default function SkillExam() {
    const {skillId} = useParams()

    return (
        <Sidebar mark={'skillStore'}>
            <SkillExamTest id={skillId}/>
        </Sidebar>
    )
}