import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild'
import SkillExamTest from "../../component/SkillComponent/SkillExamTest";

export default function SkillExam() {


    return (
        <Sidebar mark={'skillStore'}>
            <SkillExamTest/>
        </Sidebar>
    )
}