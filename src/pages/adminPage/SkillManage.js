import Sidebar from "../../component/configComponent/SidebarChild";
import React from "react";
import SkillManageComponent from "../../component/AdminDashboard/SkillManageComponent";

export default function SkillManage() {

    return (
        <Sidebar mark={'adminSkill'}>
            <div className={'pt-1'}/>
            <SkillManageComponent />
        </Sidebar>
    )
}