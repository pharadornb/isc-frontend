import React from "react";
import Sidebar from '../../component/configComponent/SidebarChild'
import CompanyViewSkill from "../../component/SkillComponent/CompanyViewSkill";

export default function SkillDashboardPage() {
    return (
        <>
            <Sidebar mark={'skill'}>
                <CompanyViewSkill />
            </Sidebar>
        </>
    )
}