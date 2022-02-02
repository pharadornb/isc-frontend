import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild'
import HeadSkill from "../../component/SkillComponent/HeadSkill";

export default function SkillPage() {
    return (
        <>
            <Sidebar mark={'createSkill'}>
                <HeadSkill />
            </Sidebar>
        </>
    )
}